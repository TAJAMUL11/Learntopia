import { useId } from "react";
import Icon from "./Icon";

/**
 * AwardArt — high-quality, detailed, multi-colour SVG award icons (gradients +
 * layered highlights), a step up from the flat single-stroke Icon set. Used for
 * award/achievement medallions and as the static fallback for the Lottie awards.
 *
 * Each takes { size, className }. Gradient ids are namespaced with useId so many
 * can render on one page without collisions.
 */

export const FlameArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}o`} x1="24" y1="5" x2="24" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" /><stop offset="0.45" stopColor="#F97316" /><stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id={`${id}i`} x1="24" y1="18" x2="24" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" /><stop offset="0.5" stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d="M25 4c1.5 7 9 9.5 9 18a10 10 0 0 1-20 0c0-4.6 2.4-7.2 3.8-9.8 1 2.6 2.6 3 2.6 5.6 2.4-3.8-.4-8.6 4.6-13.8Z" fill={`url(#${id}o)`} />
      <path d="M24 20c1.4 3 4.6 3.8 4.6 7.6a4.6 4.6 0 0 1-9.2 0c0-2.4 1.6-3.6 2.2-5.2 1 1.4 2 1.4 2.4-2.4Z" fill={`url(#${id}i)`} />
    </svg>
  );
};

export const TrophyArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="14" y1="7" x2="34" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" /><stop offset="0.5" stopColor="#F59E0B" /><stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <path d="M14 12h-3.5a4.5 4.5 0 0 0 4.5 7.5" stroke={`url(#${id}g)`} strokeWidth="3" strokeLinecap="round" />
      <path d="M34 12h3.5a4.5 4.5 0 0 1-4.5 7.5" stroke={`url(#${id}g)`} strokeWidth="3" strokeLinecap="round" />
      <path d="M14 7h20v7a10 10 0 0 1-20 0Z" fill={`url(#${id}g)`} stroke="#FDE68A" strokeWidth="1" />
      <rect x="22" y="25" width="4" height="6" fill={`url(#${id}g)`} />
      <rect x="15" y="31" width="18" height="4" rx="1.5" fill={`url(#${id}g)`} />
      <rect x="17.5" y="35" width="13" height="3" rx="1.5" fill="#8B5A0B" />
      <path d="M24 10.5l1.4 3 3.2.3-2.4 2.1.7 3.1-2.9-1.7-2.9 1.7.7-3.1-2.4-2.1 3.2-.3Z" fill="#FFFBEB" fillOpacity="0.92" />
      <ellipse cx="19.5" cy="11.5" rx="2.4" ry="3.4" fill="#FFFFFF" fillOpacity="0.28" />
    </svg>
  );
};

export const CrownArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="8" y1="12" x2="40" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" /><stop offset="0.5" stopColor="#F59E0B" /><stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <path d="M8 34 10 16l8 8 6-12 6 12 8-8 2 18Z" fill={`url(#${id}g)`} stroke="#FDE68A" strokeWidth="1" strokeLinejoin="round" />
      <rect x="8" y="33" width="32" height="6" rx="2" fill={`url(#${id}g)`} />
      <rect x="8" y="33" width="32" height="2.4" rx="1.2" fill="#FFFFFF" fillOpacity="0.25" />
      <circle cx="24" cy="12" r="2.6" fill="#7BBFF2" />
      <circle cx="10" cy="16" r="2" fill="#FB7185" />
      <circle cx="38" cy="16" r="2" fill="#FB7185" />
      <circle cx="16" cy="36.5" r="1.4" fill="#8B63E3" />
      <circle cx="24" cy="36.5" r="1.4" fill="#8B63E3" />
      <circle cx="32" cy="36.5" r="1.4" fill="#8B63E3" />
    </svg>
  );
};

export const ZapArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="14" y1="4" x2="34" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBBAF5" /><stop offset="0.5" stopColor="#8B63E3" /><stop offset="1" stopColor="#7BBFF2" />
        </linearGradient>
      </defs>
      <path d="M27 4 11 27h10l-3 17 18-23H24l3-17Z" fill={`url(#${id}g)`} stroke="#E9E2FB" strokeWidth="1" strokeLinejoin="round" />
      <path d="M27 4 11 27h5l7-23Z" fill="#FFFFFF" fillOpacity="0.25" />
    </svg>
  );
};

export const StarArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="24" y1="5" x2="24" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" /><stop offset="0.55" stopColor="#F59E0B" /><stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <path d="M24 5 29.3 18.5 43.5 19.4 32.6 28.6 36 42.3 24 34.6 12 42.3 15.4 28.6 4.5 19.4 18.7 18.5Z" fill={`url(#${id}g)`} stroke="#FDE68A" strokeWidth="1" strokeLinejoin="round" />
      <ellipse cx="19" cy="17" rx="3" ry="2" fill="#FFFFFF" fillOpacity="0.4" />
    </svg>
  );
};

