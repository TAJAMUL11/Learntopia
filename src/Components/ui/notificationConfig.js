/**
 * Shared notification config — one source of truth for both presentations:
 *  - corner toasts (ToastStack) for routine messages
 *  - the centered modal (NotificationModal) for "big moments"
 *
 * Each type maps to a tone (colour), an icon, i18n keys for its title and
 * (modal-only) button, and a `sound` (a key into SoundContext's playSound). The
 * sound plays exactly once per notification. Titles/buttons are localized.
 */
export const NOTIFICATION_CONFIG = {
  login:          { tone: "sky",     icon: "user",     sound: "levelUp",      titleKey: "toasts.titleLogin",    btnKey: "toasts.btnLogin" },
  signup:         { tone: "violet",  icon: "sparkles", sound: "badgeUnlock",  titleKey: "toasts.titleSignup",   btnKey: "toasts.btnSignup" },
  logout:         { tone: "neutral", icon: "logout",   sound: "click",        titleKey: "toasts.titleLogout",   btnKey: "toasts.btnLogout" },
  profile:        { tone: "green",   icon: "check",    sound: "correct",      titleKey: "toasts.titleProfile",  btnKey: "toasts.btnProfile" },
  quiz:           { tone: "violet",  icon: "target",   sound: "correct",      titleKey: "toasts.titleQuiz",     btnKey: "toasts.btnQuiz" },
  unenroll:       { tone: "sky",     icon: "info",     sound: "click",        titleKey: "toasts.titleUnenroll", btnKey: "toasts.btnUnenroll" },
  delete_profile: { tone: "danger",  icon: "warning",  sound: "warningAlert", titleKey: "toasts.titleDelete",   btnKey: "toasts.btnDelete" },
  success:        { tone: "green",   icon: "check",    sound: "correct",      titleKey: "toasts.titleSuccess",  btnKey: "toasts.btnGeneric" },
  error:          { tone: "danger",  icon: "warning",  sound: "incorrect",    titleKey: "toasts.titleError",    btnKey: "toasts.btnRetry" },
  warning:        { tone: "amber",   icon: "warning",  sound: "warningAlert", titleKey: "toasts.titleWarning",  btnKey: "toasts.btnGeneric" },
  info:           { tone: "violet",  icon: "info",     sound: "click",        titleKey: "toasts.titleInfo",     btnKey: "toasts.btnGeneric" },
};

// Tailwind classes per tone (core palette + status tokens only).
export const TONE_STYLES = {
  sky:     { chip: "text-sky border-sky/40 bg-sky/[0.12]",                       bar: "bg-sky" },
  violet:  { chip: "text-violet-400 border-violet-500/40 bg-violet-500/[0.14]",  bar: "bg-violet-500" },
  green:   { chip: "text-state-success border-state-success/40 bg-state-success/[0.12]", bar: "bg-state-success" },
  danger:  { chip: "text-state-danger border-state-danger/40 bg-state-danger/[0.12]",    bar: "bg-state-danger" },
  amber:   { chip: "text-amber-400 border-amber-500/40 bg-amber-500/[0.12]",     bar: "bg-amber-400" },
  neutral: { chip: "text-ink border-white/10 bg-white/[0.05]",                   bar: "bg-ink-faint" },
};

// Which types are shown as the centered "big moment" modal (everything else is a
// lightweight corner toast).
export const MODAL_TYPES = new Set(["signup", "delete_profile"]);

export const getNotificationConfig = (type) => NOTIFICATION_CONFIG[type] || NOTIFICATION_CONFIG.info;

/**
 * Guards a notification's SFX so it fires exactly once per notification id, even
 * across React StrictMode's dev remounts. Returns true only the first time an id
 * is seen. Keeps a small rolling set so it never grows unbounded.
 */
const playedSoundIds = new Set();
export function shouldPlaySound(id) {
  if (!id || playedSoundIds.has(id)) return false;
  playedSoundIds.add(id);
  if (playedSoundIds.size > 60) {
    playedSoundIds.delete(playedSoundIds.values().next().value);
  }
  return true;
}
