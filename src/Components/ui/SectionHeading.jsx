// Consistent section header: optional uppercase eyebrow, title, and supporting
// line. Used across pages so headings read as one system.

const SectionHeading = ({ eyebrow, title, description, centered = false, className = "" }) => (
  <div className={`${centered ? "mx-auto text-center" : ""} ${centered ? "max-w-2xl" : "max-w-3xl"} ${className}`}>
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">{eyebrow}</p>
    )}
    {title && (
      <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-ink-hi md:text-3xl">
        {title}
      </h2>
    )}
    {description && <p className="mt-2.5 leading-relaxed text-ink-low">{description}</p>}
  </div>
);

export default SectionHeading;
