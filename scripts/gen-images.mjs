// Build-time image optimisation for the static export.
//
// With `output: "export"` + `images.unoptimized`, Next.js serves every
// image at full byte weight on every viewport — no resizing, no format
// conversion. So we pre-generate responsive AVIF/WebP variants here and
// SmartImage serves them through <picture> + srcset. Re-run after adding
// or replacing any image in public/images/:
//   node scripts/gen-images.mjs
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "public/images";
const OUT_DIR = path.join(SRC_DIR, "opt");
const WIDTHS = [480, 800, 1200];
// og.jpg is the share card (already 80K, must stay JPG) — skip it.
const SKIP = new Set(["og.jpg", "favicon.svg"]);

const sources = (await readdir(SRC_DIR)).filter(
  (f) => /\.(jpe?g|png)$/i.test(f) && !SKIP.has(f),
);

await mkdir(OUT_DIR, { recursive: true });

// Variant filenames keep the source extension
// (process-ring.jpg and process-ring.png are different images and must
// not overwrite each other's variants): <stem>-<w><ext>.<fmt>, e.g.
// process-ring-820.png.avif vs process-ring-1920.jpg.avif.
let totalOrig = 0;
let totalOpt = 0;
for (const file of sources) {
  const src = path.join(SRC_DIR, file);
  const stem = file.replace(/\.[^.]+$/, "");
  const ext = file.slice(stem.length); // ".jpg" or ".png"
  const img = sharp(src);
  const meta = await img.metadata();
  const nativeW = meta.width ?? 1200;
  const widths = WIDTHS.filter((w) => w < nativeW);
  if (nativeW > 480 && !widths.includes(nativeW)) widths.push(nativeW);
  totalOrig += (await stat(src)).size;
  for (const w of widths) {
    for (const [fmt, opts] of [
      ["avif", { quality: 50, effort: 4 }],
      ["webp", { quality: 75, effort: 4 }],
    ]) {
      const out = path.join(OUT_DIR, `${stem}-${w}${ext}.${fmt}`);
      await sharp(src).resize(w).toFormat(fmt, opts).toFile(out);
      totalOpt += (await stat(out)).size;
    }
  }
  console.log(`${file} (${nativeW}w) -> ${widths.join(", ")}w avif+webp`);
}
console.log(
  `originals ${(totalOrig / 1024).toFixed(0)} KiB -> variants ${(totalOpt / 1024).toFixed(0)} KiB total (browser downloads one variant per image)`,
);
