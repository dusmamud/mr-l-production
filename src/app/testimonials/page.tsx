import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { CLIENTS, TESTIMONIALS } from "@/data/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with Mr. L Production — branding, web design and motion, in their words.",
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Testimonials</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            In our clients&apos; <span className="text-flame">own words.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            We measure success in bookings, sales, views and recall — but the kindest measure is a client who would work with us again.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08}>
              <figure className="flex h-full flex-col rounded-[24px] bg-cream-2 p-6 ring-1 ring-line sm:p-8">
                <Quote className="h-7 w-7 text-flame" aria-hidden="true" />
                <blockquote className="flex-1 pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="pt-6">
                  <p className="font-display text-lg font-extrabold">{t.name}</p>
                  <p className="pt-0.5 text-sm text-ink-3">
                    {t.role}, {t.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="pt-12 text-center text-[11px] font-bold tracking-[0.28em] text-ink-3 uppercase">Trusted by</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-6">
            {CLIENTS.map((c) => (
              <li key={c} className="font-display text-lg font-black tracking-tight text-ink-2/70 sm:text-xl">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
      <CtaBanner />
    </>
  );
}
