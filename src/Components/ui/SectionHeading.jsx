// Consistent section header: optional uppercase eyebrow, title, and supporting
// line. Used across pages so headings read as one system.

const SectionHeading = ({ eyebrow, title, description, centered = false, className = "" }) => (
  <div className={`${centered ? "mx-auto text-center" : ""} ${centered ? "max-w-2xl" : "max-w-3xl"} ${className}`}>
    {eyebrow && (
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-violet-400 sm:text-xs sm:tracking-[0.18em]">
        {eyebrow}
      </p>
    )}
    {title && (
      <h2 className="mt-2 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-ink-hi sm:text-4xl">
        {title}
      </h2>
    )}
    {description && (
      <p className="mt-3 text-sm leading-relaxed text-ink-low sm:text-base">{description}</p>
    )}
  </div>
);

export default SectionHeading;
