import { useState, useEffect } from "react";
import { getAvatarById } from "../data/avatarData";

/**
 * Renders a user's picture at a given size.
 *
 * Priority:
 *   1. `photoURL` (a real photo, e.g. Google account picture) — ONLY passed on
 *      private surfaces (Dashboard, Navbar). Never pass it on the public
 *      leaderboard, so a child's real face is never shown to other users.
 *   2. `avatarId` — a DiceBear cartoon avatar.
 *   3. Fallback — a gradient circle with the user's initial.
 *
 * If a photo fails to load (e.g. an expired Google URL) it silently falls back
 * to the avatar/initial, so the UI never shows a broken image.
 *
 * Props:
 *  - photoURL  (string|null)  — real photo URL (private surfaces only)
 *  - avatarId  (string|null)  — DiceBear avatar ID
 *  - size      (number)       — pixel size (width & height)
 *  - name      (string)       — fallback initial source
 *  - className (string)       — extra classes on the wrapper
 */
const Avatar = ({ photoURL = null, avatarId, size = 40, name = "", className = "" }) => {
  const [photoFailed, setPhotoFailed] = useState(false);

  // Reset the failure flag if the photo source changes.
  useEffect(() => setPhotoFailed(false), [photoURL]);

  const wrapperClass = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`;

  // 1. Real photo (private surfaces only).
  if (photoURL && !photoFailed) {
    return (
      <div className={wrapperClass} style={{ width: size, height: size }}>
        <img
          src={photoURL}
          alt=""
          draggable={false}
          onError={() => setPhotoFailed(true)}
          referrerPolicy="no-referrer"
          style={{ width: size, height: size, objectFit: "cover" }}
        />
      </div>
    );
  }

  // 2. DiceBear avatar.
  const avatar = avatarId ? getAvatarById(avatarId) : null;
  if (avatar) {
    return (
      <div className={wrapperClass} style={{ width: size, height: size }}>
        {avatar.svg(size)}
      </div>
    );
  }

  // 3. Fallback: gradient circle + first letter.
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const fontSize = Math.max(10, Math.round(size * 0.4));

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-sky shadow-glow ${className}`}
      style={{ width: size, height: size, fontSize }}
    >
      <span className="font-bold leading-none text-white">{initial}</span>
    </div>
  );
};

export default Avatar;
