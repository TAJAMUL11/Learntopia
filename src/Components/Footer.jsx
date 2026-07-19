import { NavLink } from "react-router-dom";
import Logo from "./ui/Logo";

const LINK_GROUPS = [
  {
    title: "Explore",
    links: [
      { to: "/courses", label: "Courses" },
      { to: "/quiz", label: "Quiz Center" },
      { to: "/doc", label: "Documentation" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Log in" },
      { to: "/signUp", label: "Sign up" },
      { to: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/", label: "Home" },
    ],
  },
];

const Footer = () => (
  <footer className="mt-20 select-none border-t border-white/[0.07] bg-ground-900/60 backdrop-blur-md">
    <div className="container-page py-12">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand column */}
        <div>
          <Logo size={34} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-low">
            Build real skills online with interactive courses and timed quiz challenges — and track your progress as you go.
          </p>
        </div>

        {/* Link columns */}
        {LINK_GROUPS.map((group) => (
          <div key={group.title}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink">{group.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-ink-low transition-colors hover:text-ink-hi"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-ink-low sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Learntopia. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="transition-colors hover:text-ink-hi">Privacy Policy</a>
          <span className="text-white/15">|</span>
          <a href="#" className="transition-colors hover:text-ink-hi">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
