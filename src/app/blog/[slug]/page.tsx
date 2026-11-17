import type { Metadata } from "next";
import { SmartImage } from "@/components/SmartImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS, SITE } from "@/data/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 800, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const others = POSTS.filter((p) => p.slug !== slug).slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    image: `${SITE.url}${post.image}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto w-full max-w-3xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <Reveal>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-ink-2 hover:text-flame">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All articles
          </Link>
          <div className="pt-6">
            <Eyebrow>{post.category}</Eyebrow>
            <h1 className="pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="pt-4 text-sm font-semibold text-ink-3">
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} • {post.readTime} • {SITE.name}
            </p>
          </div>
          <SmartImage
            src={post.image}
            alt={post.title}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 768px"
            className="mt-8 aspect-[16/10] w-full rounded-[24px] object-cover"
          />
          <div className="space-y-5 pt-8 text-base leading-relaxed text-ink-2 sm:text-lg">
            <p className="text-xl leading-relaxed font-medium text-ink">{post.excerpt}</p>
            {post.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </Reveal>
        <div className="pt-14">
          <h2 className="font-display text-2xl font-black tracking-tight">Keep reading</h2>
          <div className="grid gap-5 pt-6 sm:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-[24px] ring-1 ring-line">
                <SmartImage src={p.image} alt={p.title} width={800} height={500} loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="flex items-center justify-between gap-3 bg-cream-2 p-5">
                  <p className="font-display text-base leading-snug font-extrabold">{p.title}</p>
                  <ArrowRight className="h-4 w-4 shrink-0 text-flame" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <CtaBanner />
    </>
  );
}
