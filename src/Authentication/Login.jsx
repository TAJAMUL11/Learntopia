import { Link, useNavigate } from "react-router-dom"
import google from '../assets/Icons/google.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import signIn from '../assets/Icons/signIn.png'
import signUpImage from '../assets/signUpImage.jpeg'


const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const logNavigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPolicy, setUserPolicy] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handlePolicyCheck = () => {
    if (userEmail && userPassword) {
      setUserPolicy(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await signInWithEmailAndPassword(auth, userEmail, userPassword)
      toast.success('Successfully Logged in');
      logNavigate('/dashboard', {replace:true})
      setUserEmail('')
      setUserPassword('')
      setUserPolicy(false);

    }
    catch (e) {
      let errorMessage = "Invalid Email or Password";
      if (e.code === "auth/user-not-found") {
        errorMessage = "User not found. Please check your email address.";
      } else if (e.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      }
    
      toast.error(errorMessage);
      setUserEmail('');
      setUserPassword('');
      setUserPolicy(false);
    }


  }

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 flex items-center justify-center min-h-[80vh] text-white">
      <div className="flex w-full max-w-5xl gap-10 items-center justify-center">
        {/* Left Side banner */}
        <div className="hidden lg:block w-1/2 max-w-[45%]">
          <img src={signUpImage} alt="Sign In Banner" className="w-full h-auto object-cover rounded-3xl border border-white/5 shadow-2xl" />
        </div>

        {/* Frosted Glass Form Container */}
        <div className="w-full max-w-md background-blur p-6 md:p-8 rounded-3xl border border-light-bg-color shadow-custom-shadow">
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            
            {/* Header Form */}
            <div className="flex flex-col items-center mb-6">
              <img src={signIn} alt="LearnTopia logo" className="max-w-[60px] mb-2" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-center">Welcome Back!</h2>
              <p className="text-sm text-gray-400 mt-1">
                We are <span className="text-highlighted-btn-bg font-semibold">happy</span> to see you again.
              </p>
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

            {/* Checkbox Rows */}
            <div className="flex justify-between items-center text-xs text-gray-300 mt-2 mb-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" onChange={handlePolicyCheck} className="rounded accent-button-bg-color" />
                Remember me
              </label>
              <Link to="/" className="text-highlighted-btn-bg hover:underline">Forgot Password?</Link>
            </div>

            <div className="text-xs text-gray-400 mb-5 leading-relaxed">
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
              Log in
            </button>

          </form>

          {/* Social Authenticator */}
          <div className="mt-4">
            <div className="rounded-xl flex justify-center gap-3 items-center p-3 w-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer">
              <img src={google} alt="google icon" className="w-5 h-5 object-contain" />
              <button className="text-white text-xs font-semibold uppercase tracking-wider">Log in with Google</button>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 mt-6">
            <p>
              Do not have an account?{" "}
              <button className="text-highlighted-btn-bg font-extrabold hover:underline" onClick={() => logNavigate('/signUp')}>
                Register Here
              </button>
            </p>
          </div>

        </div>  
      </div>
    </div>
  )
}

export default Login