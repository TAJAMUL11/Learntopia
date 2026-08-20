import { useEffect, useRef, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";
import { useSound } from "../../context/SoundContext";
import { getNotificationConfig, TONE_STYLES, shouldPlaySound } from "./notificationConfig";
import Icon from "./Icon";

/**
 * ToastStack — lightweight corner notifications for routine messages.
 * Top-centre on mobile (full-width), top-right on larger screens. Toasts stack,
 * auto-dismiss (pause on hover), and can be closed with the ✕. No backdrop, no
 * bulky button — an optional inline action link only.
 */
function ToastCard({ toast: item, onDismiss }) {
  const { t } = useLanguage();
  const { playSound } = useSound();
  const cfg = getNotificationConfig(item.type);
  const tone = TONE_STYLES[cfg.tone] || TONE_STYLES.violet;
  const duration = item.duration ?? 4500;

  const [progress, setProgress] = useState(100);
  const [leaving, setLeaving] = useState(false);
  const hovered = useRef(false);

  // One SFX per toast (distinct per type; guarded so it never plays twice).
  useEffect(() => {
    if (cfg.sound && shouldPlaySound(item.id)) playSound(cfg.sound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  const close = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onDismiss, 200); // let the exit animation play
  };

  useEffect(() => {
    if (!duration || duration <= 0) return undefined;
    let raf;
    let start = Date.now();
    const tick = () => {
      if (hovered.current) {
        start = Date.now() - (1 - progress / 100) * duration;
        raf = requestAnimationFrame(tick);
        return;
      }
      const remaining = Math.max(0, duration - (Date.now() - start));
      setProgress((remaining / duration) * 100);
      if (remaining <= 0) close();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, duration]);

  const title = item.title || t(cfg.titleKey);

  return (
    <div
      role="status"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      className={`pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-ground-700/95 to-ground-800/95 pl-3 pr-9 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-200 sm:w-[350px] ${
        leaving ? "translate-x-2 opacity-0" : "animate-fade-up"
      }`}
    >
      <div className="flex gap-3">
        <span className={`mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl border ${tone.chip}`}>
          <Icon name={cfg.icon} size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold leading-tight text-ink-hi">{title}</p>
          {item.message && (
            <p className="mt-0.5 text-xs leading-relaxed text-ink-low">{item.message}</p>
          )}
          {item.confirmLabel && item.onConfirm && (
            <button
              type="button"
              onClick={() => {
                item.onConfirm?.();
                close();
              }}
              className={`mt-1.5 inline-flex items-center gap-1 text-[11.5px] font-bold ${cfg.tone === "sky" ? "text-sky" : "text-violet-400"} hover:underline`}
            >
              {item.confirmLabel}
              <Icon name="arrow-right" size={12} />
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Dismiss notification"
        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-md text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
      >
        <Icon name="close" size={13} />
      </button>

      {duration > 0 && (
        <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-white/5">
          <div className={`h-full ${tone.bar}`} style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

export default function ToastStack() {
  const { toasts, dismissToast } = useToast();
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999] flex flex-col items-center gap-2.5 p-3 sm:inset-x-auto sm:right-0 sm:items-end sm:p-4">
      {toasts.map((item) => (
        <ToastCard key={item.id} toast={item} onDismiss={() => dismissToast(item.id)} />
      ))}
    </div>
  );
}
