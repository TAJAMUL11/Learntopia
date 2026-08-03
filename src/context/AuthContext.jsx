import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase/firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle Google Sign-In
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document already exists in Firestore
      const userRef = doc(db, "Users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user document if they are logging in for the first time
        // Use local calendar date (not UTC) to stay consistent with streak logic
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
      }
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Determine admin from the custom claim on the ID token — no email or PII
      // in the client. The admin/owner is never written to the public leaderboard.
      let admin = false;
      try {
        const tokenResult = await user.getIdTokenResult();
        admin = tokenResult.claims.admin === true;
      } catch (err) {
        console.error("Error reading auth claims:", err);
      }
      setIsAdmin(admin);

      try {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        if (!userSnap.exists()) {
          // Initialize the private profile (email lives here, admin-readable only).
          await setDoc(userRef, {
            email: user.email || "",
            fullName: user.displayName || "New User",
            totalPoints: 0,
            badges: ["Newcomer"],
            streak: 1,
            lastLoginDate: todayStr,
          });

          // Public mirror = DISPLAY data only (no email). Admin is never published.
          if (!admin) {
            const publicRef = doc(db, "PublicLeaderboard", user.uid);
            await setDoc(publicRef, {
              uid: user.uid,
              fullName: user.displayName || "Learner",
              totalPoints: 0,
              streak: 1,
              badges: ["Newcomer"],
              updatedAt: new Date()
            }, { merge: true });
          }
        } else {
          const data = userSnap.data();
          const lastDateStr = data.lastLoginDate;

          // Only update if the user hasn't been credited for today yet
          if (lastDateStr !== todayStr) {
            let newStreak;

            if (lastDateStr) {
              // Reliable integer calendar-day diff (avoids DST/timezone issues).
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

            if (!admin) {
              const publicRef = doc(db, "PublicLeaderboard", user.uid);
              await setDoc(publicRef, {
                streak: newStreak,
                updatedAt: new Date(),
              }, { merge: true });
            }
          }
        }
      } catch (err) {
        console.error("Error updating streak:", err);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    loading,
    googleSignIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
