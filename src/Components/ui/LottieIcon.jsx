import { Suspense, lazy, Component, useState } from "react";
import { AwardIcon } from "./AwardArt";
// The WASM runtime is bundled and served from our own origin (fingerprinted by
// Vite), not fetched from a public CDN. This removes the external dependency and
// the ~1.2 MB cross-origin download, and keeps animations working even if a CDN
// is blocked or down.
import wasmUrl from "@lottiefiles/dotlottie-web/dotlottie-player.wasm?url";

/**
 * LottieIcon — plays a dotLottie (.lottie) animation for celebratory/award icons.
 *
 * Resilience model: a static SVG (AwardArt) is shown at every point where the
 * animation is not on screen — no src, while the player chunk loads, if the
 * chunk import fails, if the WASM/animation fails to load, or if the render
 * throws. As soon as the animation is ready it replaces the SVG. So the UI never
 * shows a blank box, and it degrades to the SVG whenever Lottie can't play.
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
  import("@lottiefiles/dotlottie-react").then((m) => {
    // Point the player at our self-hosted WASM before the first instance loads.
    try {
      m.setWasmUrl(wasmUrl);
    } catch {
      /* older/newer players may not expose this; CDN default still works */
    }
    return { default: m.DotLottieReact };
  })
);

// Catches a failed chunk import or a render error in the player subtree and
// shows the SVG fallback instead of crashing the surrounding UI.
class LottieBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function LottieIcon({
  src,
  size = 40,
  loop = true,
  autoplay = true,
  fallbackIcon = "sparkles",
  className = "",
}) {
  // Set true if the animation itself fails to load (bad file, WASM unavailable).
  const [loadFailed, setLoadFailed] = useState(false);

  const box = { width: size, height: size };
  const fallback = <AwardIcon name={fallbackIcon} size={size} />;

  if (!src || loadFailed) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} style={box}>
        {fallback}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={box} aria-hidden="true">
      <LottieBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <DotLottieReact
            src={src}
            loop={loop}
            autoplay={autoplay}
            style={box}
            dotLottieRefCallback={(dl) => {
              if (dl) dl.addEventListener("loadError", () => setLoadFailed(true));
            }}
          />
        </Suspense>
      </LottieBoundary>
    </span>
  );
}
