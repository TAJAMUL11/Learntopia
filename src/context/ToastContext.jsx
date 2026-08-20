/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";

/**
 * ToastContext.jsx
 * Native, zero-dependency centered notification & popup dialog context.
 * All notifications auto-close after 5000ms (5 seconds).
 */
const ToastContext = createContext();

let globalToastHandler = null;

/**
 * emit — queue one notification.
 * `type` is passed EXPLICITLY by the caller (no fragile message-sniffing), so
 * the modal always shows the right icon/title/button. Title and button text are
 * localized inside NotificationModal by type; callers only pass the (already
 * localized) message, plus optional overrides.
 */
function emit(type, message, options = {}) {
  if (!globalToastHandler) return undefined;
  const { autoClose, duration, ...rest } = options;
  const resolvedDuration =
    autoClose === false || duration === 0 ? 0 : autoClose ?? duration ?? 5000;
  return globalToastHandler.addToast({
    type,
    message,
    title: rest.title,
    confirmLabel: rest.confirmLabel,
    onConfirm: rest.onConfirm,
    cancelLabel: rest.cancelLabel,
    onCancel: rest.onCancel,
    badgeText: rest.badgeText,
    duration: resolvedDuration,
  });
}

export const toast = {
  // ── Typed notifications — caller passes the localized message string ──
  login: (message, options = {}) => emit("login", message, options),
  signup: (message, options = {}) => emit("signup", message, options),
  logout: (message, options = {}) => emit("logout", message, options),
  profileSaved: (message, options = {}) => emit("profile", message, options),
  unenroll: (message, options = {}) => emit("unenroll", message, options),
  accountDeleted: (message, options = {}) => emit("delete_profile", message, options),
  quizSaved: (message, options = {}) => emit("quiz", message, options),
  // ── Generic notifications ──
  success: (message, options = {}) => emit("success", message, options),
  error: (message, options = {}) => emit("error", message, options),
  info: (message, options = {}) => emit("info", message, options),
  warning: (message, options = {}) => emit("warning", message, options),
  popup: (customConfig) => globalToastHandler?.addPopup(customConfig),
  dismiss: (id) => globalToastHandler?.dismiss(id),
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    if (!activeToast && queue.length > 0) {
      const nextToast = queue[0];
      setActiveToast(nextToast);
      setQueue((prev) => prev.slice(1));
    }
  }, [queue, activeToast]);

  const addToast = useCallback((toastData) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, ...toastData };
    setQueue((prev) => [...prev, newToast]);
    return id;
  }, []);

  const addPopup = useCallback((popupData) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newPopup = { id, type: "custom", ...popupData };
    setQueue((prev) => [...prev, newPopup]);
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setActiveToast((current) => {
      if (current && (!id || current.id === id)) {
        return null;
      }
      return current;
    });
    if (id) {
      setQueue((prev) => prev.filter((item) => item.id !== id));
    }
  }, []);

  useEffect(() => {
    globalToastHandler = { addToast, addPopup, dismiss };
    return () => {
      globalToastHandler = null;
    };
  }, [addToast, addPopup, dismiss]);

  return (
    <ToastContext.Provider
      value={{
        activeToast,
        queueLength: queue.length,
        addToast,
        addPopup,
        dismiss,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
