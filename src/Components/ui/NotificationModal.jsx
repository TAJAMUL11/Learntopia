import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useSound } from "../../context/SoundContext";
import { useLanguage } from "../../context/LanguageContext";
import { getNotificationConfig, TONE_STYLES, shouldPlaySound } from "./notificationConfig";
import Icon from "./Icon";

/**
 * NotificationModal — the centered "big moment" dialog (sign-up welcome, account
 * deletion). Routine messages use the corner ToastStack instead. Auto-closes with
 * a hover-pause countdown; dismiss via button, backdrop, or Escape. Plays a single
 * SFX on open. Title & button text are localized by type.
 */
export default function NotificationModal() {
  const { activeModal, dismissModal } = useToast();
  const { t } = useLanguage();
  const { playSound, playClick } = useSound();

  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  const duration = activeModal?.duration || 6000;

  // One SFX per modal (from the shared config; guarded so it never plays twice).
  useEffect(() => {
    if (!activeModal) return;
    const cfg = getNotificationConfig(activeModal.type);
    if (cfg.sound && shouldPlaySound(activeModal.id)) playSound(cfg.sound);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModal?.id]);

  // Auto-dismiss countdown (pause on hover).
  useEffect(() => {
    if (!activeModal || !duration || duration <= 0) {
      setProgress(100);
      return undefined;
    }
    let start = Date.now();
    let raf;
    const tick = () => {
      if (isHovered) {
        start = Date.now() - (1 - progress / 100) * duration;
        raf = requestAnimationFrame(tick);
        return;
      }
      const remaining = Math.max(0, duration - (Date.now() - start));
      setProgress((remaining / duration) * 100);
      if (remaining <= 0) dismissModal(activeModal.id);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModal?.id, duration, isHovered]);

  // Escape to dismiss.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && activeModal) {
        playClick();
        activeModal.onCancel?.();
        dismissModal(activeModal.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeModal, dismissModal, playClick]);

  if (!activeModal) return null;

  const { id, type, title, message, confirmLabel, onConfirm, cancelLabel, onCancel, badgeText } = activeModal;
  const cfg = getNotificationConfig(type);
  const tone = TONE_STYLES[cfg.tone] || TONE_STYLES.violet;
  const displayTitle = title || t(cfg.titleKey);
  const displayButton = confirmLabel || t(cfg.btnKey);

  const handleConfirm = () => {
    playClick();
    onConfirm?.();
    dismissModal(id);
  };
  const handleCancel = () => {
    playClick();
    onCancel?.();
    dismissModal(id);
  };
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) handleCancel();
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-ground/80 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-[92%] max-w-md overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-ground-800 to-ground-900 p-7 text-center shadow-[0_24px_60px_rgba(0,0,0,0.6)] animate-popup-pop cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => e.stopPropagation()}
      >
        {badgeText && (
          <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-300">
            {badgeText}
          </div>
        )}

        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border ${tone.chip}`}>
          <Icon name={cfg.icon} size={26} />
        </div>

        <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink-hi">{displayTitle}</h3>
        {message && (
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink">{message}</p>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          className="mt-6 w-full rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-glow transition-all hover:brightness-110 active:scale-[0.98]"
        >
          {displayButton}
        </button>
        {cancelLabel && (
          <button
            type="button"
            onClick={handleCancel}
            className="mt-2.5 w-full rounded-xl border border-white/10 bg-transparent px-6 py-2.5 text-xs font-semibold text-ink-low transition-colors hover:bg-white/[0.04] hover:text-ink"
          >
            {cancelLabel}
          </button>
        )}

        {duration > 0 && (
          <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-white/5">
            <div className={`h-full ${tone.bar}`} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
