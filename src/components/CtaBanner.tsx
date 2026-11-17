import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CtaBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Start a project">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-cream sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-flame/25 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-flame/15 blur-3xl" aria-hidden="true" />
          {/* Design mark: small orange 4-point star sparkle in the black CTA bar. */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="animate-spin-slow pointer-events-none absolute top-5 right-6 h-6 w-6 text-flame sm:right-10 sm:h-7 sm:w-7" aria-hidden="true">
            <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="pointer-events-none absolute bottom-5 left-6 hidden h-4 w-4 text-flame sm:block" aria-hidden="true">
            <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" />
          </svg>
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-3xl leading-[1.05] font-black tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Let&apos;s Create Something <span className="text-flame">Extraordinary</span> Together.
              </h2>
              <p className="pt-3 max-w-xl text-base text-cream/70">
                Have a project in mind? Let&apos;s turn your ideas into reality.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-flame px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
            >
              Get In Touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
