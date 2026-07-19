import Icon from "./Icon";

// Labeled form field with optional leading icon, error state + inline message,
// and password reveal handled by the parent (via `rightSlot`). Renders an
// <input> or <textarea>.

const Field = ({
  label,
  id,
  error,
  icon,
  textarea = false,
  rightSlot,
  className = "",
  ...rest
}) => {
  const base = `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[0.95rem] text-ink-hi outline-none
    transition-all duration-200 placeholder:text-ink-low
    focus:bg-white/[0.05] focus:ring-2
    ${error
      ? "border-state-danger/70 focus:border-state-danger focus:ring-state-danger/25"
      : "border-white/[0.08] focus:border-violet-500 focus:ring-violet-500/25"}
    ${icon ? "pl-11" : ""} ${rightSlot ? "pr-11" : ""}`;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="ml-0.5 text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 text-ink-low">
            <Icon name={icon} size={18} />
          </span>
        )}
        {textarea ? (
          <textarea id={id} className={`${base} resize-none`} {...rest} />
        ) : (
          <input id={id} className={base} {...rest} />
        )}
        {rightSlot && <span className="absolute right-2">{rightSlot}</span>}
      </div>
      {error && (
        <span className="flex items-center gap-1.5 text-xs text-state-danger">
          <Icon name="info" size={14} />
          {error}
        </span>
      )}
    </div>
  );
};

export default Field;
