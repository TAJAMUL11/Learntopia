import { useNavigate } from "react-router-dom";
import google from "../assets/Icons/google.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import signUp from "../assets/Icons/signUp.png";
import signUpImage from "../assets/signUpImage.jpeg";

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const logNavigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFName, setUserFName] = useState("");
  const [userPolicy, setUserPolicy] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handlePolicyCheck = () => {
    if (userEmail && userPassword) {
      setUserPolicy(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullName: userFName,
        });
      }
      toast.success("User Registered Successfully");
      logNavigate("/dashboard", { replace: true });
      setUserEmail("");
      setUserPassword("");
      setUserFName("");
      setUserPolicy(false);
    } catch (e) {
      let errorMessage = "Email already in use";
      if (e.code === "auth/user-not-found") {
        errorMessage = "User not found. Please check your email address.";
      } else if (e.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      }

      toast.error(errorMessage);
      setUserEmail("");
      setUserPassword("");
      setUserPolicy(false);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 flex items-center justify-center min-h-[80vh] text-white">
      <div className="flex w-full max-w-5xl gap-10 items-center justify-center">
        {/* Left Side banner */}
        <div className="hidden lg:block w-1/2 max-w-[45%]">
          <img src={signUpImage} alt="Sign Up Banner" className="w-full h-auto object-cover rounded-3xl border border-white/5 shadow-2xl" />
        </div>

        {/* Frosted Glass Form Container */}
        <div className="w-full max-w-md background-blur p-6 md:p-8 rounded-3xl border border-light-bg-color shadow-custom-shadow">
          <form className="flex flex-col w-full" onSubmit={handleRegister}>
            
            {/* Header Form */}
            <div className="flex flex-col items-center mb-6">
              <img src={signUp} alt="LearnTopia logo" className="max-w-[60px] mb-2" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-center">Create an account</h2>
              <p className="text-sm text-gray-400 mt-1">
                Join the <span className="text-highlighted-btn-bg font-semibold">LearnTopia</span> community.
              </p>
            </div>

            {/* Full Name Field */}
            <div className="inputContainers">
              <label htmlFor="FullName" className="inputLabels">Full Name</label>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                required
                className="inputbox"
                onChange={(e) => setUserFName(e.target.value)}
                value={userFName}
              />
            </div>

            {/* Email Field */}
            <div className="inputContainers">
              <label htmlFor="email" className="inputLabels">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                required
                className="inputbox"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
              />
            </div>
            
            {/* Password Field */}
            <div className="inputContainers relative">
              <label htmlFor="password" className="inputLabels">Password</label>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="6+ characters"
                required
                minLength={6}
                className="inputbox pr-10"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3.5 top-[44px] text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
              </button>
            </div>

            {/* Policy checkbox */}
            <div className="text-xs text-gray-400 mt-2 mb-5 leading-relaxed">
              <label className="flex items-start gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={userPolicy}
                  onChange={handlePolicyCheck}
                  className="mt-0.5 rounded accent-button-bg-color"
                />
                <span>I agree with Terms of Service, Privacy Policy, and Notification settings.</span>
              </label>
            </div>
              
            {/* Submit Button */}
            <button type="submit" className="w-full btn-style py-3 font-semibold uppercase tracking-wider text-xs shadow-md">
              Create Account
            </button>

          </form>

          {/* Social Authenticator */}
          <div className="mt-4">
            <div className="rounded-xl flex justify-center gap-3 items-center p-3 w-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer">
              <img src={google} alt="google icon" className="w-5 h-5 object-contain" />
              <button className="text-white text-xs font-semibold uppercase tracking-wider">Sign up with Google</button>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 mt-6">
            <p>
              Already have an account?{" "}
              <button className="text-highlighted-btn-bg font-extrabold hover:underline" onClick={() => logNavigate('/login')}>
                Sign In
              </button>
            </p>
          </div>

        </div>  
      </div>
    </div>
  );
};

export default SignUp;
