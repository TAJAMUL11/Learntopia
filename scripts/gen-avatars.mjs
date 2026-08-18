/**
 * scripts/gen-avatars.mjs
 * Pre-renders the 16 fixed avatars to static SVG files in public/avatars/.
 * Serving them as cached static assets (loaded on demand) keeps the DiceBear
 * library AND the avatar data out of the JS bundle entirely — only the 1–2
 * avatars actually on screen are ever fetched, and they cache after first load.
 *
 * Run after changing the avatar STYLE, seeds, or backgrounds:
 *   npm run gen:avatars
 *
 * DiceBear stays a devDependency (used only here, never imported by src/).
 */
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { writeFileSync, mkdirSync } from "node:fs";

// One knob restyles every avatar. Kid-friendly alternatives from
// @dicebear/collection: bigSmile, funEmoji, bottts, thumbs, micah, personas.
const STYLE = adventurer;

// [id, backgroundColor]. IDs are unchanged from the original set so existing
// users keep their avatar; each ID doubles as the deterministic DiceBear seed.
const AVATARS = [
  ["astro-girl", "c7d2fe"],
  ["pixel-princess", "fbcfe8"],
  ["skater-girl", "e9d5ff"],
  ["wizard-girl", "ddd6fe"],
  ["music-girl", "bae6fd"],
  ["coder-girl", "a7f3d0"],
  ["artist-girl", "fed7aa"],
  ["science-girl", "fde68a"],
  ["ninja-boy", "cbd5e1"],
  ["gamer-boy", "bfdbfe"],
  ["robot-boy", "c7d2fe"],
  ["skater-boy", "d9f99d"],
  ["explorer-boy", "fecaca"],
  ["rocket-boy", "fda4af"],
  ["sport-boy", "99f6e4"],
  ["dino-boy", "bbf7d0"],
];

const svg = (seed, bg) =>
  createAvatar(STYLE, {
    seed,
    size: 96,
    radius: 50,
    backgroundColor: [bg],
    backgroundType: ["solid"],
  }).toString();

const outDir = new URL("../public/avatars/", import.meta.url);
mkdirSync(outDir, { recursive: true });

for (const [id, bg] of AVATARS) {
  writeFileSync(new URL(`${id}.svg`, outDir), svg(id, bg));
}
console.log("Wrote " + AVATARS.length + " avatars to public/avatars/");
