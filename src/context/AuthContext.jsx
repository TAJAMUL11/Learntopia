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
        const todayStr = new Date().toISOString().split("T")[0];
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
      
      if (user) {
        try {
          const userRef = doc(db, "Users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            const todayStr = new Date().toISOString().split("T")[0];
            const lastDateStr = data.lastLoginDate;
            
            if (lastDateStr !== todayStr) {
              let newStreak = data.streak || 0;
              if (lastDateStr) {
                const lastDate = new Date(lastDateStr);
                const today = new Date(todayStr);
                const diffTime = Math.abs(today - lastDate);
                const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                  newStreak += 1;
                } else if (diffDays > 1) {
                  newStreak = 1;
                }
              } else {
                newStreak = 1;
              }
              await updateDoc(userRef, {
                streak: newStreak,
                lastLoginDate: todayStr
              });
            }
          }
        } catch (err) {
          console.error("Error updating streak:", err);
        }
      }
      
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
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
