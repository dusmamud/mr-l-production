import type { Metadata } from "next";
import { SmartImage } from "@/components/SmartImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PROJECTS, SERVICES, SITE } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${SITE.name}`,
      description: project.summary,
      images: [{ url: project.image, width: 1200, height: 800, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();
  const others = PROJECTS.filter((p) => p.slug !== slug).slice(0, 2);
  const moreWork = PROJECTS.filter((p) => p.slug !== slug && p.slug !== others[0]?.slug).slice(0, 2);
  const service = SERVICES.find((s) => s.title === project.service);
  const metrics = project.metrics ?? project.results;

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
              { label: project.title },
            ]}
          />
          <div className="pt-6">
            <Eyebrow>{project.category} — {project.year}</Eyebrow>
            <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">{project.summary}</p>
            <dl className="flex flex-wrap gap-x-10 gap-y-3 pt-6 text-sm">
              <div><dt className="font-bold text-ink-3">Client</dt><dd className="font-semibold">{project.client}</dd></div>
              <div><dt className="font-bold text-ink-3">Service</dt><dd className="font-semibold">{project.service}</dd></div>
              <div><dt className="font-bold text-ink-3">Year</dt><dd className="font-semibold">{project.year}</dd></div>
            </dl>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal>
          <SmartImage src={project.image} alt="" width={1920} height={1280} priority sizes="100vw" className="aspect-[16/9] w-full rounded-[24px] object-cover" />
        </Reveal>
        <div className="grid gap-10 pt-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-black tracking-tight">The challenge</h2>
            <p className="pt-4 leading-relaxed text-ink-2">
              {project.challenge ?? project.summary}
            </p>
            <h2 className="pt-8 font-display text-2xl font-black tracking-tight">Our approach</h2>
            <p className="pt-4 leading-relaxed text-ink-2">
              {project.approach ??
                "We shaped the work in our three-step process — Discover, Create, Deliver — with the client in the room at every review, so the final result never arrived as a surprise."}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl font-black tracking-tight">The solution</h2>
            <p className="pt-4 leading-relaxed text-ink-2">
              {project.solution ?? project.summary}
            </p>
            <h2 className="pt-8 font-display text-2xl font-black tracking-tight">Results</h2>
            <ul className="space-y-3 pt-5">
              {metrics.map((r) => (
                <li key={r} className="flex items-center gap-3 rounded-2xl bg-cream-2 px-4 py-3 text-sm font-semibold ring-1 ring-line">
                  <Check className="h-4 w-4 shrink-0 text-flame-dark" aria-hidden="true" /> {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        {project.quote && (
          <Reveal>
            <figure className="mt-14 rounded-[24px] bg-ink p-8 text-cream sm:p-10">
              <blockquote className="font-display text-2xl leading-snug font-extrabold tracking-tight sm:text-3xl">
                &ldquo;{project.quote.text}&rdquo;
              </blockquote>
              <figcaption className="pt-4 text-sm font-semibold text-cream/70">
                {project.quote.author} — {project.quote.role}
              </figcaption>
            </figure>
          </Reveal>
        )}
        {service && (
          <div className="pt-14">
            <Reveal>
              <h2 className="font-display text-2xl font-black tracking-tight">From the studio</h2>
              <p className="max-w-2xl pt-3 leading-relaxed text-ink-2">
                The {project.service} behind this project — the same craft, applied to your brief.
              </p>
            </Reveal>
            <div className="grid gap-5 pt-6 sm:grid-cols-2">
              <Reveal>
                <Link href={`/services/${service.slug}`} className="group block overflow-hidden rounded-[24px] ring-1 ring-line">
                  <SmartImage src={service.image} alt="" width={1200} height={800} loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="flex items-center justify-between bg-cream-2 p-5">
                    <p className="font-display text-lg font-extrabold">{service.title}</p>
                    <ArrowRight className="h-4 w-4 shrink-0 text-flame-dark" aria-hidden="true" />
                  </div>
                </Link>
              </Reveal>
              {others[0] && (
                <Reveal delay={0.08}>
                  <Link href={`/portfolio/${others[0].slug}`} className="group block overflow-hidden rounded-[24px] ring-1 ring-line">
                    <SmartImage src={others[0].image} alt="" width={1200} height={800} loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="flex items-center justify-between bg-cream-2 p-5">
                      <p className="font-display text-lg font-extrabold">{others[0].title}</p>
                      <ArrowRight className="h-4 w-4 shrink-0 text-flame-dark" aria-hidden="true" />
                    </div>
                  </Link>
                </Reveal>
              )}
            </div>
          </div>
        )}
        <div className="pt-14">
          <Reveal>
            <h2 className="font-display text-2xl font-black tracking-tight">More work</h2>
          </Reveal>
          <div className="grid gap-5 pt-6 sm:grid-cols-2">
            {moreWork.map((p) => (
              <Reveal key={p.slug}>
                <Link href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-[24px] ring-1 ring-line">
                  <SmartImage src={p.image} alt="" width={1200} height={800} loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="flex items-center justify-between bg-cream-2 p-5">
                    <p className="font-display text-lg font-extrabold">{p.title}</p>
                    <ArrowRight className="h-4 w-4 shrink-0 text-flame-dark" aria-hidden="true" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
