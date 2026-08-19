import { useEffect, useState, useRef } from "react";
import { useToast } from "../../context/ToastContext";
import { useSound } from "../../context/SoundContext";
import Icon from "./Icon";

/**
 * NotificationModal.jsx
 * Centered glassmorphic popup modal dialog.
 * Auto-closes after 5 seconds (5000ms) with hover pause, backdrop tap,
 * Escape key dismiss, contextual action buttons, and single-fire audio feedback.
 */
export default function NotificationModal() {
  const { activeToast, dismiss } = useToast();
  const { playCorrect, playIncorrect, playModuleComplete, playWarningAlert, playClick } = useSound();

  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  const duration = activeToast?.duration || 5000;

  // Play audio SFX EXACTLY ONCE when a new popup modal mounts (prevents double sound bug)
  useEffect(() => {
    if (!activeToast) return;
    const type = activeToast.type;

    if (type === "error") {
      playIncorrect();
    } else if (type === "warning" || type === "logout" || type === "delete_profile") {
      playWarningAlert();
    } else if (type === "course_complete") {
      playModuleComplete();
    } else {
      playCorrect();
    }
  }, [activeToast?.id]); // Only re-run when activeToast ID changes

  // Auto-dismiss countdown timer (5000ms / 5 seconds default) with pause-on-hover logic
  useEffect(() => {
    if (!activeToast || !duration || duration <= 0) {
      setProgress(100);
      return;
    }

    let startTime = Date.now();
    let animId;

    const tick = () => {
      if (isHovered) {
        // Paused while hovered — adjust startTime so timer freezes smoothly
        startTime = Date.now() - (1 - progress / 100) * duration;
        animId = requestAnimationFrame(tick);
        return;
      }

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const percentage = (remaining / duration) * 100;

      setProgress(percentage);

      if (remaining <= 0) {
        dismiss(activeToast.id);
      } else {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, [activeToast?.id, duration, dismiss, isHovered]);

  // Handle keyboard Escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeToast) {
        playClick();
        if (activeToast.onCancel) {
          activeToast.onCancel();
        }
        dismiss(activeToast.id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeToast, dismiss, playClick]);

  if (!activeToast) return null;

  const {
    id,
    type = "info",
    title,
    message,
    confirmLabel,
    onConfirm,
    cancelLabel,
    onCancel,
    badgeText,
  } = activeToast;

  const handleConfirm = () => {
    playClick();
    if (onConfirm) onConfirm();
    dismiss(id);
  };

  const handleCancel = () => {
    playClick();
    if (onCancel) onCancel();
    dismiss(id);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      playClick();
      if (onCancel) onCancel();
      dismiss(id);
    }
  };

  // Notification type configurations with relevant icons and default button text
  const typeConfigs = {
    login: {
      defaultTitle: "Welcome Back",
      iconName: "user",
      iconColor: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/25",
      defaultButton: "Explore Dashboard",
    },
    signup: {
      defaultTitle: "Welcome to Learntopia",
      iconName: "sparkles",
      iconColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/25",
      defaultButton: "Start Learning",
    },
    logout: {
      defaultTitle: "Logged Out Safely",
      iconName: "close",
      iconColor: "text-slate-300",
      bgColor: "bg-white/[0.05]",
      borderColor: "border-white/10",
      defaultButton: "See You Soon",
    },
    profile: {
      defaultTitle: "Profile Updated",
      iconName: "user",
      iconColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/25",
      defaultButton: "Done",
    },
    course_complete: {
      defaultTitle: "Course Completed!",
      iconName: "trophy",
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/25",
      defaultButton: "View Achievements",
    },
    quiz: {
      defaultTitle: "Quiz Score Saved",
      iconName: "target",
      iconColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/25",
      defaultButton: "Check Leaderboard",
    },
    unenroll: {
      defaultTitle: "Unenrolled",
      iconName: "info",
      iconColor: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/25",
      defaultButton: "Done",
    },
    delete_profile: {
      defaultTitle: "Profile Removed",
      iconName: "warning",
      iconColor: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/25",
      defaultButton: "Goodbye",
    },
    success: {
      defaultTitle: "Success",
      iconName: "check",
      iconColor: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/25",
      defaultButton: "Done",
    },
    error: {
      defaultTitle: "Notice",
      iconName: "warning",
      iconColor: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/25",
      defaultButton: "Try Again",
    },
    warning: {
      defaultTitle: "Attention",
      iconName: "warning",
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/25",
      defaultButton: "Understand",
    },
    info: {
      defaultTitle: "Information",
      iconName: "info",
      iconColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/25",
      defaultButton: "Understood",
    },
  };

  const config = typeConfigs[type] || typeConfigs.info;
  const displayTitle = title || config.defaultTitle;
  const displayButtonText = confirmLabel || config.defaultButton;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-opacity duration-200 animate-fade-in cursor-pointer"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Centered Glassmorphic Modal Card */}
      <div
        className="relative w-[92%] max-w-md bg-[#0F0C1B]/95 backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.75)] text-center space-y-4 overflow-hidden transform transition-all duration-200 scale-100 animate-popup-pop cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Optional Eyebrow Badge (Rendered ONLY if badgeText is explicitly supplied) */}
        {badgeText && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[11px] font-semibold tracking-wider text-violet-300 uppercase mx-auto">
            {badgeText}
          </div>
        )}

        {/* Clean Centered Icon Badge */}
        <div className="pt-1 flex justify-center">
          <div
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${config.bgColor} ${config.borderColor} border ${config.iconColor}`}
          >
            <Icon name={config.iconName} className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        {/* Title & Detailed Body Message */}
        <div className="space-y-1.5 relative z-10">
          <h3 className="text-lg sm:text-xl font-bold text-[#F1EEF8] tracking-tight">
            {displayTitle}
          </h3>
          {message && (
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto font-normal">
              {message}
            </p>
          )}
        </div>

        {/* Action Button Section */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
          {cancelLabel && (
            <button
              onClick={handleCancel}
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              {cancelLabel}
            </button>
          )}

          <button
            onClick={handleConfirm}
            type="button"
            className="w-full sm:w-auto min-w-[130px] px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer tracking-wide"
          >
            {displayButtonText}
          </button>
        </div>

        {/* Thin, Subtle 5-Second Countdown Progress Bar */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden">
            <div
              className="h-full bg-violet-500/50 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
