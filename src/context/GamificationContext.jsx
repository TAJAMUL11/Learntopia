/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebase";
import { doc, onSnapshot, setDoc, increment } from "firebase/firestore";

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const LEVEL_THRESHOLDS = [
  { level: 1, name: "Rookie Coder", minXP: 0, icon: "🌱" },
  { level: 2, name: "Code Explorer", minXP: 100, icon: "🔍" },
  { level: 3, name: "Byte Master", minXP: 250, icon: "⚡" },
  { level: 4, name: "Logic Legend", minXP: 500, icon: "👑" },
  { level: 5, name: "Grandmaster", minXP: 1000, icon: "🏆" },
];

export const getLevelInfo = (xp) => {
  let currentLevel = LEVEL_THRESHOLDS[0];
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXP) {
      currentLevel = LEVEL_THRESHOLDS[i];
      break;
    }
  }
  const nextLevel = LEVEL_THRESHOLDS.find((l) => l.level === currentLevel.level + 1);
  const xpInLevel = xp - currentLevel.minXP;
  const xpNeeded = nextLevel ? nextLevel.minXP - currentLevel.minXP : 100;
  const progressPct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  return { ...currentLevel, nextLevel, xpInLevel, xpNeeded, progressPct };
};

const STREAK_BONUS_XP = 20;

const localDayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const GamificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState([]);
  const [streak, setStreak] = useState(1);
  const [celebration, setCelebration] = useState(null);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── Single source of truth: a LIVE subscription to the canonical Users doc.
  // Because every device reads the same doc via onSnapshot, XP / points / streak
  // are GLOBAL (identical everywhere the user is signed in) and REAL-TIME
  // (updates pushed instantly, no refresh). All writes are atomic increments, so
  // two devices earning at once can never clobber each other.
  useEffect(() => {
    if (!currentUser) {
      setProfile(null);
      setXp(0);
      setBadges([]);
      setStreak(1);
      setShowStreakModal(false);
      setLoading(false);
      return;
    }

    const userRef = doc(db, "Users", currentUser.uid);
    const unsub = onSnapshot(
      userRef,
      (snap) => {
        const d = snap.exists() ? snap.data() : {};
        setProfile(d);
        setXp(Number(d.xp) || 0);
        setBadges(Array.isArray(d.badges) ? d.badges : []);
        setStreak(Number(d.streak) || 1);
        setLoading(false);

        // Daily streak celebration: streak >= 3, shown once per calendar day
        // (tracked in Firestore so it's consistent across every device).
        if ((Number(d.streak) || 1) >= 3 && d.lastStreakPopupDate !== localDayKey()) {
          setShowStreakModal(true);
        }
      },
      (err) => {
        console.error("Gamification snapshot error:", err);
        setLoading(false);
      }
    );

    return unsub;
  }, [currentUser]);

  const totalPoints = xp; // XP is the single unified score (quizzes + lessons + bonuses)
  const levelInfo = getLevelInfo(xp);

  // Atomically add points to the profile AND mirror to the public leaderboard.
  // Uses increment() so concurrent writes from multiple devices are race-safe,
  // and the onSnapshot listeners reflect the new value everywhere immediately.
  const awardPoints = async (amount, extraProfileFields = {}) => {
    if (!currentUser || !amount || amount <= 0) return;
    const uid = currentUser.uid;
    try {
      await setDoc(
        doc(db, "Users", uid),
        { xp: increment(amount), totalPoints: increment(amount), updatedAt: new Date(), ...extraProfileFields },
        { merge: true }
      );
    } catch (err) {
      console.error("Error awarding points to profile:", err);
    }
    // Public leaderboard mirror (display data only — never email/PII).
    try {
      await setDoc(
        doc(db, "PublicLeaderboard", uid),
        {
          uid,
          fullName: profile?.fullName || currentUser.displayName || "Learner",
          totalPoints: increment(amount),
          xp: increment(amount),
          streak: Number(profile?.streak) || 1,
          badges: (badges || []).map((b) => (typeof b === "string" ? b : b.name || "Badge")),
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } catch { /* leaderboard mirror is best-effort */ }
  };

  const addXP = async (amount, reason = "") => {
    const oldLevel = getLevelInfo(xp);
    const newLevel = getLevelInfo(xp + amount);
    await awardPoints(amount);

    if (newLevel.level > oldLevel.level) {
      setTimeout(() => {
        setCelebration({
          type: "level",
          title: `Level Up! ${newLevel.icon}`,
          message: `You reached Level ${newLevel.level}: ${newLevel.name}!`,
          xpEarned: amount,
        });
      }, 500);
    } else if (reason) {
      setCelebration({ type: "xp", title: `+${amount} XP Earned! ⚡`, message: reason, xpEarned: amount });
    }
  };

  const awardBadge = async (badge) => {
    if (badges.some((b) => (typeof b === "string" ? b : b.name) === badge.name)) return;
    const updated = [...badges, { ...badge, earnedAt: new Date().toISOString() }];
    try {
      await setDoc(
        doc(db, "Users", currentUser.uid),
        { badges: updated, updatedAt: new Date() },
        { merge: true }
      );
    } catch (err) {
      console.error("Error awarding badge:", err);
    }
    setCelebration({
      type: "badge",
      title: `Badge Unlocked! ${badge.emoji || "🏆"}`,
      message: `You earned the "${badge.name}" badge!`,
      badge,
    });
  };

  // Claim the daily streak bonus (+20 XP). Guarded to once per calendar day via
  // lastStreakClaimDate stored in Firestore, so it can't be re-claimed on
  // another device or after a refresh. Returns true if the bonus was granted.
  const claimStreakBonus = async () => {
    const todayKey = localDayKey();
    if (!currentUser || profile?.lastStreakClaimDate === todayKey) {
      setShowStreakModal(false);
      return false;
    }
    await awardPoints(STREAK_BONUS_XP, { lastStreakClaimDate: todayKey, lastStreakPopupDate: todayKey });
    setCelebration({
      type: "xp",
      title: `+${STREAK_BONUS_XP} XP! 🔥`,
      message: "Daily streak bonus claimed!",
      xpEarned: STREAK_BONUS_XP,
    });
    setShowStreakModal(false);
    return true;
  };

  const dismissStreakModal = async () => {
    if (currentUser) {
      try {
        await setDoc(
          doc(db, "Users", currentUser.uid),
          { lastStreakPopupDate: localDayKey() },
          { merge: true }
        );
      } catch { /* best-effort */ }
    }
    setShowStreakModal(false);
  };

  const triggerCelebration = (celebrationObj) => setCelebration(celebrationObj);
  const closeCelebration = () => setCelebration(null);

  return (
    <GamificationContext.Provider
      value={{
        xp,
        totalPoints,
        levelInfo,
        badges,
        streak,
        celebration,
        showStreakModal,
        streakBonusXp: STREAK_BONUS_XP,
        alreadyClaimedStreakToday: profile?.lastStreakClaimDate === localDayKey(),
        claimStreakBonus,
        dismissStreakModal,
        addXP,
        awardBadge,
        triggerCelebration,
        closeCelebration,
        loading,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};
