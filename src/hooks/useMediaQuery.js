import { useState, useEffect } from "react";

/**
 * useMediaQuery — subscribe to a CSS media query and re-render on changes.
 * SSR/no-matchMedia safe (returns false).
 *
 *   const isSmall = useMediaQuery("(max-width: 639px)");
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
