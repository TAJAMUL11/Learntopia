import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "./ui/Icon";
import Button from "./ui/Button";
import Logo from "./ui/Logo";

// Primary navigation. Documentation is intentionally kept out of the main nav
// (it's reference material) and lives in the footer instead.
const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/courses", label: "Courses" },
  { to: "/quiz", label: "Quiz" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

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

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/signUp")}>
            Sign up
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink-hi transition-colors hover:bg-white/5 md:hidden"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <Icon name={isMenuOpen ? "close" : "menu"} size={22} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-ground-900/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
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
          <li className="mt-3 grid grid-cols-2 gap-3">
            <Button variant="ghost" fullWidth onClick={() => { closeMenu(); navigate("/login"); }}>
              Log in
            </Button>
            <Button variant="primary" fullWidth onClick={() => { closeMenu(); navigate("/signUp"); }}>
              Sign up
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
