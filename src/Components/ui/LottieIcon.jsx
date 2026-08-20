import { Suspense, lazy } from "react";
import { AwardIcon } from "./AwardArt";

/**
 * LottieIcon — plays a dotLottie (.lottie) animation for celebratory/award icons.
 *
 * The player is lazy-loaded (code-split) so it never touches the initial bundle.
 * Falls back to a static SVG icon when the user prefers reduced motion, while the
 * player is still loading, or if no src is given.
 *
 * Props:
 *  - src          (string)  imported .lottie URL — `import x from "…/x.lottie?url"`
 *  - size         (number)  px (default 40)
 *  - loop         (bool)    default true
 *  - autoplay     (bool)    default true
 *  - fallbackIcon (string)  Icon name shown when the animation can't play
 *  - className
 */
const DotLottieReact = lazy(() =>
  import("@lottiefiles/dotlottie-react").then((m) => ({ default: m.DotLottieReact }))
);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LottieIcon({
  src,
  size = 40,
  loop = true,
  autoplay = true,
  fallbackIcon = "sparkles",
  className = "",
}) {
  const box = { width: size, height: size };
  const fallback = <AwardIcon name={fallbackIcon} size={size} />;

  if (!src || prefersReducedMotion()) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} style={box}>
        {fallback}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={box} aria-hidden="true">
      <Suspense fallback={fallback}>
        <DotLottieReact src={src} loop={loop} autoplay={autoplay} style={box} />
      </Suspense>
    </span>
  );
}
