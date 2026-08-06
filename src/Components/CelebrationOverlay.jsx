import { useEffect } from "react";
import { useGamification } from "../context/GamificationContext";
import { useSound } from "../context/SoundContext";
import Icon from "./ui/Icon";
import Button from "./ui/Button";

const CelebrationOverlay = () => {
  const { celebration, closeCelebration } = useGamification();
  const { playLevelUp, playBadgeUnlock } = useSound();

  useEffect(() => {
    if (celebration) {
      if (celebration.type === "level" || celebration.type === "course") {
        playLevelUp();
      } else if (celebration.type === "badge") {
        playBadgeUnlock();
      }
    }
  }, [celebration, playLevelUp, playBadgeUnlock]);

  if (!celebration) return null;

  const isLevel = celebration.type === "level";
  const isBadge = celebration.type === "badge";
  const isCourse = celebration.type === "course";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ground-900/80 backdrop-blur-md animate-fade-in p-4">
      {/* Background Particle Effects / Glow */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-violet-500/20 blur-[100px] animate-pulse" />
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-sky/20 blur-[90px] animate-pulse delay-700" />

      {/* Main Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-violet-500/40 bg-gradient-to-b from-ground-800 to-ground-900 p-8 text-center shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-scale-up">
        {/* Top Decorative Sparkles */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-violet-500/50 bg-gradient-to-br from-violet-500/20 to-sky/20 shadow-[0_0_30px_rgba(139,92,246,0.4)] animate-bounce">
          <span className="text-5xl">
            {isLevel
              ? "⚡"
              : isBadge
              ? celebration.badge?.emoji || "🏆"
              : isCourse
              ? "🎓"
              : "🎉"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          {celebration.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-base leading-relaxed text-ink-low">
          {celebration.message}
        </p>

        {/* Additional Badge info if present */}
        {celebration.badge && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-300">
            <span>{celebration.badge.emoji}</span>
            <span>{celebration.badge.name} Badge</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8">
          <Button
            size="lg"
            className="w-full shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
            onClick={closeCelebration}
          >
            Awesome! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CelebrationOverlay;
