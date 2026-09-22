import sharp from "sharp";
import { existsSync } from "fs";
import { resolve } from "path";

const src = resolve("public/images/logo.png");

if (!existsSync(src)) {
  console.error("❌  public/images/logo.png not found");
  process.exit(1);
}

// favicon.png — 64×64, used as the browser tab icon
await sharp(src)
  .resize(64, 64, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("public/favicon.png");
console.log("✅  public/favicon.png  (64×64)");

// favicon-32.png
await sharp(src)
  .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("public/favicon-32.png");
console.log("✅  public/favicon-32.png (32×32)");

// favicon-16.png
await sharp(src)
  .resize(16, 16, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("public/favicon-16.png");
console.log("✅  public/favicon-16.png (16×16)");

// apple-touch-icon.png — 180×180
await sharp(src)
  .resize(180, 180, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("public/apple-touch-icon.png");
console.log("✅  public/apple-touch-icon.png (180×180)");

// favicon-192.png — for Android home screen
await sharp(src)
  .resize(192, 192, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("public/favicon-192.png");
console.log("✅  public/favicon-192.png (192×192)");

console.log("\n🎉  All favicon sizes generated from Nanhe logo.");
