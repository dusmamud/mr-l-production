import type { Metadata } from "next";
import { SmartImage } from "@/components/SmartImage";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ENGAGEMENT_MODELS, SERVICES } from "@/data/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "Branding & identity, web design & development, motion graphics & video — everything a bold brand needs, under one roof.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Our Services</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            From concept to creation — <span className="text-flame-dark">we do it all.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            Three disciplines, one team, one standard. Pick a service — or bring us the whole problem and let us assemble the right mix.
          </p>
        </Reveal>
      </section>
      {/* Flipped panels: text first, image below, flush to the panel's
          bottom edge. The Motion sphere pokes 24px below its panel (same
          overflow treatment as the home card); the section's vertical
          gaps (space-y-10) and bottom padding absorb it. */}
      <section className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-16 sm:px-6 lg:px-8">
        {SERVICES.map((s, i) => {
          const isMotion = s.slug === "motion-graphics-video";
          return (
            <Reveal key={s.slug} delay={i * 0.05}>
              <article className="rounded-[24px] bg-cream-2 ring-1 ring-line">
                <div className="p-6 sm:p-10">
                  <p className="text-xs font-bold tracking-[0.2em] text-flame-dark uppercase">0{i + 1} — Service</p>
                  <h2 className="pt-3 font-display text-2xl font-black tracking-tight sm:text-3xl">{s.title}</h2>
                  <p className="max-w-3xl pt-3 leading-relaxed text-ink-2">{s.description}</p>
                  {s.priceFrom && (
                    <p className="pt-5 text-sm font-semibold text-ink-2">
                      Starting from{" "}
                      <span className="font-display text-lg font-extrabold text-ink">
                        {s.priceFrom.replace(/^from\s+/i, "")}
                      </span>
                      {s.priceNote && <span className="block pt-1 text-sm font-normal text-ink-2">{s.priceNote}</span>}
                    </p>
                  )}
                  <ul className="grid max-w-3xl gap-2 pt-5 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm font-semibold">
                        <Check className="h-4 w-4 shrink-0 text-flame-dark" aria-hidden="true" /> {d}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6">
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-flame-dark"
                    >
                      Explore {s.title} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                {isMotion ? (
                  /* Motion sphere OVERFLOW, same as the home card: SmartImage's
                     contained cutout rendering is a no-op here (no object-cover
                     class), so the sphere stays centred with a drop-shadow and
                     a negative bottom margin, poking below the panel edge. */
                  <div className="relative overflow-visible px-6 -mb-6">
                    <SmartImage
                      src={s.image}
                      alt=""
                      width={634}
                      height={647}
                      loading="lazy"
                      sizes="(max-width: 768px) 80vw, 480px"
                      className="mx-auto h-auto w-full max-w-sm drop-shadow-[0_24px_24px_rgba(22,19,15,0.35)] sm:max-w-md"
                    />
                  </div>
                ) : (
                  /* JPGs stay flush to the panel's bottom edge: the wrapper
                     clips to the panel's rounded bottom corners. */
                  <div className="relative overflow-hidden rounded-b-[24px]">
                    <SmartImage
                      src={s.image}
                      alt=""
                      width={1600}
                      height={900}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Ways to work with us">
        <Reveal>
          <Eyebrow>Ways To Work With Us</Eyebrow>
          <h2 className="max-w-2xl pt-4 font-display text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl">
            Pick the engagement that <span className="text-flame-dark">fits the work.</span>
          </h2>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2">
            One project, an ongoing retainer, or a dedicated team for a season — the work stays senior either way.
          </p>
        </Reveal>
        <div className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-[24px] bg-cream-2 p-6 ring-1 ring-line sm:p-8">
                <p className="text-xs font-bold tracking-[0.2em] text-flame-dark uppercase">0{i + 1}</p>
                <h3 className="pt-3 font-display text-xl font-extrabold tracking-tight sm:text-2xl">{m.title}</h3>
                <p className="pt-3 text-sm leading-relaxed text-ink-2 sm:text-base">{m.description}</p>
                <p className="mt-auto pt-5 text-sm font-bold">{m.bestFor}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
