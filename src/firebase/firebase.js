import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const APIkey = import.meta.env.VITE_API_KEY;
const MDid = import.meta.env.VITE_MESSAGING_SENDER_ID;
const AppID = import.meta.env.VITE_APP_ID;

const firebaseConfig = {
  apiKey: APIkey,
  authDomain: "learntopia-react.firebaseapp.com",
  projectId: "learntopia-react",
  storageBucket: "learntopia-react.firebasestorage.app",
  messagingSenderId: MDid,
  appId: AppID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
