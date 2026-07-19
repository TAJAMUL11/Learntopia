import Icon from "./Icon";

// Shown when there's nothing to display — guides the next step instead of a
// blank panel.

const EmptyState = ({ icon = "search", title, description, action, className = "" }) => (
  <div className={`flex flex-col items-center text-center ${className}`}>
    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.05] text-violet-400">
      <Icon name={icon} size={26} strokeWidth={1.8} />
    </div>
    {title && <h3 className="mb-1.5 text-lg font-bold text-ink-hi">{title}</h3>}
    {description && <p className="mx-auto mb-5 max-w-sm text-sm text-ink-low">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
