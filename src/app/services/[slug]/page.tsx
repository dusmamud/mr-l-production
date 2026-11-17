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
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | ${SITE.name}`,
      description: service.description,
      images: [{ url: service.image, width: 1200, height: 800, alt: service.title }],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  const related = PROJECTS.filter((p) => p.service === service.title);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <Eyebrow>Services — {service.title}</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">{service.title}</h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">{service.description}</p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal>
          <SmartImage
            src={service.image}
            alt={service.title}
            width={1920}
            height={1280}
            sizes="100vw"
            className="aspect-[16/9] w-full rounded-[24px] object-cover"
          />
        </Reveal>
        <div className="grid gap-10 pt-10 lg:grid-cols-3">
          <Reveal>
            <h2 className="font-display text-2xl font-black tracking-tight">What you get</h2>
            <ul className="space-y-3 pt-5">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 rounded-2xl bg-cream-2 px-4 py-3 text-sm font-semibold ring-1 ring-line">
                  <Check className="h-4 w-4 shrink-0 text-flame" aria-hidden="true" /> {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-2">
            <h2 className="font-display text-2xl font-black tracking-tight">How we work</h2>
            <p className="pt-4 leading-relaxed text-ink-2">
              Every engagement starts with Discover — a workshop where we pin down the audience, the goal and the one metric that matters. Then we Create in the open, showing work early so there are no surprises. Finally we Deliver with files, guidelines and support, so the work keeps working after launch.
            </p>
            <p className="pt-4 leading-relaxed text-ink-2">
              Typical timeline: 3–6 weeks for a focused {service.title.toLowerCase()} engagement, depending on scope. You will always know what happens next, what it costs, and who is doing it.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3.5 text-sm font-bold text-white"
            >
              Start a {service.title} project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        {related.length > 0 && (
          <div className="pt-14">
            <Reveal>
              <h2 className="font-display text-2xl font-black tracking-tight">Related work</h2>
            </Reveal>
            <div className="grid gap-5 pt-6 sm:grid-cols-2">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  <Link href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-[24px] ring-1 ring-line">
                    <SmartImage src={p.image} alt={p.title} width={1200} height={800} loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="bg-cream-2 p-5">
                      <p className="font-display text-lg font-extrabold">{p.title}</p>
                      <p className="pt-1 text-sm text-ink-2">{p.summary}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
      <CtaBanner />
    </>
  );
}
