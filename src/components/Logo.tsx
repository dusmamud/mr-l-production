import Link from "next/link";

// The mark is the design's bold ML ligature, rebuilt as pure SVG paths
// (zero <text>): a heavy geometric M whose second diagonal is flame orange,
// sharing its right stem with the L. The old mark was a thin hand-drawn
// outline — it did not match the design's bold filled monogram.
export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 48" fill="none" className={className} role="img" aria-label="Mr. L Production logo">
      <defs>
        <linearGradient id="ml-flame" x1="27" y1="42" x2="44" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff3d00" />
          <stop offset="1" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
      <g strokeWidth="9.5" strokeLinecap="butt" strokeLinejoin="miter" transform="skewX(-3)">
        {/* M: second diagonal (flame) — drawn first so the ink strokes cover its ends */}
        <path d="M27 42 L44 8" stroke="url(#ml-flame)" />
        {/* M: left stem + first diagonal (ink) */}
        <path d="M10 42 V8 L27 42" stroke="#16130f" />
        {/* L: right stem + foot (ink) */}
        <path d="M44 8 V42 H62" stroke="#16130f" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Mr. L Production — home">
      <LogoMark />
      <span className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
        Mr. L Production
      </span>
    </Link>
  );
}
