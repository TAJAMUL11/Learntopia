import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Field from "../Components/ui/Field";
import Icon from "../Components/ui/Icon";
import google from "../assets/Icons/google.png";
import signUp from "../assets/Icons/signUp.png";
import signUpImage from "../assets/signUpImage.jpeg";

const SignUp = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userFName, setUserFName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullName: userFName,
        });
      }
      toast.success("Account created successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      let message = "Couldn't create your account. Please try again.";
      if (err.code === "auth/email-already-in-use") message = "That email is already registered. Try logging in.";
      else if (err.code === "auth/invalid-email") message = "That email address looks incomplete.";
      else if (err.code === "auth/weak-password") message = "Use a stronger password (at least 6 characters).";
      toast.error(message);
      setUserPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page flex min-h-[80vh] items-center justify-center py-12">
      <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
        {/* Banner */}
        <div className="hidden lg:block">
          <img
            src={signUpImage}
            alt=""
            className="h-full max-h-[600px] w-full rounded-3xl border border-white/[0.06] object-cover shadow-card"
          />
        </div>

        {/* Form */}
        <Card className="w-full p-6 md:p-8">
          <div className="mb-7 flex flex-col items-center text-center">
            <img src={signUp} alt="" className="mb-2 max-w-[56px]" />
            <h2 className="text-2xl font-extrabold text-ink-hi md:text-3xl">Create an account</h2>
            <p className="mt-1 text-sm text-ink-low">
              Join the <span className="font-semibold text-sky">Learntopia</span> community.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <Field
              label="Full name"
              id="fullName"
              type="text"
              icon="user"
              placeholder="Enter your full name"
              required
              value={userFName}
              onChange={(e) => setUserFName(e.target.value)}
            />

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
              placeholder="6+ characters"
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

            <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-ink">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-violet-600"
              />
              <span>I agree to the Terms of Service, Privacy Policy, and Notification settings.</span>
            </label>

            <Button type="submit" fullWidth loading={loading} className="mt-1">
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.04] p-3 text-xs font-semibold uppercase tracking-wider text-ink-hi transition-colors hover:bg-white/[0.08]">
            <img src={google} alt="" className="h-5 w-5 object-contain" />
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-xs text-ink-low">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="font-bold text-sky hover:underline">
              Sign in
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
