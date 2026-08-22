/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { MODAL_TYPES } from "../Components/ui/notificationConfig";

/**
 * ToastContext — native, zero-dependency notifications.
 *
 * Two presentations, chosen automatically by type:
 *  - "toast"  → lightweight corner cards that stack and auto-dismiss (routine).
 *  - "modal"  → a single centered dialog for "big moments" (sign-up, account
 *    deletion). Big-moment types are listed in MODAL_TYPES.
 *
 * Callers use the semantic `toast.*` API and pass an already-localized message;
 * titles/buttons are localized by type at render time.
 */
const ToastContext = createContext();

const MAX_TOASTS = 3; // most corner toasts visible at once (oldest drop off)
const TOAST_DURATION = 3000;
const MODAL_DURATION = 4500;

let globalToastHandler = null;
let idCounter = 0;
const nextId = () => `n${Date.now()}_${idCounter++}`;

function emit(type, message, options = {}) {
  if (!globalToastHandler) return undefined;
  const { autoClose, duration, variant, ...rest } = options;
  const resolvedVariant = variant || (MODAL_TYPES.has(type) ? "modal" : "toast");
  const fallback = resolvedVariant === "modal" ? MODAL_DURATION : TOAST_DURATION;
  const resolvedDuration =
    autoClose === false || duration === 0 ? 0 : autoClose ?? duration ?? fallback;
  return globalToastHandler.add({
    type,
    message,
    variant: resolvedVariant,
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
  // Force a centered modal regardless of type.
  modal: (message, options = {}) => emit(options.type || "info", message, { ...options, variant: "modal" }),
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
  const [toasts, setToasts] = useState([]); // corner stack
  const [modalQueue, setModalQueue] = useState([]); // big-moment queue
  const [activeModal, setActiveModal] = useState(null);

  // Promote the next queued modal when none is showing.
  useEffect(() => {
    if (!activeModal && modalQueue.length > 0) {
      setActiveModal(modalQueue[0]);
      setModalQueue((q) => q.slice(1));
    }
  }, [modalQueue, activeModal]);

  const add = useCallback((data) => {
    const item = { id: nextId(), ...data };
    if (data.variant === "modal") {
      setModalQueue((q) => [...q, item]);
    } else {
      setToasts((list) => {
        const next = [...list, item];
        return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;
      });
    }
    return item.id;
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const dismissModal = useCallback((id) => {
    setActiveModal((cur) => (cur && (!id || cur.id === id) ? null : cur));
    setModalQueue((q) => (id ? q.filter((m) => m.id !== id) : q));
  }, []);

  const dismiss = useCallback(
    (id) => {
      dismissToast(id);
      dismissModal(id);
    },
    [dismissToast, dismissModal]
  );

  useEffect(() => {
    globalToastHandler = { add, dismiss };
    return () => {
      globalToastHandler = null;
    };
  }, [add, dismiss]);

  return (
    <ToastContext.Provider
      value={{ toasts, activeModal, add, dismiss, dismissToast, dismissModal }}
    >
      {children}
    </ToastContext.Provider>
  );
}
