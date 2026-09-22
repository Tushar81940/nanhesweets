/**
 * Removes the cream/white background from the Nanhe logo PNG
 * and saves a transparent version.
 *
 * Strategy: flood-fill from all 4 corners (which are background pixels),
 * then make those pixels transparent using sharp's raw pixel manipulation.
 */

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const SRC  = "public/images/logo.png";
const DEST = "public/images/logo.png";   // overwrite in-place
const DEST_BACKUP = "public/images/logo-original.png";

// ── 1. Back up the original ───────────────────────────────
const original = readFileSync(SRC);
writeFileSync(DEST_BACKUP, original);
console.log("✅  Backed up original → public/images/logo-original.png");

// ── 2. Get raw RGBA pixels ────────────────────────────────
const { data, info } = await sharp(SRC)
  .ensureAlpha()          // add alpha channel (set to 255 everywhere first)
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;   // channels = 4 (RGBA)
const pixels = new Uint8Array(data);

// ── 3. Flood-fill from corners to find background ─────────
// Tolerance: how close a pixel's RGB must be to the seed colour to be removed
const TOLERANCE = 30;

function idx(x, y) { return (y * width + x) * channels; }

function colorMatch(i, r, g, b) {
  return (
    Math.abs(pixels[i]     - r) <= TOLERANCE &&
    Math.abs(pixels[i + 1] - g) <= TOLERANCE &&
    Math.abs(pixels[i + 2] - b) <= TOLERANCE
  );
}

function floodFill(startX, startY) {
  const si   = idx(startX, startY);
  const seedR = pixels[si];
  const seedG = pixels[si + 1];
  const seedB = pixels[si + 2];

  const visited = new Uint8Array(width * height);
  const stack   = [[startX, startY]];

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    const flat = y * width + x;
    if (visited[flat]) continue;
    visited[flat] = 1;

    const i = flat * channels;
    if (!colorMatch(i, seedR, seedG, seedB)) continue;

    // Make transparent
    pixels[i + 3] = 0;

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
}

// Flood-fill from all 4 corners
floodFill(0, 0);
floodFill(width - 1, 0);
floodFill(0, height - 1);
floodFill(width - 1, height - 1);

// Also flood-fill from edge midpoints to catch any remaining border pixels
floodFill(Math.floor(width / 2), 0);
floodFill(Math.floor(width / 2), height - 1);
floodFill(0, Math.floor(height / 2));
floodFill(width - 1, Math.floor(height / 2));

console.log("✅  Background pixels made transparent");

// ── 4. Save result as PNG with alpha ─────────────────────
await sharp(Buffer.from(pixels), {
  raw: { width, height, channels },
})
  .png({ compressionLevel: 9 })
  .toFile(DEST);

console.log(`✅  Saved transparent logo → ${DEST}`);

// ── 5. Regenerate favicons from the transparent logo ──────
const sizes = [
  { file: "public/favicon.png",          size: 64  },
  { file: "public/favicon-32.png",       size: 32  },
  { file: "public/favicon-16.png",       size: 16  },
  { file: "public/apple-touch-icon.png", size: 180 },
  { file: "public/favicon-192.png",      size: 192 },
];

for (const { file, size } of sizes) {
  await sharp(DEST)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log(`✅  ${file} (${size}×${size})`);
}

console.log("\n🎉  Done! Logo now has transparent background.");
