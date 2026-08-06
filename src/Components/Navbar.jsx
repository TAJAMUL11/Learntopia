import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Icon from "./ui/Icon";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import { useAuth } from "../context/AuthContext";
import { useSound } from "../context/SoundContext";

// Primary navigation. Documentation is intentionally kept out of the main nav
// (it's reference material) and lives in the footer instead.
const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/courses", label: "Courses" },
  { to: "/quiz", label: "Quiz" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  const { isMuted, toggleMute, playClick } = useSound();

  const handleSoundToggle = () => {
    toggleMute();
    if (isMuted) {
      // If it was muted, unmuting will trigger sound
      soundEffects?.click?.();
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logOut();
      closeMenu();
      toast.success("You've been logged out");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't log you out. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 select-none border-b border-white/[0.07] bg-ground-900/70 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between">
        {/* Brand */}
        <NavLink to="/" onClick={closeMenu} className="transition-opacity hover:opacity-90">
          <Logo size={34} />
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-li ${isActive ? "text-sky" : ""}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop auth & sound controls */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Global Sound Toggle Button */}
          <button
            onClick={toggleMute}
            className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors ${
              isMuted
                ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "border-sky/20 bg-sky/10 text-sky hover:bg-sky/20"
            }`}
            title={isMuted ? "Sound: Muted (Click to Unmute)" : "Sound: Enabled (Click to Mute)"}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            <Icon name={isMuted ? "volume-x" : "volume-2"} size={18} />
          </button>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <div onClick={() => navigate("/dashboard")} className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" referrerPolicy="no-referrer" className="h-8 w-8 rounded-full border border-white/10" />
                ) : (
                  <div className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-ink-low">
                    <Icon name="user" size={16} />
                  </div>
                )}
                <span className="text-sm font-medium text-ink-hi">
                  Dashboard
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate("/signUp")}>
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile sound toggle & menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleMute}
            className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors ${
              isMuted
                ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "border-sky/20 bg-sky/10 text-sky hover:bg-sky/20"
            }`}
            title={isMuted ? "Sound: Muted" : "Sound: Enabled"}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            <Icon name={isMuted ? "volume-x" : "volume-2"} size={18} />
          </button>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-ink-hi transition-colors hover:bg-white/5"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-ground-900/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isMenuOpen ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium transition-colors ${
                    isActive ? "bg-white/[0.06] text-sky" : "text-ink hover:bg-white/[0.04] hover:text-ink-hi"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Mobile Sound Control Bar */}
          <li className="my-2 rounded-lg border border-white/10 bg-white/5 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name={isMuted ? "volume-x" : "volume-2"} size={18} className={isMuted ? "text-red-400" : "text-sky"} />
              <span className="text-sm font-medium text-ink-hi">Sound Effects</span>
            </div>
            <button
              onClick={toggleMute}
              className={`px-3 py-1 text-xs font-semibold rounded-md border transition-colors ${
                isMuted
                  ? "border-red-500/30 bg-red-500/20 text-red-300"
                  : "border-sky/30 bg-sky/20 text-sky"
              }`}
            >
              {isMuted ? "MUTED" : "ON"}
            </button>
          </li>

          <li className="mt-2">
            {currentUser ? (
              <div className="flex flex-col gap-3">
                <div onClick={() => { closeMenu(); navigate("/dashboard"); }} className="flex items-center gap-3 rounded-lg bg-white/5 p-3 cursor-pointer transition-colors hover:bg-white/10">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" referrerPolicy="no-referrer" className="h-10 w-10 rounded-full border border-white/10" />
                  ) : (
                    <div className="grid h-10 w-10 flex-none place-items-center rounded-full border border-white/10 bg-white/5 text-ink-low">
                      <Icon name="user" size={20} />
                    </div>
                  )}
                  <span className="text-sm font-semibold text-ink-hi">
                    Dashboard
                  </span>
                </div>
                <Button variant="ghost" fullWidth onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button variant="ghost" fullWidth onClick={() => { closeMenu(); navigate("/login"); }}>
                  Log in
                </Button>
                <Button variant="primary" fullWidth onClick={() => { closeMenu(); navigate("/signUp"); }}>
                  Sign up
                </Button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
