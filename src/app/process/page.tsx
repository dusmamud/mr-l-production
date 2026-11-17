import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENGAGEMENT_MODELS, PROCESS_TIMELINE, SERVICES } from "@/data/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Process",
  description: "Our process, week by week — Discover, Define, Create, Refine, Deliver and Support. What happens, when, and what we need from you.",
};

export default function ProcessPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Our Process</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            A simple process. <span className="text-flame">A big impact.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            Six steps, seven weeks, no surprises. Here is exactly what happens at each stage — and what we need from you to keep it moving.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ol className="relative space-y-10 border-l-2 border-line pl-8 sm:pl-12">
          {PROCESS_TIMELINE.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 0.04}>
                <span className="absolute top-0 -left-8 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-flame font-display text-sm font-black text-white sm:-left-12" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs font-bold tracking-[0.2em] text-flame uppercase">{s.weeks}</p>
                <h2 className="pt-2 font-display text-2xl font-black tracking-tight sm:text-3xl">{s.title}</h2>
                <p className="max-w-3xl pt-3 leading-relaxed text-ink-2">{s.happens}</p>
                <p className="max-w-3xl pt-3 text-sm leading-relaxed">
                  <span className="font-bold">What we need from you: </span>
                  <span className="text-ink-2">{s.needsFromClient}</span>
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Ways to work with us">
        <Reveal>
          <Eyebrow>Ways to work with us</Eyebrow>
          <h2 className="pt-4 font-display text-3xl font-black tracking-tight sm:text-4xl">Three ways in. One standard of work.</h2>
        </Reveal>
        <div className="grid gap-5 pt-10 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="h-full rounded-[24px] bg-cream-2 p-6 ring-1 ring-line">
                <h3 className="font-display text-xl font-extrabold tracking-tight">{m.title}</h3>
                <p className="pt-3 text-sm leading-relaxed text-ink-2">{m.description}</p>
                <p className="pt-4 text-sm font-bold text-flame-dark">{m.bestFor}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 rounded-[24px] bg-ink p-6 text-cream sm:p-8">
            <h3 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">Starting prices</h3>
            <ul className="space-y-4 pt-5">
              {SERVICES.map((s) => (
                <li key={s.slug} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-cream/10 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold">{s.title}</p>
                    {s.priceNote && <p className="pt-1 text-sm text-cream/70">{s.priceNote}</p>}
                  </div>
                  <p className="font-display text-lg font-black text-flame-dark">{s.priceFrom}</p>
                </li>
              ))}
            </ul>
            <p className="pt-5 text-sm text-cream/70">
              Every project gets a fixed quote after a short Discover call — no hourly surprises.{" "}
              <Link href="/contact" className="inline-flex items-center gap-1 font-bold text-flame-dark hover:underline">
                Get your quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </Reveal>
      </section>
      <CtaBanner />
    </>
  );
}
