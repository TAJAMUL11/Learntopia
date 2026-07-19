import { useId } from "react";

// Learntopia brand mark: a graduation cap on a violet→sky gradient badge.
// Vector, so it stays crisp at every size and matches the favicon / OG image.
// `withWordmark` toggles the "Learntopia" text beside the mark.

const LogoMark = ({ size = 36, className = "" }) => {
  const gid = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="Learntopia"
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B79DF0" />
          <stop offset="0.55" stopColor="#8B63E3" />
          <stop offset="1" stopColor="#7BBFF2" />
        </linearGradient>
        <linearGradient id={`${gid}-sheen`} x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <rect x="2" y="2" width="44" height="44" rx="13" fill={`url(#${gid}-bg)`} />
      <rect x="2" y="2" width="44" height="44" rx="13" fill={`url(#${gid}-sheen)`} />
      <rect x="2.6" y="2.6" width="42.8" height="42.8" rx="12.4" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.2" />

      {/* Mortarboard */}
      <g>
        {/* board */}
        <path d="M24 12.5 42 20 24 27.5 6 20 24 12.5Z" fill="#ffffff" />
        <path d="M24 12.5 42 20 24 27.5 6 20 24 12.5Z" fill="#0B0713" fillOpacity="0.06" />
        {/* cap base under the board */}
        <path
          d="M14 22.2 24 26.4 34 22.2V29.4C34 32.1 29.5 34 24 34 18.5 34 14 32.1 14 29.4V22.2Z"
          fill="#ffffff"
          fillOpacity="0.92"
        />
        {/* tassel */}
        <path d="M40.5 20.7V29.2" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="40.5" cy="30.6" r="1.9" fill="#ffffff" />
      </g>
    </svg>
  );
};

const Logo = ({ withWordmark = true, size = 34, className = "" }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoMark size={size} />
    {withWordmark && (
      <span className="text-[1.35rem] font-extrabold leading-none tracking-tight text-ink-hi">
        Learn<span className="text-gradient">topia</span>
      </span>
    )}
  </span>
);

export { LogoMark };
export default Logo;
