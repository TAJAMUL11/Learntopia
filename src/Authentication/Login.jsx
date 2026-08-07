import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useSound } from "../context/SoundContext";
import { setDoc, doc, addDoc, collection, updateDoc, increment, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Field from "../Components/ui/Field";
import Icon from "../Components/ui/Icon";
import ImageWithSkeleton from "../Components/ui/ImageWithSkeleton";
import google from "../assets/Icons/google.png";
import signIn from "../assets/Icons/signIn.png";
import signUpImage from "../assets/Icons/auth-image.jpg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn, currentUser, logOut } = useAuth();
  const { playLevelUp, playIncorrect } = useSound();

  const returnTo = location.state?.returnTo || "/dashboard";

  useEffect(() => {
    if (currentUser) {
      navigate(returnTo, { replace: true });
    }
  }, [currentUser, navigate, returnTo]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(location.state?.email || "");
  const [userPassword, setUserPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFoundEmail, setNotFoundEmail] = useState(null);

  useEffect(() => {
    if (location.state?.email) {
      setUserEmail(location.state.email);
    }
  }, [location.state?.email]);

  const handlePendingQuizResult = async (user, userDisplayName) => {
    if (location.state?.pendingQuizResult) {
      try {
        const { quizId, quizTitle, score, totalQuestions } = location.state.pendingQuizResult;
        const attempt = {
          quizId,
          quizTitle,
          score,
          totalQuestions,
          completedAt: new Date(),
        };
        await addDoc(collection(db, "Users", user.uid, "quizAttempts"), attempt);

        const pointsEarned = score * 10;
        if (pointsEarned > 0) {
          await updateDoc(doc(db, "Users", user.uid), {
            totalPoints: increment(pointsEarned)
          });

          const globalScoreRef = doc(db, "QuizLeaderboards", quizId, "Scores", user.uid);
          await setDoc(globalScoreRef, {
            score: pointsEarned,
            rawScore: score,
            userFullName: userDisplayName || user.displayName || "User",
            userId: user.uid,
            completedAt: new Date()
          }, { merge: true });

          const userSnap = await getDoc(doc(db, "Users", user.uid));
          if (userSnap.exists()) {
            const uData = userSnap.data();
            const publicRef = doc(db, "PublicLeaderboard", user.uid);
            await setDoc(publicRef, {
              uid: user.uid,
              fullName: uData.fullName || userDisplayName || user.displayName || "Learner",
              totalPoints: (uData.totalPoints || 0) + pointsEarned,
              updatedAt: new Date()
            }, { merge: true });
          }
        }
      } catch (err) {
        console.error("Error saving pending quiz score:", err);
      }
    }
  };

  const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || "thetj4054@gmail.com").toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userEmail.trim().toLowerCase() === ADMIN_EMAIL) {
      playIncorrect();
      toast.warning("Administrator account detected. Please sign in via the Admin Portal at /admin.", { autoClose: 4000 });
      setUserPassword("");
      navigate("/admin");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
      const user = userCredential.user;
      if (user.email && user.email.toLowerCase() === ADMIN_EMAIL) {
        await logOut();
        playIncorrect();
        toast.warning("Administrator account detected. Please sign in via the Admin Portal at /admin.", { autoClose: 4000 });
        setUserPassword("");
        navigate("/admin");
        return;
      }
      await handlePendingQuizResult(user, null);
      playLevelUp();
      toast.success("Successfully logged in");
      navigate(returnTo, { replace: true });
    } catch (err) {
      playIncorrect();
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
        setNotFoundEmail(userEmail);
        toast.info("No account found for this email address.", { autoClose: 3000 });
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("That email address looks incomplete.");
      } else {
        toast.error("Invalid email or password.");
      }
      setUserPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await googleSignIn();
      if (user && user.email && user.email.toLowerCase() === ADMIN_EMAIL) {
        await logOut();
        playIncorrect();
        toast.warning("Administrator account detected. Please sign in via the Admin Portal at /admin.", { autoClose: 4000 });
        navigate("/admin");
        return;
      }
      if (user) {
        await handlePendingQuizResult(user, user.displayName);
      }
      playLevelUp();
      toast.success("Successfully logged in with Google");
      navigate(returnTo, { replace: true });
    } catch (err) {
      playIncorrect();
      console.error("Google sign-in error:", err);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="container-page flex min-h-[80vh] items-center justify-center py-12">
      {/* Account Not Found Smart Guidance Modal */}
      {notFoundEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md border-sky/30 p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky/15 text-sky border border-sky/30">
                <Icon name="user" size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink-hi">Account Not Found</h3>
                <p className="text-xs text-sky font-medium">Smart Authentication Assistant</p>
              </div>
            </div>

            <p className="mb-6 text-xs md:text-sm text-ink-low leading-relaxed">
              We couldn&rsquo;t find an account registered under <strong className="text-sky font-semibold">{notFoundEmail}</strong>. Would you like to create a new account now?
            </p>

            <div className="flex flex-col gap-3">
              <Button
                fullWidth
                onClick={() => {
                  const emailToPass = notFoundEmail;
                  setNotFoundEmail(null);
                  navigate("/signUp", { state: { email: emailToPass, returnTo } });
                }}
              >
                Create Account with {notFoundEmail}
              </Button>
              <button
                type="button"
                onClick={() => setNotFoundEmail(null)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-semibold text-ink-low transition-colors hover:bg-white/[0.08] hover:text-ink-hi"
              >
                Try Another Email or Password
              </button>
            </div>
          </Card>
        </div>
      )}

      <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
        {/* Banner */}
        <div className="relative hidden aspect-[4/5] max-h-[560px] overflow-hidden rounded-3xl border border-white/[0.06] shadow-card lg:block">
          <ImageWithSkeleton src={signUpImage} alt="" imgClassName="h-full w-full object-cover transition-opacity duration-500" />
          
          {/* Overlay and Text */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
          <div className="absolute left-6 top-8 right-6 z-20">
            <h3 className="text-3xl font-extrabold leading-tight text-white drop-shadow-md">
              Let us learn <br /> something new
            </h3>
          </div>
        </div>

        {/* Form */}
        <Card className="w-full p-6 md:p-8">
          <div className="mb-7 flex flex-col items-center text-center">
            <img src={signIn} alt="" className="mb-2 max-w-[56px]" />
            <h2 className="text-2xl font-extrabold text-ink-hi md:text-3xl">Welcome back</h2>
            <p className="mt-1 text-sm text-ink-low">
              We&rsquo;re <span className="font-semibold text-sky">happy</span> to see you again.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Field
              label="Email"
              id="email"
              type="email"
              icon="mail"
              placeholder="Enter your email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <Field
              label="Password"
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Your password"
              required
              minLength={6}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((v) => !v)}
                  aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                  className="grid h-9 w-9 place-items-center rounded-lg text-ink-low transition-colors hover:text-ink-hi"
                >
                  <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={18} />
                </button>
              }
            />

            <div className="flex items-center justify-between text-xs text-ink">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 rounded accent-violet-600"
                />
                Remember me
              </label>
              <Link to="/" className="text-sky transition-colors hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" fullWidth loading={loading} className="mt-1">
              {loading ? "Signing in…" : "Log in"}
            </Button>
          </form>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.04] p-3 text-xs font-semibold uppercase tracking-wider text-ink-hi transition-colors hover:bg-white/[0.08]"
          >
            <img src={google} alt="" className="h-5 w-5 object-contain" />
            Log in with Google
          </button>

          <p className="mt-6 text-center text-xs text-ink-low">
            Don&rsquo;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signUp", { state: { email: userEmail, returnTo } })}
              className="font-bold text-sky hover:underline"
            >
              Register here
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
