/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

  return {
    ...currentLevel,
    nextLevel,
    xpInLevel,
    xpNeeded,
    progressPct,
  };
};

export const GamificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState([]);
  const [streak, setStreak] = useState(1);
  const [celebration, setCelebration] = useState(null); // { type: 'module'|'course'|'level', title, message, badge? }
  const [loading, setLoading] = useState(true);

  const [showStreakModal, setShowStreakModal] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setXp(0);
      setBadges([]);
      setStreak(1);
      setShowStreakModal(false);
      setLoading(false);
      return;
    }

    const loadGamification = async () => {
      try {
        const userRef = doc(db, "Users", currentUser.uid);
        const gamiRef = doc(db, "Users", currentUser.uid, "data", "gamification");

        const [userSnap, gamiSnap] = await Promise.all([
          getDoc(userRef).catch(() => null),
          getDoc(gamiRef).catch(() => null),
        ]);

        let loadedXp = 0;
        let loadedBadges = [];
        let loadedStreak = 1;

        let lastStreakPopupDate = null;

        if (userSnap && userSnap.exists()) {
          const u = userSnap.data();
          if (u.xp !== undefined) loadedXp = Math.max(loadedXp, Number(u.xp) || 0);
          if (Array.isArray(u.badges) && u.badges.length > 0) loadedBadges = u.badges;
          if (u.streak !== undefined) loadedStreak = Math.max(loadedStreak, Number(u.streak) || 1);
          if (u.lastStreakPopupDate) lastStreakPopupDate = u.lastStreakPopupDate;
        }

        if (gamiSnap && gamiSnap.exists()) {
          const g = gamiSnap.data();
          if (g.xp !== undefined) loadedXp = Math.max(loadedXp, Number(g.xp) || 0);
          if (Array.isArray(g.badges) && g.badges.length > loadedBadges.length) loadedBadges = g.badges;
          if (g.streak !== undefined) loadedStreak = Math.max(loadedStreak, Number(g.streak) || 1);
        }

        setXp(loadedXp);
        setBadges(loadedBadges);
        setStreak(loadedStreak);

        // HelloTalk-style streak popup check (streak >= 3) — synced via Cloud Firestore & localStorage
        if (loadedStreak >= 3) {
          const today = new Date();
          const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
          const storageKey = `learntopia_streak_popup_${currentUser.uid}_${todayKey}`;
          const localShown = localStorage.getItem(storageKey);
          
          if (lastStreakPopupDate !== todayKey && !localShown) {
            setShowStreakModal(true);
          }
        }
      } catch (err) {
        console.error("Error loading gamification data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGamification();
  }, [currentUser]);

  const saveGamification = async (newXp, newBadges, newStreak) => {
    if (!currentUser) return;
    try {
      const gamiRef = doc(db, "Users", currentUser.uid, "data", "gamification");
      const userRef = doc(db, "Users", currentUser.uid);
      const publicRef = doc(db, "PublicLeaderboard", currentUser.uid);

      await setDoc(
        gamiRef,
        {
          xp: newXp,
          badges: newBadges,
          streak: newStreak,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      const userSnap = await getDoc(userRef).catch(() => null);
      let quizPoints = 0;
      let displayName = currentUser.displayName || "Learner";

      if (userSnap && userSnap.exists()) {
        const uData = userSnap.data();
        if (uData.fullName) displayName = uData.fullName;
        if (uData.quizPoints !== undefined) quizPoints = Number(uData.quizPoints) || 0;
        else if (uData.totalPoints !== undefined && uData.totalPoints > (uData.xp || 0)) {
          quizPoints = Number(uData.totalPoints - (uData.xp || 0)) || 0;
        }
      }

      const newTotalPoints = newXp + quizPoints;

      await setDoc(
        userRef,
        {
          xp: newXp,
          quizPoints,
          totalPoints: newTotalPoints,
          badges: newBadges,
          streak: newStreak,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      await setDoc(
        publicRef,
        {
          uid: currentUser.uid,
          fullName: displayName,
          totalPoints: newTotalPoints,
          xp: newXp,
          streak: newStreak,
          badges: newBadges.map((b) => (typeof b === "string" ? b : b.name || "Badge")),
          updatedAt: new Date(),
        },
        { merge: true }
      ).catch(() => {});
    } catch (err) {
      console.error("Error saving gamification:", err);
    }
  };

  const addXP = (amount, reason = "") => {
    setXp((prevXP) => {
      const oldLevelInfo = getLevelInfo(prevXP);
      const newXP = prevXP + amount;
      const newLevelInfo = getLevelInfo(newXP);

      saveGamification(newXP, badges, streak);

      if (newLevelInfo.level > oldLevelInfo.level) {
        // Level Up Trigger!
        setTimeout(() => {
          setCelebration({
            type: "level",
            title: `Level Up! ${newLevelInfo.icon}`,
            message: `You reached Level ${newLevelInfo.level}: ${newLevelInfo.name}!`,
            xpEarned: amount,
          });
        }, 500);
      } else if (reason) {
        // Normal XP award celebration
        setCelebration({
          type: "xp",
          title: `+${amount} XP Earned! ⚡`,
          message: reason,
          xpEarned: amount,
        });
      }

      return newXP;
    });
  };

  const awardBadge = (badge) => {
    setBadges((prevBadges) => {
      if (prevBadges.some((b) => b.name === badge.name)) return prevBadges;
      const updated = [...prevBadges, { ...badge, earnedAt: new Date().toISOString() }];
      saveGamification(xp, updated, streak);

      setCelebration({
        type: "badge",
        title: `Badge Unlocked! ${badge.emoji || "🏆"}`,
        message: `You earned the "${badge.name}" badge!`,
        badge,
      });

      return updated;
    });
  };

  const triggerCelebration = (celebrationObj) => {
    setCelebration(celebrationObj);
  };

  const closeCelebration = () => {
    setCelebration(null);
  };

  const dismissStreakModal = async () => {
    if (currentUser) {
      const today = new Date();
      const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const storageKey = `learntopia_streak_popup_${currentUser.uid}_${todayKey}`;
      try {
        localStorage.setItem(storageKey, "true");
        const userRef = doc(db, "Users", currentUser.uid);
        await setDoc(userRef, { lastStreakPopupDate: todayKey }, { merge: true }).catch(() => {});
      } catch (err) {
        console.error("Error setting streak modal storage key:", err);
      }
    }
    setShowStreakModal(false);
  };

  const levelInfo = getLevelInfo(xp);

  return (
    <GamificationContext.Provider
      value={{
        xp,
        levelInfo,
        badges,
        streak,
        celebration,
        showStreakModal,
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
