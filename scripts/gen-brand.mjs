// Generates the raster brand assets (favicon.png, apple-touch-icon.png,
// og-image.png) from the SVG sources in /public. Run once whenever the mark or
// OG design changes:
//
//   npm i -D sharp            # first time only
//   node scripts/gen-brand.mjs
//
// (Run it in WSL — the repo's node_modules is the Linux install.)

import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = (f) => resolve(root, "public", f);

const favicon = readFileSync(pub("favicon.svg"));
const og = readFileSync(pub("og-image.svg"));

const jobs = [
  // Transparent PNG fallback for browsers that don't take SVG favicons.
  sharp(favicon, { density: 600 }).resize(256, 256).png().toFile(pub("favicon.png")),
  // iOS home-screen icon — flattened onto the dark ground (iOS ignores alpha).
  sharp(favicon, { density: 600 })
    .resize(180, 180)
    .flatten({ background: "#0A0C12" })
    .png()
    .toFile(pub("apple-touch-icon.png")),
  // Social share card.
  sharp(og, { density: 150 }).resize(1200, 630).png().toFile(pub("og-image.png")),
];

Promise.all(jobs)
  .then(() => console.log("✓ Brand assets written: favicon.png, apple-touch-icon.png, og-image.png"))
  .catch((err) => {
    console.error("Failed to generate brand assets:", err);
    process.exit(1);
  });
