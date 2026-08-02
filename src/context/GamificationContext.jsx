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

  useEffect(() => {
    if (!currentUser) {
      setXp(0);
      setBadges([]);
      setStreak(1);
      setLoading(false);
      return;
    }

    const loadGamification = async () => {
      try {
        const ref = doc(db, "Users", currentUser.uid, "data", "gamification");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const d = snap.data();
          setXp(d.xp || 0);
          setBadges(d.badges || []);
          setStreak(d.streak || 1);
        } else {
          // Initialize default
          await setDoc(ref, {
            xp: 0,
            badges: [],
            streak: 1,
            lastActive: new Date(),
          }, { merge: true });
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
      const ref = doc(db, "Users", currentUser.uid, "data", "gamification");
      await setDoc(
        ref,
        {
          xp: newXp,
          badges: newBadges,
          streak: newStreak,
          updatedAt: new Date(),
        },
        { merge: true }
      );
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

  const levelInfo = getLevelInfo(xp);

  return (
    <GamificationContext.Provider
      value={{
        xp,
        levelInfo,
        badges,
        streak,
        celebration,
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
