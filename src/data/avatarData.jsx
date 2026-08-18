/**
 * avatarData.jsx
 * 16 polished, kid-friendly headshot avatars.
 *
 * The SVGs are PRE-RENDERED (DiceBear "Adventurer") into static files under
 * public/avatars/ by scripts/gen-avatars.mjs, so neither the DiceBear library
 * nor the avatar data ships in the JS bundle — each avatar is a cached static
 * asset fetched only when shown. Regenerate with `npm run gen:avatars` after
 * changing the style/seeds/backgrounds.
 *
 * The 16 IDs are unchanged from the original set, so existing users keep their
 * chosen avatar. Each ID doubles as the deterministic seed AND the file name.
 *
 * Avatar art: "Adventurer" by Lisa Wischofsky, licensed CC BY 4.0 (see README).
 *
 * Categories: "feminine" | "masculine" (kept only to drive the picker's filter
 * tabs — the avatar style itself is gender-neutral).
 */

// Return a render fn compatible with the Avatar/AvatarGrid API: `svg(size)`.
const build = (id) => {
  const src = `/avatars/${id}.svg`;
  const render = (size = 48) => (
    <img
      src={src}
      alt=""
      loading="lazy"
      draggable={false}
      width={size}
      height={size}
      className="rounded-full"
      style={{ width: size, height: size }}
    />
  );
  return render;
};

// ── Feminine set ─────────────────────────────────────────────────────────────
const feminineAvatars = [
  { id: "astro-girl",     label: "Space Explorer", category: "feminine", svg: build("astro-girl") },
  { id: "pixel-princess", label: "Cyber Princess", category: "feminine", svg: build("pixel-princess") },
  { id: "skater-girl",    label: "Skater Star",    category: "feminine", svg: build("skater-girl") },
  { id: "wizard-girl",    label: "Spell Caster",   category: "feminine", svg: build("wizard-girl") },
  { id: "music-girl",     label: "Beat Maker",     category: "feminine", svg: build("music-girl") },
  { id: "coder-girl",     label: "Code Queen",     category: "feminine", svg: build("coder-girl") },
  { id: "artist-girl",    label: "Art Star",       category: "feminine", svg: build("artist-girl") },
  { id: "science-girl",   label: "Lab Genius",     category: "feminine", svg: build("science-girl") },
];

// ── Masculine set ────────────────────────────────────────────────────────────
const masculineAvatars = [
  { id: "ninja-boy",    label: "Cyber Ninja",   category: "masculine", svg: build("ninja-boy") },
  { id: "gamer-boy",    label: "Pro Gamer",     category: "masculine", svg: build("gamer-boy") },
  { id: "robot-boy",    label: "Mecha Bot",     category: "masculine", svg: build("robot-boy") },
  { id: "skater-boy",   label: "Board Rider",   category: "masculine", svg: build("skater-boy") },
  { id: "explorer-boy", label: "Wild Explorer", category: "masculine", svg: build("explorer-boy") },
  { id: "rocket-boy",   label: "Rocket Kid",    category: "masculine", svg: build("rocket-boy") },
  { id: "sport-boy",    label: "All-Star",      category: "masculine", svg: build("sport-boy") },
  { id: "dino-boy",     label: "Dino Rider",    category: "masculine", svg: build("dino-boy") },
];

export const AVATARS = [...feminineAvatars, ...masculineAvatars];

export const getAvatarById = (id) => AVATARS.find((a) => a.id === id) || null;

export const DEFAULT_AVATAR_ID = null;
