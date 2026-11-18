import type { Metadata } from "next";
import { SmartImage } from "@/components/SmartImage";
import { SITE, TEAM } from "@/data/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the small, senior team behind Mr. L Production — design, motion, strategy and production, in one room.",
};

export default function TeamPage() {
  const teamJsonLd = {
    "@context": "https://schema.org",
    "@graph": TEAM.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      description: m.bio,
      image: `${SITE.url}${m.portrait}`,
      worksFor: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }} />
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Team</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            Small team, <span className="text-flame-dark">senior hands.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            You work directly with the people making the work. No hand-offs to juniors, no chain of account managers — just the four of us, in the room with you.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.08}>
              <article className="h-full overflow-hidden rounded-[24px] bg-cream-2 ring-1 ring-line">
                <SmartImage
                  src={m.portrait}
                  alt={`Portrait of ${m.name} — ${m.descriptor}`}
                  width={800}
                  height={1000}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="font-display text-xl font-extrabold tracking-tight">{m.name}</h2>
                  <p className="pt-1 text-sm font-bold text-flame-dark">{m.role}</p>
                  <p className="pt-2 text-sm leading-relaxed text-ink-2">{m.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
