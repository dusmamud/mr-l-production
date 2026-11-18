import type { ImgHTMLAttributes } from "react";
import variants from "./image-variants.json";

/**
 * Responsive photo / transparent-cutout rendering, in one place.
 *
 * With `output: "export"` + `images.unoptimized`, Next.js serves every
 * image at full byte weight on every viewport, so the responsive variants
 * are pre-generated at build time by `scripts/gen-images.mjs` (AVIF +
 * WebP at 480/800/1200w, capped at the native width) and served here
 * through <picture> + srcset. The original file stays the <img> fallback.
 *
 * JPG photos render with object-cover (the caller's className, unchanged).
 * Transparent PNG cutouts (hero-style assets with the background removed)
 * render with object-contain on cream with padding, so the whole subject
 * stays visible instead of being cropped flat at the edges — e.g. the
 * Motion Graphics sphere on /services, whose bottom tip object-cover
 * cut off.
 *
 * `priority` marks the page's single LCP image: eager + fetchpriority
 * high, plus a <link rel="preload"> (React hoists it to <head>).
 * Exactly one image per page should use it.
 */
type SmartImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "sizes" | "width" | "height"
> & {
  src: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
};

const VARIANT_WIDTHS = variants as Record<string, number[]>;

export function SmartImage({
  src,
  width,
  height,
  alt = "",
  className = "",
  priority = false,
  sizes,
  loading,
  fetchPriority,
  ...rest
}: SmartImageProps) {
  const cutout = src.endsWith(".png");
  const cls = cutout
    ? className.replace("object-cover", "bg-cream-2 object-contain p-4")
    : className;
  const widths = VARIANT_WIDTHS[src];
  const sizesAttr = sizes ?? "(max-width: 768px) 100vw, 800px";

  if (!widths) {
    // No pre-generated variants (e.g. the share card) — plain <img>.
    return (
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={cls}
        loading={priority ? "eager" : (loading ?? "lazy")}
        fetchPriority={priority ? "high" : fetchPriority}
        {...rest}
      />
    );
  }

  // Variant filenames keep the source extension (process-ring.jpg and
  // process-ring.png are different images): <stem>-<w><ext>.<fmt>.
  const file = src.replace(/^\/images\//, "");
  const stem = file.replace(/\.[^.]+$/, "");
  const ext = file.slice(stem.length);
  const srcSet = (fmt: string) =>
    widths.map((w) => `/images/opt/${stem}-${w}${ext}.${fmt} ${w}w`).join(", ");
  const avifSrcSet = srcSet("avif");
  const webpSrcSet = srcSet("webp");

  const img = (
    <img
      src={src}
      srcSet={webpSrcSet}
      sizes={sizesAttr}
      width={width}
      height={height}
      alt={alt}
      className={cls}
      loading={priority ? "eager" : (loading ?? "lazy")}
      fetchPriority={priority ? "high" : fetchPriority}
      {...rest}
    />
  );

  return (
    <>
      {priority && (
        <link
          rel="preload"
          as="image"
          imageSrcSet={avifSrcSet}
          imageSizes={sizesAttr}
          fetchPriority="high"
        />
      )}
      <picture style={{ display: "contents" }}>
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizesAttr} />
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizesAttr} />
        {img}
      </picture>
    </>
  );
}
