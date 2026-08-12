import { useGamification } from "../context/GamificationContext";
import { useLanguage } from "../context/LanguageContext";
import { useSound } from "../context/SoundContext";
import Button from "./ui/Button";

/**
 * StreakModal — HelloTalk-style Gamified Streak Popup Modal
 * Triggers automatically when a logged-in student visits the app with streak >= 3.
 * Features:
 * - Glowing multi-layer flame animation 🔥
 * - 7-Day progress node bar (completed ✅, active 🔥, bonus gift 🎁)
 * - +20 Streak Bonus XP badge & motivational feedback
 * - Displays once per calendar day per user.
 */
const StreakModal = () => {
  const { streak, showStreakModal, dismissStreakModal } = useGamification();
  const { t } = useLanguage();
  const { playBadgeUnlock } = useSound();

  if (!showStreakModal || streak < 3) return null;

  const handleClose = () => {
    playBadgeUnlock();
    dismissStreakModal();
  };

  // Build 7-day progress nodes
  const totalDays = 7;
  const currentDayInCycle = ((streak - 1) % totalDays) + 1;

  const days = Array.from({ length: totalDays }, (_, i) => {
    const dayNum = i + 1;
    const isCompleted = dayNum < currentDayInCycle;
    const isActive = dayNum === currentDayInCycle;
    const isGift = dayNum === 7;

    return {
      dayNum,
      isCompleted,
      isActive,
      isGift,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ground-900/85 backdrop-blur-md p-4 animate-fade-in">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-amber-500/25 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-orange-500/20 blur-[100px] animate-pulse delay-500" />

      {/* Main Glassmorphism Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-ground-800/95 via-ground-850 to-ground-900 p-6 text-center shadow-[0_0_60px_rgba(245,158,11,0.3)] md:p-8 animate-scale-up">
        {/* Decorative Top Banner Pill */}
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          {t("dashboard.dayStreak") || "Daily Streak"}
        </div>

        {/* Hero Flame Avatar */}
        <div className="relative mx-auto mb-5 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/40 via-orange-500/40 to-yellow-400/40 blur-xl animate-pulse" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-500/60 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-yellow-500/10 shadow-[0_0_35px_rgba(245,158,11,0.5)]">
            <span className="text-6xl animate-bounce">🔥</span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          {t("streakModal.title", { count: streak })}
        </h3>
        <p className="mt-2 text-sm text-ink-low md:text-base">
          {t("streakModal.subtitle")}
        </p>

        {/* HelloTalk-Style 7-Day Progress Track */}
        <div className="my-6 rounded-2xl border border-white/10 bg-ground-900/60 p-4 backdrop-blur-sm">
          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {days.map((d) => (
              <div key={d.dayNum} className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                    d.isActive
                      ? "border-2 border-amber-400 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-110"
                      : d.isCompleted
                      ? "border border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                      : d.isGift
                      ? "border border-violet-500/40 bg-violet-500/20 text-violet-300"
                      : "border border-white/10 bg-ground-800/50 text-ink-muted opacity-60"
                  }`}
                >
                  {d.isCompleted ? (
                    "✓"
                  ) : d.isActive ? (
                    "🔥"
                  ) : d.isGift ? (
                    "🎁"
                  ) : (
                    <span className="text-xs">{d.dayNum}</span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-ink-muted">
                  {t("streakModal.dayLabel", { day: d.dayNum })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus XP Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400">
          <span>⚡</span>
          <span>{t("streakModal.streakBonus", { amount: 20 })}</span>
        </div>

        {/* Motivation Quote */}
        <p className="mb-6 text-xs italic text-ink-muted">
          {t("streakModal.motivation")}
        </p>

        {/* Close CTA */}
        <Button
          onClick={handleClose}
          className="w-full justify-center bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 py-3.5 text-base font-bold text-white shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:brightness-110 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)]"
        >
          {t("streakModal.keepGoing")}
        </Button>
      </div>
    </div>
  );
};

export default StreakModal;
