import { NavLink } from "react-router-dom";
import Logo from "./ui/Logo";
import Icon from "./ui/Icon";

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
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
    ],
  },
];

const Footer = () => (
  <footer className="mt-20 select-none border-t border-white/[0.07] bg-ground-900/60 backdrop-blur-md">
    <div className="container-page py-12">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
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
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-ink-low sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Learntopia. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>
            Built by{" "}
            <a
              href="https://github.com/tajamul11"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink transition-colors hover:text-ink-hi"
            >
              Tajamul Wani
            </a>
          </span>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/tajamul11"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.08] text-ink-low transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-ink-hi"
            >
              <Icon name="github" size={16} />
            </a>
            <a
              href="https://linkedin.com/in/tajamul-wani"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.08] text-ink-low transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-ink-hi"
            >
              <Icon name="linkedin" size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
