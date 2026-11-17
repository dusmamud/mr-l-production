import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/data/site";
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
            From concept to creation — <span className="text-flame">we do it all.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            Three disciplines, one team, one standard. Pick a service — or bring us the whole problem and let us assemble the right mix.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-16 sm:px-6 lg:px-8">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <article className="grid overflow-hidden rounded-[24px] bg-cream-2 ring-1 ring-line md:grid-cols-2">
              <div className="relative min-h-[240px]">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <p className="text-xs font-bold tracking-[0.2em] text-flame uppercase">0{i + 1} — Service</p>
                <h2 className="pt-3 font-display text-2xl font-black tracking-tight sm:text-3xl">{s.title}</h2>
                <p className="pt-3 leading-relaxed text-ink-2">{s.description}</p>
                <ul className="grid gap-2 pt-5 sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm font-semibold">
                      <Check className="h-4 w-4 shrink-0 text-flame" aria-hidden="true" /> {d}
                    </li>
                  ))}
                </ul>
                <div className="pt-6">
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-flame"
                  >
                    Explore {s.title} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <CtaBanner />
    </>
  );
}
