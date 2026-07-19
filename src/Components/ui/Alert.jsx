import Icon from "./Icon";

// Inline message with severity encoded in FORM (left stripe + matching icon),
// not color alone — readable at a glance and to assistive tech.

const CONFIG = {
  info: { stripe: "border-l-state-info", icon: "info", tint: "text-state-info" },
  success: { stripe: "border-l-state-success", icon: "check-circle", tint: "text-state-success" },
  warning: { stripe: "border-l-state-warning", icon: "warning", tint: "text-state-warning" },
  danger: { stripe: "border-l-state-danger", icon: "x-circle", tint: "text-state-danger" },
};

const Alert = ({ variant = "info", title, children, className = "" }) => {
  const c = CONFIG[variant] || CONFIG.info;
  return (
    <div
      role={variant === "danger" || variant === "warning" ? "alert" : "status"}
      className={`glass flex items-start gap-3 rounded-xl border-l-[3px] p-4 ${c.stripe} ${className}`}
    >
      <span className={`mt-0.5 flex-none ${c.tint}`}>
        <Icon name={c.icon} size={20} />
      </span>
      <div className="min-w-0">
        {title && <h4 className="text-sm font-semibold text-ink-hi">{title}</h4>}
        {children && <div className="mt-0.5 text-[0.82rem] leading-relaxed text-ink">{children}</div>}
      </div>
    </div>
  );
};

export default Alert;
