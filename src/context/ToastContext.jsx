import { createContext, useContext, useState, useCallback, useEffect } from "react";

/**
 * ToastContext.jsx
 * Native, zero-dependency centered notification & popup dialog context.
 * All notifications auto-close after 5000ms (5 seconds).
 */
const ToastContext = createContext();

let globalToastHandler = null;

export const toast = {
  login: (userName, options = {}) => {
    return emitToast(
      "login",
      userName
        ? `Great to see you again, ${userName}! Your learning progress and daily streak are ready.`
        : "Great to see you again! Your learning progress and daily streak are ready.",
      "Welcome Back",
      { duration: 5000, confirmLabel: "Explore Dashboard", ...options }
    );
  },
  signup: (userName, options = {}) => {
    return emitToast(
      "signup",
      "Your account has been created! Get ready to explore courses, earn XP, and collect badges.",
      "Welcome to Learntopia",
      { duration: 5000, confirmLabel: "Start Learning", ...options }
    );
  },
  logout: (options = {}) => {
    return emitToast(
      "logout",
      "You've been logged out safely. Come back tomorrow to keep your daily streak alive!",
      "Logged Out",
      { duration: 5000, confirmLabel: "See You Soon", ...options }
    );
  },
  profile: (message, options = {}) => {
    return emitToast(
      "profile",
      message || "Your display name and avatar settings have been saved successfully!",
      "Profile Updated",
      { duration: 5000, confirmLabel: "Done", ...options }
    );
  },
  courseComplete: (courseTitle, xpEarned = 100, options = {}) => {
    return emitToast(
      "course_complete",
      `Fantastic job! You've completed "${courseTitle || "this course"}" and earned +${xpEarned} XP!`,
      "Course Completed!",
      { duration: 5000, confirmLabel: "View Achievements", badgeText: `+${xpEarned} XP EARNED`, ...options }
    );
  },
  quizComplete: (options = {}) => {
    return emitToast(
      "quiz",
      "Great effort! Your score and XP have been updated on the global leaderboard.",
      "Quiz Score Saved",
      { duration: 5000, confirmLabel: "Check Leaderboard", ...options }
    );
  },
  success: (message, titleOrOptions = null, options = {}) => {
    return emitToast("success", message, titleOrOptions, options);
  },
  error: (message, titleOrOptions = null, options = {}) => {
    return emitToast("error", message, titleOrOptions, options);
  },
  info: (message, titleOrOptions = null, options = {}) => {
    return emitToast("info", message, titleOrOptions, options);
  },
  warning: (message, titleOrOptions = null, options = {}) => {
    return emitToast("warning", message, titleOrOptions, options);
  },
  popup: (customConfig) => {
    if (globalToastHandler) {
      return globalToastHandler.addPopup(customConfig);
    }
  },
  dismiss: (id) => {
    if (globalToastHandler) {
      return globalToastHandler.dismiss(id);
    }
  },
};

function emitToast(type, message, titleOrOptions, options) {
  let title = null;
  let config = {};

  if (typeof titleOrOptions === "string") {
    title = titleOrOptions;
    config = { ...options };
  } else if (typeof titleOrOptions === "object" && titleOrOptions !== null) {
    config = { ...titleOrOptions };
  } else {
    config = { ...options };
  }

  // Automatic contextual detection for standard toast.success / error calls
  let detectedType = type;
  const msgLower = (message || "").toLowerCase();

  if (type === "success") {
    if (msgLower.includes("logged in") || msgLower.includes("signed in")) {
      detectedType = "login";
      if (!title) title = "Welcome Back";
      if (!config.confirmLabel) config.confirmLabel = "Explore Dashboard";
    } else if (msgLower.includes("account created") || msgLower.includes("welcome to learntopia") || msgLower.includes("signup")) {
      detectedType = "signup";
      if (!title) title = "Welcome to Learntopia";
      if (!config.confirmLabel) config.confirmLabel = "Start Learning";
    } else if (msgLower.includes("logged out") || msgLower.includes("signed out") || msgLower.includes("safe")) {
      detectedType = "logout";
      if (!title) title = "Logged Out";
      if (!config.confirmLabel) config.confirmLabel = "See You Soon";
    } else if (msgLower.includes("course complete") || msgLower.includes("mastery")) {
      detectedType = "course_complete";
      if (!title) title = "Course Completed!";
      if (!config.confirmLabel) config.confirmLabel = "View Achievements";
    } else if (msgLower.includes("quiz score") || msgLower.includes("quiz progress") || msgLower.includes("quiz")) {
      detectedType = "quiz";
      if (!title) title = "Quiz Score Saved";
      if (!config.confirmLabel) config.confirmLabel = "Check Leaderboard";
    } else if (msgLower.includes("profile updated") || msgLower.includes("profile created") || msgLower.includes("profile")) {
      detectedType = "profile";
      if (!title) title = "Profile Updated";
      if (!config.confirmLabel) config.confirmLabel = "Done";
    } else if (msgLower.includes("unenrolled")) {
      detectedType = "unenroll";
      if (!title) title = "Unenrolled";
      if (!config.confirmLabel) config.confirmLabel = "Done";
    } else if (msgLower.includes("profile deleted")) {
      detectedType = "delete_profile";
      if (!title) title = "Profile Removed";
      if (!config.confirmLabel) config.confirmLabel = "Goodbye";
    } else {
      if (!title) title = "Success";
      if (!config.confirmLabel) config.confirmLabel = "Done";
    }
  } else if (type === "error") {
    if (!title) title = "Notice";
    if (!config.confirmLabel) config.confirmLabel = "Try Again";
  } else if (type === "info") {
    if (!title) title = "Information";
    if (!config.confirmLabel) config.confirmLabel = "Understood";
  }

  if (globalToastHandler) {
    return globalToastHandler.addToast({
      type: detectedType,
      message,
      title: title || config.title,
      duration: config.autoClose !== undefined && config.autoClose !== false ? config.autoClose : 5000,
      confirmLabel: config.confirmLabel,
      onConfirm: config.onConfirm,
      cancelLabel: config.cancelLabel,
      onCancel: config.onCancel,
      badgeText: config.badgeText,
    });
  }
}

// eslint-disable-next-line react-refresh/only-export-components
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
