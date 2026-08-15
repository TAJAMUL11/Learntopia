import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
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

// --- Firebase App Check (reCAPTCHA v3) — DORMANT until a site key is set ------
// App Check verifies that requests come from YOUR real app (not a bot or a
// script replaying the public config), blocking direct abuse of Firestore.
// It stays OFF unless VITE_RECAPTCHA_SITE_KEY is provided, so nothing changes
// for local dev or a key-less deploy. App Check is loaded dynamically so it
// never enters the bundle when unused.
//
// To activate (owner account, later): register the site for reCAPTCHA v3 and
// enable App Check in the Firebase console, then set VITE_RECAPTCHA_SITE_KEY
// (locally + as a GitHub secret). Enable enforcement in the console only after
// confirming real traffic passes (start in monitor mode).
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
if (RECAPTCHA_SITE_KEY) {
  import("firebase/app-check")
    .then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true,
      });
    })
    .catch((err) => {
      // App Check must never break the app; a failure just means no attestation.
      console.error("App Check init failed (non-fatal):", err);
    });
}

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
export default app;
