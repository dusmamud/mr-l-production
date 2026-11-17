import Image, { type ImageProps } from "next/image";

/**
 * Photo vs transparent-cutout rendering, in one place.
 *
 * JPG photos render with object-cover (the caller's className, unchanged).
 * Transparent PNG cutouts (hero-style assets with the background removed)
 * render with object-contain on cream with padding, so the whole subject
 * stays visible instead of being cropped flat at the edges — e.g. the
 * Motion Graphics sphere on /services, whose bottom tip object-cover
 * cut off.
 */
export function SmartImage({ src, className = "", ...props }: ImageProps) {
  const cutout = typeof src === "string" && src.endsWith(".png");
  const cls = cutout
    ? className.replace("object-cover", "bg-cream-2 object-contain p-4")
    : className;
  return <Image src={src} className={cls} {...props} />;
}
