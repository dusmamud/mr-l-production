import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PROJECTS, SITE } from "@/data/site";
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

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-ink-2 hover:text-flame">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
          </Link>
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
          <Image src={project.image} alt={project.title} width={1920} height={1280} sizes="100vw" className="aspect-[16/9] w-full rounded-[24px] object-cover" />
        </Reveal>
        <div className="grid gap-10 pt-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-black tracking-tight">What we did</h2>
            <p className="pt-4 leading-relaxed text-ink-2">
              {project.summary} The work was shaped in our three-step process — Discover, Create, Deliver — with the client in the room at every review, so the final result never arrived as a surprise.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl font-black tracking-tight">Results</h2>
            <ul className="space-y-3 pt-5">
              {project.results.map((r) => (
                <li key={r} className="flex items-center gap-3 rounded-2xl bg-cream-2 px-4 py-3 text-sm font-semibold ring-1 ring-line">
                  <Check className="h-4 w-4 shrink-0 text-flame" aria-hidden="true" /> {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="pt-14">
          <Reveal>
            <h2 className="font-display text-2xl font-black tracking-tight">More work</h2>
          </Reveal>
          <div className="grid gap-5 pt-6 sm:grid-cols-2">
            {others.map((p) => (
              <Reveal key={p.slug}>
                <Link href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-[24px] ring-1 ring-line">
                  <Image src={p.image} alt={p.title} width={1200} height={800} loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="flex items-center justify-between bg-cream-2 p-5">
                    <p className="font-display text-lg font-extrabold">{p.title}</p>
                    <ArrowRight className="h-4 w-4 shrink-0 text-flame" aria-hidden="true" />
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
