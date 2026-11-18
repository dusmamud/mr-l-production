import type { Metadata } from "next";
import { SmartImage } from "@/components/SmartImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POSTS, SITE } from "@/data/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the studio — branding, web design, motion and process, written by the people doing the work.",
};

export default function BlogPage() {
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: POSTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/blog/${p.slug}`,
      name: p.title,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Blog</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            Notes from the <span className="text-flame-dark">studio.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            What we are learning, building and unlearning — on branding, web, motion and the process in between.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-cream-2 ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    src={post.image}
                    alt=""
                    width={1200}
                    height={800}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold tracking-wide text-flame-dark uppercase">
                    {post.category} • {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <h2 className="pt-3 font-display text-xl leading-snug font-extrabold tracking-tight">{post.title}</h2>
                  <p className="flex-1 pt-2 text-sm leading-relaxed text-ink-2">{post.excerpt}</p>
                  <p className="inline-flex items-center gap-2 pt-4 text-sm font-bold text-ink">
                    Read article <ArrowRight className="h-4 w-4 text-flame-dark transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
