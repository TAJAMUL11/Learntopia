import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 py-4 backdrop-blur-md bg-[#0f0a1c]/70 border-b border-white/5 shadow-lg select-none">
      <div className="w-full max-w-[1280px] mx-auto flex justify-between items-center px-6 md:px-12">
        {/* Brand Logo */}
        <NavLink to="/" onClick={handleItemClick} className="flex items-center gap-2.5">
          <img src="/favicon.png" alt="Learntopia Icon" className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform duration-300 hover:scale-[1.05]" />
          <span className="text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-button-bg-color to-highlighted-btn-bg bg-clip-text text-transparent uppercase font-sans">
            Learntopia
          </span>
        </NavLink>

        {/* Navigation List */}
        <ul
          className={`absolute md:static top-full left-0 w-full md:w-auto bg-[#0f0a1c]/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b md:border-none border-white/10 flex flex-col md:flex-row justify-center items-center gap-2 py-6 md:py-0 transition-all duration-300 ease-out z-40 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-4 md:opacity-100 md:pointer-events-auto md:translate-y-0"
          }`}
          onClick={handleItemClick}
        >
          <NavLink to="/" className={({ isActive }) => `nav-li ${isActive ? "text-highlighted-btn-bg" : ""}`}>
            <li>Home</li>
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => `nav-li ${isActive ? "text-highlighted-btn-bg" : ""}`}>
            <li>Courses</li>
          </NavLink>
          <NavLink to="/quiz" className={({ isActive }) => `nav-li ${isActive ? "text-highlighted-btn-bg" : ""}`}>
            <li>Quiz</li>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-li ${isActive ? "text-highlighted-btn-bg" : ""}`}>
            <li>Contact</li>
          </NavLink>
          <NavLink to="/doc" className={({ isActive }) => `nav-li ${isActive ? "text-highlighted-btn-bg" : ""}`}>
            <li>Docs</li>
          </NavLink>

          {/* Mobile auth buttons inside list */}
          <div className="flex flex-col gap-2 w-full px-8 mt-4 md:hidden">
            <NavLink to="/login" className="w-full">
              <button className="w-full border border-white/20 hover:bg-white/5 py-2.5 rounded-xl text-white font-semibold transition-all">
                Log In
              </button>
            </NavLink>
            <NavLink to="/signUp" className="w-full">
              <button className="w-full bg-button-bg-color hover:bg-button-bg-color/90 py-2.5 rounded-xl text-white font-semibold shadow-md transition-all">
                Sign Up
              </button>
            </NavLink>
          </div>
        </ul>

        {/* Desktop Authentication Panel */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/login">
            <button className="px-5 py-2 border border-white/10 hover:border-white/25 hover:bg-white/5 rounded-xl text-sm font-semibold transition-all">
              Log In
            </button>
          </NavLink>
          <NavLink to="/signUp">
            <button className="px-5 py-2 bg-button-bg-color hover:bg-[#926eed] rounded-xl text-sm font-semibold shadow-md shadow-button-bg-color/20 transition-all hover:scale-[0.98]">
              Sign up
            </button>
          </NavLink>
        </div>

        {/* Mobile Toggle Trigger */}
        <div className="md:hidden">
          <button
            className="text-white hover:text-highlighted-btn-bg text-2xl p-1 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;