export const TargetArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}d`} x1="30" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBBAF5" /><stop offset="1" stopColor="#8B63E3" />
        </linearGradient>
      </defs>
      <circle cx="21" cy="27" r="15" fill="#150E28" stroke="#7BBFF2" strokeWidth="2.4" />
      <circle cx="21" cy="27" r="9.6" fill="none" stroke="#7BBFF2" strokeWidth="2.2" strokeOpacity="0.6" />
      <circle cx="21" cy="27" r="4.4" fill="#7BBFF2" />
      <circle cx="21" cy="27" r="1.6" fill="#150E28" />
      <path d="M42 7 26 23" stroke={`url(#${id}d)`} strokeWidth="3" strokeLinecap="round" />
      <path d="M42 7l-4.4.7 3.7 3.7Z" fill="#8B63E3" />
      <circle cx="21" cy="27" r="2.4" fill="#F59E0B" />
    </svg>
  );
};

export const BookArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}l`} x1="7" y1="10" x2="24" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A584EB" /><stop offset="1" stopColor="#6D42BE" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="24" y1="10" x2="41" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7BBFF2" /><stop offset="1" stopColor="#4C8FCB" />
        </linearGradient>
      </defs>
      <path d="M24 12C20 9 12.5 9 7 11v26c5.5-2 13-2 17 1Z" fill={`url(#${id}l)`} />
      <path d="M24 12c4-3 11.5-3 17-1v26c-5.5-2-13-2-17 1Z" fill={`url(#${id}r)`} />
      <path d="M11 16h9M11 21h9M11 26h7" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M28 16h9M28 21h9M28 26h7" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M24 12v27" stroke="#0B0816" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  );
};

export const SparkleArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBBAF5" /><stop offset="0.5" stopColor="#8B63E3" /><stop offset="1" stopColor="#7BBFF2" />
        </linearGradient>
      </defs>
      <path d="M24 6c1.2 10 8 16.8 18 18-10 1.2-16.8 8-18 18-1.2-10-8-16.8-18-18 10-1.2 16.8-8 18-18Z" fill={`url(#${id}g)`} />
      <path d="M37 8c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z" fill="#FDE047" />
      <ellipse cx="18" cy="18" rx="3.2" ry="2.2" fill="#FFFFFF" fillOpacity="0.4" />
    </svg>
  );
};

export const CapArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="6" y1="12" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A584EB" /><stop offset="0.6" stopColor="#8B63E3" /><stop offset="1" stopColor="#7BBFF2" />
        </linearGradient>
      </defs>
      <path d="M24 10 44 19 24 28 4 19Z" fill={`url(#${id}g)`} stroke="#CBBAF5" strokeWidth="1" strokeLinejoin="round" />
      <path d="M14 22.5 24 27l10-4.5V30c0 3-4.6 5-10 5s-10-2-10-5Z" fill={`url(#${id}g)`} fillOpacity="0.85" />
      <path d="M24 10 44 19 24 24Z" fill="#FFFFFF" fillOpacity="0.18" />
      <path d="M42 19.5V29" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="42" cy="30.5" r="2.2" fill="#FDE047" />
    </svg>
  );
};

export const CodeArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="6" y1="8" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D42BE" /><stop offset="1" stopColor="#4C8FCB" />
        </linearGradient>
      </defs>
      <rect x="6" y="9" width="36" height="30" rx="8" fill={`url(#${id}g)`} stroke="#CBBAF5" strokeWidth="1" />
      <rect x="6" y="9" width="36" height="9" rx="8" fill="#FFFFFF" fillOpacity="0.12" />
      <path d="M18 20 13 26 18 32" stroke="#E9E2FB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 20 35 26 30 32" stroke="#E9E2FB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.5 18 21.5 34" stroke="#FDE047" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
};

export const MedalArt = ({ size = 48, className = "" }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}r`} x1="14" y1="5" x2="34" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B63E3" /><stop offset="1" stopColor="#7BBFF2" />
        </linearGradient>
        <radialGradient id={`${id}m`} cx="0.36" cy="0.3" r="0.85">
          <stop stopColor="#FDE68A" /><stop offset="0.5" stopColor="#F59E0B" /><stop offset="1" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <path d="M18 6 14 24l8-4Z" fill={`url(#${id}r)`} />
      <path d="M30 6 34 24l-8-4Z" fill={`url(#${id}r)`} />
      <circle cx="24" cy="31" r="12.5" fill={`url(#${id}m)`} stroke="#FDE68A" strokeWidth="1.2" />
      <circle cx="24" cy="31" r="8.5" fill="none" stroke="#8B5A0B" strokeOpacity="0.35" strokeWidth="1" />
      <path d="M24 25l2.1 4.4 4.8.5-3.6 3.2 1.1 4.7-4.4-2.5-4.4 2.5 1.1-4.7-3.6-3.2 4.8-.5Z" fill="#FFFBEB" />
      <ellipse cx="20" cy="27" rx="3" ry="2" fill="#FFFFFF" fillOpacity="0.35" />
    </svg>
  );
};

// Maps an Icon name to its detailed award art. Falls back to the flat Icon for
// utility names that don't have (and don't need) a detailed version.
const ART_BY_NAME = {
  sparkles: SparkleArt,
  target: TargetArt,
  award: MedalArt,
  "book-open": BookArt,
  "graduation-cap": CapArt,
  flame: FlameArt,
  zap: ZapArt,
  star: StarArt,
  code: CodeArt,
  trophy: TrophyArt,
  crown: CrownArt,
  medal: MedalArt,
};

export function AwardIcon({ name, size = 40, className = "" }) {
  const Art = ART_BY_NAME[name];
  return Art ? <Art size={size} className={className} /> : <Icon name={name} size={size} className={className} />;
}
