import Link from "next/link";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} role="img" aria-label="Mr. L Production logo">
      <path d="M6 40V8l12 16L30 8v32" stroke="#16130f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 8l12 16V8" stroke="#ff5a00" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="40" r="3" fill="#ff5a00" />
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
