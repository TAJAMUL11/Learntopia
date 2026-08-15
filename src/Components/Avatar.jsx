import { getAvatarById } from "../data/avatarData";

/**
 * Renders an avatar by ID at a given size.
 * Falls back to a gradient circle with the user's initial when no avatar is set.
 *
 * Props:
 *  - avatarId  (string|null)  — ID from avatarData
 *  - size      (number)       — pixel size (width & height)
 *  - name      (string)       — fallback initial source
 *  - className (string)       — extra classes on the wrapper
 */
const Avatar = ({ avatarId, size = 40, name = "", className = "" }) => {
  const avatar = avatarId ? getAvatarById(avatarId) : null;

  if (avatar) {
    return (
      <div
        className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        {avatar.svg(size)}
      </div>
    );
  }

  // Fallback: gradient circle + first letter
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
