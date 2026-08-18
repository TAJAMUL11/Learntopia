/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebase";
import { doc, onSnapshot, setDoc, increment } from "firebase/firestore";

import { parseProfileName } from "../utils/profileUtils";

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

// Streak reward milestones: the popup appears ONLY on the day the streak reaches
// one of these day counts, and the Claim button grants the matching XP. There
// are no milestones after 30; if the streak breaks and climbs again, the user
// hits these milestones (and earns the rewards) again in the new cycle.
const STREAK_MILESTONES = { 7: 20, 15: 40, 30: 80 };
const streakRewardFor = (streak) => STREAK_MILESTONES[Number(streak)] || 0;

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

  // Guards the daily streak popup so it is evaluated exactly ONCE per login,
  // from server-confirmed data. Without this, the first (cached) snapshot could
  // flash the modal on load with stale streak data before the real value lands.
  const streakEvaluatedRef = useRef(false);

  // Subscribe by uid (not the whole user object) so we re-subscribe only when
  // the signed-in user actually changes — not on every auth token refresh.
  const uid = currentUser?.uid;

  // ── Single source of truth: a LIVE subscription to the canonical Users doc.
  // Because every device reads the same doc via onSnapshot, XP / points / streak
  // are GLOBAL (identical everywhere the user is signed in) and REAL-TIME
  // (updates pushed instantly, no refresh). All writes are atomic increments, so
  // two devices earning at once can never clobber each other.
  useEffect(() => {
    if (!uid) {
      setProfile(null);
      setXp(0);
      setBadges([]);
      setStreak(1);
      setShowStreakModal(false);
      setLoading(false);
      streakEvaluatedRef.current = false;
      return;
    }

    // New subscription for this user — allow one streak-popup evaluation.
    streakEvaluatedRef.current = false;

    const userRef = doc(db, "Users", uid);
    const unsub = onSnapshot(
      userRef,
      (snap) => {
        const d = snap.exists() ? snap.data() : {};
        setProfile(d);
        setXp(Number(d.xp) || 0);
        setBadges(Array.isArray(d.badges) ? d.badges : []);
        setStreak(Number(d.streak) || 1);
        setLoading(false);

        // Streak-milestone celebration — decided ONCE, from SERVER data only.
        // `fromCache` guards against the stale cached snapshot flashing the modal
        // on load; the once-guard stops it re-triggering on every write. Shows
        // ONLY on the day the streak hits a milestone (7/15/30), once per
        // calendar day (tracked in Firestore so it's consistent across devices).
        // No popup on other days, and none once the streak is past 30.
        if (!snap.metadata.fromCache && !streakEvaluatedRef.current) {
          streakEvaluatedRef.current = true;
          if (streakRewardFor(d.streak) > 0 && d.lastStreakPopupDate !== localDayKey()) {
            setShowStreakModal(true);
          }
        }
      },
      (err) => {
        console.error("Gamification snapshot error:", err);
        setLoading(false);
      }
    );

    return unsub;
  }, [uid]);

  // DEV-ONLY: preview the streak popup on demand (real popups need an exact
  // 7/15/30 streak). Visit e.g. http://localhost:5173/?streakTest=15 to force it.
  // `import.meta.env.DEV` is false in production, so this whole block is stripped
  // from the production bundle and can never fire for real users.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const testStreak = new URLSearchParams(window.location.search).get("streakTest");
    if (testStreak && [7, 15, 30].includes(Number(testStreak))) {
      setStreak(Number(testStreak));
      setShowStreakModal(true);
    }
  }, []);

  const totalPoints = xp; // XP is the single unified score (quizzes + lessons + bonuses)
  const levelInfo = getLevelInfo(xp);

  const { displayName, avatarId } = parseProfileName(profile, currentUser?.displayName || "Learner");

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
      const publicFields = {
        uid,
        // Identity lives in the dedicated displayName/avatarId fields; fullName
        // just holds the plain display name (no more "name|avatarId" encoding).
        fullName: displayName,
        displayName,
        avatarId,
        totalPoints: increment(amount),
        xp: increment(amount),
        streak: Number(profile?.streak) || 1,
        badges: (badges || []).map((b) => (typeof b === "string" ? b : b.name || "Badge")),
        updatedAt: new Date(),
      };
      if (profile?.displayName) publicFields.displayName = profile.displayName;
      if (profile?.avatarId) publicFields.avatarId = profile.avatarId;

      await setDoc(
        doc(db, "PublicLeaderboard", uid),
        publicFields,
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
    const amount = streakRewardFor(streak);
    if (!currentUser || amount <= 0 || profile?.lastStreakClaimDate === todayKey) {
      setShowStreakModal(false);
      return false;
    }
    await awardPoints(amount, { lastStreakClaimDate: todayKey, lastStreakPopupDate: todayKey });
    setCelebration({
      type: "xp",
      title: `+${amount} XP! 🔥`,
      message: `${streak}-day streak bonus claimed!`,
      xpEarned: amount,
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
        profile,
        displayName: profile?.displayName || null,
        avatarId: profile?.avatarId || null,
        // Real photo (Google account picture) + whether the user wants it shown
        // on their OWN surfaces. Never surfaced on the public leaderboard.
        photoURL: profile?.photoURL || currentUser?.photoURL || null,
        usePhoto: !!profile?.usePhoto,
        xp,
        totalPoints,
        levelInfo,
        badges,
        streak,
        celebration,
        showStreakModal,
        streakBonusXp: streakRewardFor(streak),
        streakMilestones: STREAK_MILESTONES,
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
