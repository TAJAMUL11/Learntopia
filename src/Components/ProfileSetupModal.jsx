import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import AvatarGrid from "./AvatarGrid";
import Avatar from "./Avatar";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

/**
 * Full-screen compact profile-setup modal.
 *
 * Two modes:
 *  1. **Mandatory** (isOpen driven by `needsProfileSetup`) — blocks the app.
 *  2. **Edit** (`editMode` = true) — user opens it from Dashboard.
 *
 * Props:
 *  - isOpen       (bool)
 *  - onClose      (fn)        — only called in edit mode
 *  - editMode     (bool)      — when true, shows "Edit Profile" header + cancel
 *  - initialName  (string)    — pre-fill for edit mode
 *  - initialAvatar(string)    — pre-fill for edit mode
 */
const ProfileSetupModal = ({
  isOpen,
  onClose,
  editMode = false,
  initialName = "",
  initialAvatar = null,
  initialUsePhoto = false,
}) => {
  const { currentUser, completeProfileSetup } = useAuth();
  const { t } = useLanguage();
  const [displayName, setDisplayName] = useState(initialName);
  const [avatarId, setAvatarId] = useState(initialAvatar);
  // A real photo (Google account picture) is available only for Google sign-ins.
  const googlePhoto = currentUser?.photoURL || null;
  const [usePhoto, setUsePhoto] = useState(initialUsePhoto && !!googlePhoto);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Sync initial values when they change (e.g., modal re-opens in edit mode)
  useEffect(() => {
    if (isOpen) {
      setDisplayName(initialName);
      setAvatarId(initialAvatar);
      setUsePhoto(initialUsePhoto && !!googlePhoto);
      setError("");
    }
  }, [isOpen, initialName, initialAvatar, initialUsePhoto, googlePhoto]);

  if (!isOpen) return null;

  const NAME_MIN = 3;
  const NAME_MAX = 20;
  const NAME_REGEX = /^[a-zA-Z0-9 _]+$/;

  const validateFormat = () => {
    const trimmed = displayName.trim();
    if (trimmed.length < NAME_MIN || trimmed.length > NAME_MAX) {
      setError(t("profileSetup.nameErrorLength", { min: NAME_MIN, max: NAME_MAX }));
      return false;
    }
    if (!NAME_REGEX.test(trimmed)) {
      setError(t("profileSetup.nameErrorChars"));
      return false;
    }
    if (!avatarId) {
      setError(t("profileSetup.avatarError"));
      return false;
    }
    setError("");
    return true;
  };

  const validateNameUnique = async (name) => {
    try {
      const q = query(
        collection(db, "PublicLeaderboard"),
        where("displayName", "==", name)
      );
      const snap = await getDocs(q);
      const isTaken = snap.docs.some((d) => d.id !== currentUser?.uid);
      if (isTaken) {
        setError(t("profileSetup.nameTaken"));
        return false;
      }
    } catch (e) {
      console.warn("Unique name check notice:", e);
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFormat()) return;
    setSaving(true);
    try {
      const isUnique = await validateNameUnique(displayName.trim());
      if (!isUnique) {
        setSaving(false);
        return;
      }
      await completeProfileSetup(displayName.trim(), avatarId, { usePhoto: usePhoto && !!googlePhoto });
      toast.success(
        editMode
          ? t("profileSetup.editSuccess")
          : t("profileSetup.setupSuccess")
      );
      if (editMode && onClose) onClose();
    } catch (err) {
      console.error("Profile setup error:", err);
      toast.error(t("profileSetup.saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ground-900/90 backdrop-blur-xl"
        onClick={editMode ? onClose : undefined}
      />

      {/* Sleek, Compact Modal */}
      <div className="relative z-10 my-auto w-full max-w-lg animate-fade-in rounded-2xl border border-white/10 bg-ground-900 p-5 sm:p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              {editMode
                ? t("profileSetup.editTitle")
                : t("profileSetup.title")}
            </h2>
            <p className="mt-0.5 text-xs text-ink-low">
              {t("profileSetup.subtitle")}
            </p>
          </div>
          {editMode && (
            <button
              type="button"
              onClick={onClose}
              className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-ink-low transition-colors hover:bg-white/10 hover:text-white"
            >
              <Icon name="x" size={14} />
            </button>
          )}
        </div>

        {/* Live Preview Bar */}
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] p-3">
          <Avatar
            avatarId={avatarId}
            photoURL={usePhoto ? googlePhoto : null}
            size={48}
            name={displayName}
          />
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-white">
              {displayName.trim() || t("profileSetup.previewPlaceholder")}
            </p>
            <p className="text-[11px] text-ink-low">
              {t("profileSetup.previewHint")}
            </p>
          </div>
        </div>

        {/* Google-photo toggle — only when the account has a real photo.
            Their photo shows on their own Dashboard/Navbar; the leaderboard
            always uses the chosen avatar (never a real face). */}
        {googlePhoto && (
          <label className="mb-4 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]">
            <Avatar photoURL={googlePhoto} size={36} name={displayName} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white">
                {t("profileSetup.useGooglePhoto")}
              </p>
              <p className="mt-0.5 text-[10px] leading-snug text-ink-faint">
                {t("profileSetup.useGooglePhotoHint")}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={usePhoto}
              onClick={() => setUsePhoto((v) => !v)}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                usePhoto ? "bg-violet-500" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                  usePhoto ? "left-[18px]" : "left-0.5"
                }`}
              />
            </button>
          </label>
        )}

        {/* Display name input */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-white">
            {t("profileSetup.nameLabel")}
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
              if (error) setError("");
            }}
            placeholder={t("profileSetup.namePlaceholder")}
            maxLength={NAME_MAX}
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-ink-faint focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-all"
          />
          <p className="mt-1 text-[10px] text-ink-faint">
            {t("profileSetup.nameHelper")}
          </p>
        </div>

        {/* Avatar picker */}
        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold text-white">
            {t("profileSetup.avatarLabel")}
          </label>
          <AvatarGrid selectedId={avatarId} onSelect={setAvatarId} />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            <Icon name="alert-circle" size={14} className="shrink-0 text-red-400" />
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          {editMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={saving}
              className="text-xs"
            >
              {t("profileSetup.cancelBtn")}
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving || !displayName.trim() || !avatarId}
            size="sm"
            className="min-w-[130px]"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {t("profileSetup.saving")}
              </span>
            ) : (
              t("profileSetup.saveBtn")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
