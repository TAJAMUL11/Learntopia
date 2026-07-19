// Small pill for subjects / categories / status. `solid` is the emphasized
// variant; the rest are quiet tints.

const VARIANTS = {
  default: "bg-white/[0.06] text-ink-hi border-white/[0.13]",
  solid: "bg-violet-600 text-white border-transparent",
  sky: "bg-sky/[0.16] text-sky border-sky/35",
  success: "bg-state-success/[0.14] text-state-success border-state-success/35",
  warning: "bg-state-warning/[0.14] text-state-warning border-state-warning/35",
  danger: "bg-state-danger/[0.14] text-rose-300 border-state-danger/35",
};

const Badge = ({ variant = "default", className = "", children }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${VARIANTS[variant]} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
