import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Icon from "./ui/Icon";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "../context/AuthContext";
import { useSound } from "../context/SoundContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  const { isMuted, toggleMute } = useSound();
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/courses", label: t("nav.courses") },
    { to: "/quiz", label: t("nav.quiz") },
    { to: "/leaderboard", label: t("nav.leaderboard") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = NAV_ITEMS.filter((item) => item.to !== "/leaderboard" || currentUser);

  const handleLogout = async () => {
    try {
      await logOut();
      closeMenu();
      toast.success(t("toasts.loggedOut"));
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(t("toasts.logoutFailedRetry"));
    }
  };

  return (
    <header className="sticky top-0 z-50 select-none border-b border-white/[0.08] bg-ground-900/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.35)]">
      <nav className="container-page relative flex items-center justify-between py-3.5">
        {/* Zone 1 (Left): Brand Logo */}
        <NavLink to="/" onClick={closeMenu} className="flex items-center transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
          <Logo size={34} />
        </NavLink>

        {/* Zone 2 (Center): Flex-Centered Desktop Links */}
        <ul className="hidden flex-1 items-center justify-center gap-5 lg:gap-8 px-4 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-li text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                    isActive ? "text-sky drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]" : "text-ink-low hover:text-ink-hi"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Zone 3 (Right): Balanced Controls & Auth Capsule */}
        <div className="hidden items-center gap-2.5 shrink-0 md:flex">
          {/* Controls Capsule: Language + Sound SFX */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-sm">
            {/* Language Selector Dropdown */}
            <LanguageSelector />

            {/* Global Sound Toggle Button */}
            <button
              onClick={toggleMute}
              className={`h-[34px] flex items-center gap-1.5 rounded-full border px-3 text-xs font-semibold backdrop-blur-md transition-all duration-200 ${
                isMuted
                  ? "border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                  : "border-sky/25 bg-sky/10 text-sky hover:border-sky/50 hover:bg-sky/20 hover:shadow-glow"
              }`}
              title={isMuted ? "Sound Effects: Muted (Click to Enable)" : "Sound Effects: Active (Click to Mute)"}
              aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            >
              <Icon name={isMuted ? "volume-x" : "volume-2"} size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">{isMuted ? t("common.off") : t("common.sfx")}</span>
            </button>
          </div>

          {/* User Auth or Student Dashboard Profile Pill */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div
                onClick={() => navigate("/dashboard")}
                title="View your student profile & dashboard"
                className="group h-[34px] flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 cursor-pointer transition-all duration-200 hover:border-sky/50 hover:bg-sky/10 hover:shadow-glow"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="h-5 w-5 rounded-full border border-white/20 object-cover"
                  />
                ) : (
                  <div className="grid h-5 w-5 place-items-center rounded-full border border-white/20 bg-sky/20 text-sky">
                    <Icon name="user" size={12} />
                  </div>
                )}
                <span className="text-xs font-bold text-ink-hi group-hover:text-sky transition-colors">
                  {t("nav.dashboard")}
                </span>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="h-[34px] px-2.5 text-xs text-ink-low hover:text-rose-400">
                {t("nav.logout")}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="h-[34px] flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-bold text-ink-hi whitespace-nowrap transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08]"
              >
                {t("nav.login")}
              </button>
              <button
                type="button"
                onClick={() => navigate("/signUp")}
                className="h-[34px] flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-sky px-5 text-xs font-extrabold text-white whitespace-nowrap shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_25px_rgba(139,92,246,0.55)]"
              >
                {t("nav.signUp")}
              </button>
            </div>
          )}
        </div>

        {/* Mobile controls & menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector />

          <button
            onClick={toggleMute}
            className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
              isMuted
                ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                : "border-sky/30 bg-sky/10 text-sky"
            }`}
            title={isMuted ? "Sound: Muted" : "Sound: Enabled"}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            <Icon name={isMuted ? "volume-x" : "volume-2"} size={17} />
          </button>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl text-ink-hi transition-colors hover:bg-white/5"
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
        className={`overflow-hidden border-t border-white/[0.08] bg-ground-900/98 backdrop-blur-2xl transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isMenuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-page flex flex-col gap-1 py-5">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block rounded-xl px-3.5 py-2.5 text-[0.95rem] font-semibold transition-colors ${
                    isActive ? "bg-white/[0.06] text-sky font-bold" : "text-ink hover:bg-white/[0.04] hover:text-ink-hi"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          <li className="mt-3">
            {currentUser ? (
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => { closeMenu(); navigate("/dashboard"); }}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 cursor-pointer transition-all hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-3">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="h-9 w-9 rounded-full border border-white/20 object-cover"
                      />
                    ) : (
                      <div className="grid h-9 w-9 flex-none place-items-center rounded-full border border-white/20 bg-sky/10 text-sky">
                        <Icon name="user" size={18} />
                      </div>
                    )}

                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-bold text-ink-hi group-hover:text-sky transition-colors">
                        {t("nav.dashboard")}
                      </span>
                      <span className="text-xs text-ink-low mt-0.5">
                        {currentUser.displayName || currentUser.email}
                      </span>
                    </div>
                  </div>

                  <Icon name="chevron-right" size={18} className="text-ink-low group-hover:text-sky transition-colors" />
                </div>

                <Button variant="ghost" fullWidth onClick={handleLogout} className="text-rose-400 hover:bg-rose-500/10">
                  {t("nav.logout")}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" fullWidth onClick={() => { closeMenu(); navigate("/login"); }}>
                  {t("nav.login")}
                </Button>
                <Button variant="primary" fullWidth onClick={() => { closeMenu(); navigate("/signUp"); }}>
                  {t("nav.signUp")}
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
