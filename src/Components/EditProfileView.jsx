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
 * EditProfileView — dedicated in-dashboard view for profile changes.
 *
 * Replaces the old cramped popup: a two-column layout (identity + fields on the
 * left, the full avatar grid on the right) reached from the dashboard's
 * "Edit Profile" button. It is NOT one of the content sub-tabs.
 *
 * Props:
 *  - onBack         (fn)      — return to the dashboard (not shown in required mode)
 *  - required       (bool)    — first-time onboarding: no Back/Cancel, must save
 *  - initialName    (string)
 *  - initialAvatar  (string|null)
 *  - initialUsePhoto(bool)
 */
const NAME_MIN = 3;
const NAME_MAX = 20;
const NAME_REGEX = /^[a-zA-Z0-9 _]+$/;

const EditProfileView = ({ onBack, required = false, initialName = "", initialAvatar = null, initialUsePhoto = false }) => {
  const { currentUser, completeProfileSetup } = useAuth();
  const { t } = useLanguage();

  const googlePhoto = currentUser?.photoURL || null;
  const [displayName, setDisplayName] = useState(initialName);
  const [avatarId, setAvatarId] = useState(initialAvatar);
  const [usePhoto, setUsePhoto] = useState(initialUsePhoto && !!googlePhoto);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDisplayName(initialName);
    setAvatarId(initialAvatar);
    setUsePhoto(initialUsePhoto && !!googlePhoto);
  }, [initialName, initialAvatar, initialUsePhoto, googlePhoto]);

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
      const q = query(collection(db, "PublicLeaderboard"), where("displayName", "==", name));
      const snap = await getDocs(q);
      if (snap.docs.some((d) => d.id !== currentUser?.uid)) {
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
      if (!(await validateNameUnique(displayName.trim()))) {
        setSaving(false);
        return;
      }
      await completeProfileSetup(displayName.trim(), avatarId, { usePhoto: usePhoto && !!googlePhoto });
      toast.success(required ? t("profileSetup.setupSuccess") : t("profileSetup.editSuccess"));
      onBack?.();
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(t("profileSetup.saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`container-page py-10 text-ink-hi md:py-14 ${required ? "min-h-screen" : ""}`}>
      <div className="mx-auto max-w-5xl animate-fade-in">

        {/* Back to dashboard — hidden during first-time (required) setup */}
        {!required && (
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-ink-low transition-colors hover:border-violet-700 hover:text-violet-300"
          >
            <Icon name="arrow-left" size={15} />
            {t("dashboard.backToDashboard")}
          </button>
        )}

        {/* View header */}
        <div className="mb-6">
          <h1 className="text-xl font-extrabold tracking-tight text-ink-hi sm:text-2xl">
            {required ? t("profileSetup.title") : t("profileSetup.editTitle")}
          </h1>
          <p className="mt-1 text-sm text-ink-low">
            {required ? t("profileSetup.requiredHint") : t("profileSetup.subtitle")}
          </p>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[360px_1fr]">

          {/* ── LEFT: identity + fields ── */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-card sm:p-6">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-low">
              {t("profileSetup.identitySection")}
            </p>

            {/* Live preview */}
            <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-gradient-to-b from-violet-600/10 to-transparent p-5 text-center">
              <Avatar
                avatarId={avatarId}
                photoURL={usePhoto ? googlePhoto : null}
                size={92}
                name={displayName}
                className="border-2 border-violet-500/40 shadow-glow"
              />
              <p className="max-w-full truncate text-base font-bold text-ink-hi">
                {displayName.trim() || t("profileSetup.previewPlaceholder")}
              </p>
              <p className="text-[11px] text-ink-low">{t("profileSetup.previewHint")}</p>
            </div>

            {/* Display name */}
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-semibold text-ink-hi">
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-ink-hi placeholder-ink-faint transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25"
              />
              <p className="mt-1.5 text-[10px] text-ink-faint">{t("profileSetup.nameHelper")}</p>
            </div>

            {/* Email — read-only & non-selectable */}
            {currentUser?.email && (
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold text-ink-hi">
                  {t("profileSetup.emailLabel")}
                </label>
                <div className="flex cursor-not-allowed select-none items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-ink-low">
                  <span className="truncate">{currentUser.email}</span>
                  <span className="flex flex-none items-center gap-1.5 text-[10px] text-ink-faint">
                    <Icon name="lock" size={12} />
                    {t("profileSetup.emailReadonly")}
                  </span>
                </div>
              </div>
            )}

            {/* Use my Google photo */}
            {googlePhoto && (
              <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]">
                <Avatar photoURL={googlePhoto} size={40} name={displayName} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-ink-hi">{t("profileSetup.useGooglePhoto")}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-ink-faint">
                    {t("profileSetup.useGooglePhotoHint")}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={usePhoto}
                  onClick={() => setUsePhoto((v) => !v)}
                  className={`relative h-5 w-9 flex-none rounded-full transition-colors ${
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
          </div>

          {/* ── RIGHT: avatar grid ── */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-card sm:p-6">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-low">
              {t("profileSetup.avatarLabel")}
            </p>

            <AvatarGrid selectedId={avatarId} onSelect={setAvatarId} />

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-state-danger/30 bg-state-danger/10 px-3 py-2 text-xs text-state-danger">
                <Icon name="alert-circle" size={14} className="flex-none" />
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 flex items-center justify-end gap-2.5 border-t border-white/[0.08] pt-4">
              {!required && (
                <Button variant="ghost" size="sm" onClick={onBack} disabled={saving} className="text-xs">
                  {t("profileSetup.cancelBtn")}
                </Button>
              )}
              <Button
                onClick={handleSave}
                disabled={saving || !displayName.trim() || !avatarId}
                size="sm"
                className="min-w-[140px] justify-center gap-2 font-bold"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {t("profileSetup.saving")}
                  </span>
                ) : (
                  <>
                    <Icon name="check" size={15} />
                    {t("profileSetup.saveBtn")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileView;
