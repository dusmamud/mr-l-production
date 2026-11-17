import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/site";
import { Eyebrow, Reveal } from "./Reveal";

// Home section — not wired into page.tsx yet; the coordinator wires it in.
export function Testimonials() {
  const shown = TESTIMONIALS.slice(0, 3);
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="What clients say">
      <Reveal>
        <Eyebrow>Testimonials</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-4 pt-4">
          <h2 className="max-w-xl font-display text-3xl font-black tracking-tight sm:text-4xl">
            Clients who would <span className="text-flame">work with us again.</span>
          </h2>
          <Link href="/testimonials" className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-flame">
            All testimonials <ArrowRight className="h-4 w-4 text-flame" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-5 pt-10 md:grid-cols-3">
        {shown.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-[24px] bg-cream-2 p-6 ring-1 ring-line">
              <Quote className="h-6 w-6 text-flame" aria-hidden="true" />
              <blockquote className="flex-1 pt-4 text-sm leading-relaxed text-ink-2 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="pt-5">
                <p className="font-display text-base font-extrabold">{t.name}</p>
                <p className="pt-0.5 text-sm text-ink-3">
                  {t.role}, {t.company}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
