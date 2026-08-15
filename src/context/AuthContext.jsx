import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { parseProfileName } from "../utils/profileUtils";

/**
 * AuthContext.jsx
 * Provides authentication state, admin authority checking, and
 * profile customization management.
 */
const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // True when a signed-in student has NO custom displayName or avatarId yet.
  // The ProfileSetupModal reads this to decide whether to block the UI.
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);

  /**
   * Google Sign In flow.
   */
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const tokenResult = await user.getIdTokenResult();
      if (tokenResult.claims.admin === true) {
        return user;
      }

      // Check if user document already exists in Firestore for student users
      const userRef = doc(db, "Users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const _t = new Date();
        const todayStr = `${_t.getFullYear()}-${String(_t.getMonth() + 1).padStart(2, "0")}-${String(_t.getDate()).padStart(2, "0")}`;
        await setDoc(userRef, {
          email: user.email,
          fullName: user.displayName || "New User",
          totalPoints: 0,
          badges: ["Newcomer"],
          streak: 1,
          lastLoginDate: todayStr,
        });
        // Brand-new user → needs profile setup
        setNeedsProfileSetup(true);
      } else {
        // Existing user — check if they already completed profile setup
        const data = userSnap.data();
        const { displayName, avatarId } = parseProfileName(data);
        setNeedsProfileSetup(!displayName || !avatarId);
      }
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  /**
   * Save the user's chosen display name and avatar to both their private
   * profile and the public leaderboard entry with fallback handling.
   */
  const completeProfileSetup = async (displayName, avatarId) => {
    if (!currentUser) return;
    const uid = currentUser.uid;
    const cleanName = displayName.trim();
    const encodedName = `${cleanName}|${avatarId}`;

    // 1. Instant local storage backup
    try {
      localStorage.setItem(
        `learntopia_custom_profile_${uid}`,
        JSON.stringify({ displayName: cleanName, avatarId })
      );
    } catch (e) {
      console.warn("localStorage write error:", e);
    }

    const userRef = doc(db, "Users", uid);
    let existing = {};
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        existing = userSnap.data();
      }
    } catch (e) {
      console.warn("Error reading user snap before setup:", e);
    }

    // 2. Primary write with direct + encoded fields
    try {
      await setDoc(
        userRef,
        {
          email: existing.email || currentUser.email || "",
          fullName: encodedName,
          displayName: cleanName,
          avatarId: avatarId,
          totalPoints: existing.totalPoints || 0,
          streak: existing.streak || 1,
          badges: existing.badges || ["Newcomer"],
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn("Primary write notice, using encoded fullName write:", err);
      await setDoc(
        userRef,
        {
          email: existing.email || currentUser.email || "",
          fullName: encodedName,
          totalPoints: existing.totalPoints || 0,
          streak: existing.streak || 1,
          badges: existing.badges || ["Newcomer"],
          updatedAt: new Date(),
        },
        { merge: true }
      );
    }

    // 3. Mirror write for PublicLeaderboard
    try {
      const publicRef = doc(db, "PublicLeaderboard", uid);
      await setDoc(
        publicRef,
        {
          uid,
          fullName: encodedName,
          displayName: cleanName,
          avatarId: avatarId,
          totalPoints: existing.totalPoints || 0,
          streak: existing.streak || 1,
          badges: (existing.badges || ["Newcomer"]).map((b) => (typeof b === "string" ? b : b.name || "Badge")),
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } catch {
      try {
        const publicRef = doc(db, "PublicLeaderboard", uid);
        await setDoc(
          publicRef,
          {
            uid,
            fullName: encodedName,
            totalPoints: existing.totalPoints || 0,
            streak: existing.streak || 1,
            badges: (existing.badges || ["Newcomer"]).map((b) => (typeof b === "string" ? b : b.name || "Badge")),
            updatedAt: new Date(),
          },
          { merge: true }
        );
      } catch (e) {
        console.warn("Leaderboard mirror notice:", e);
      }
    }

    setNeedsProfileSetup(false);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setIsAdmin(false);
        setNeedsProfileSetup(false);
        setLoading(false);
        return;
      }

      // Admin authority comes solely from the server-set custom claim — no email
      // appears in the client bundle.
      let admin = false;
      try {
        const tokenResult = await user.getIdTokenResult();
        admin = tokenResult.claims.admin === true;
      } catch (err) {
        console.error("Error reading auth claims:", err);
      }
      setIsAdmin(admin);
      // Unblock initial app load immediately (~10ms) so cold start is instant.
      setLoading(false);

      // SECURITY GUARD: Never create or update student profile or leaderboard for the Administrator
      if (admin) return;

      // Run profile initialization and daily streak checks asynchronously in background
      (async () => {
        try {
          const userRef = doc(db, "Users", user.uid);
          const userSnap = await getDoc(userRef);

          const today = new Date();
          const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

          if (!userSnap.exists()) {
            // Initialize private student profile
            await setDoc(userRef, {
              email: user.email || "",
              fullName: user.displayName || "New User",
              totalPoints: 0,
              badges: ["Newcomer"],
              streak: 1,
              lastLoginDate: todayStr,
            });

            const publicRef = doc(db, "PublicLeaderboard", user.uid);
            await setDoc(publicRef, {
              uid: user.uid,
              fullName: user.displayName || "Learner",
              totalPoints: 0,
              streak: 1,
              badges: ["Newcomer"],
              updatedAt: new Date()
            }, { merge: true });

            // New profile → needs setup
            setNeedsProfileSetup(true);
          } else {
            const data = userSnap.data();

            const { displayName: parsedName, avatarId: parsedAvatar } = parseProfileName(data);
            setNeedsProfileSetup(!parsedName || !parsedAvatar);

            const lastDateStr = data.lastLoginDate;

            // Only update if the user hasn't been credited for today yet
            if (lastDateStr !== todayStr) {
              let newStreak;

              if (lastDateStr) {
                const [ly, lm, ld] = lastDateStr.split("-").map(Number);
                const [ty, tm, td] = todayStr.split("-").map(Number);
                const lastMidnight = Date.UTC(ly, lm - 1, ld);
                const todayMidnight = Date.UTC(ty, tm - 1, td);
                const diffDays = (todayMidnight - lastMidnight) / (1000 * 60 * 60 * 24);
                newStreak = diffDays === 1 ? (data.streak || 0) + 1 : 1;
              } else {
                newStreak = 1;
              }

              await updateDoc(userRef, {
                streak: newStreak,
                lastLoginDate: todayStr,
              });

              const publicRef = doc(db, "PublicLeaderboard", user.uid);
              await setDoc(publicRef, {
                streak: newStreak,
                updatedAt: new Date(),
              }, { merge: true });
            }
          }
        } catch (err) {
          console.error("Error updating background streak:", err);
        }
      })();
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    loading,
    needsProfileSetup,
    googleSignIn,
    logOut,
    completeProfileSetup,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
