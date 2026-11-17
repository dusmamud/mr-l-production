"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { POSTS, PROJECTS } from "@/data/site";
import { SmartImage } from "@/components/SmartImage";
import { Eyebrow, Reveal } from "@/components/Reveal";

type Hit = {
  kind: "Project" | "Article";
  title: string;
  excerpt: string;
  href: string;
  image: string;
};

const ALL: Hit[] = [
  ...PROJECTS.map((p) => ({
    kind: "Project" as const,
    title: p.title,
    excerpt: p.summary,
    href: `/portfolio/${p.slug}`,
    image: p.image,
  })),
  ...POSTS.map((p) => ({
    kind: "Article" as const,
    title: p.title,
    excerpt: p.excerpt,
    href: `/blog/${p.slug}`,
    image: p.image,
  })),
];

export function SearchClient() {
  const [q, setQ] = useState("");
  const [ready, setReady] = useState(false);

  // Read ?q= only in the browser, after mount — never during prerender.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get("q") ?? "");
    setReady(true);
  }, []);

  const query = q.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!query) return ALL;
    return ALL.filter((h) => `${h.kind} ${h.title} ${h.excerpt}`.toLowerCase().includes(query));
  }, [query]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search";
    window.history.replaceState(null, "", url);
  }

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Search</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            Search the <span className="text-flame">studio.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            Projects and articles, in one place. Try &ldquo;branding&rdquo;, &ldquo;motion&rdquo; or &ldquo;Velocity&rdquo;.
          </p>
        </Reveal>
        <Reveal>
          <form onSubmit={onSubmit} role="search" className="mt-8 flex max-w-2xl items-center gap-3 rounded-full bg-cream-2 px-5 py-3 ring-1 ring-line focus-within:border-flame">
            <SearchIcon className="h-5 w-5 shrink-0 text-ink-3" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Search projects and articles
            </label>
            <input
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects and articles…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3 sm:text-base"
            />
            <button type="submit" className="shrink-0 rounded-full bg-flame px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95">
              Search
            </button>
          </form>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-live="polite">
        {!ready ? null : query === "" ? (
          <p className="text-base text-ink-2">
            Type above to search, or browse everything below — all {ALL.length} projects and articles.
          </p>
        ) : hits.length === 0 ? (
          <div className="rounded-[24px] bg-cream-2 p-8 text-center ring-1 ring-line sm:p-12">
            <p className="font-display text-2xl font-black tracking-tight">Nothing found for &ldquo;{q.trim()}&rdquo;.</p>
            <p className="mx-auto max-w-md pt-3 text-sm leading-relaxed text-ink-2 sm:text-base">
              Try a different word — &ldquo;branding&rdquo;, &ldquo;web&rdquo; or &ldquo;motion&rdquo; usually work — or tell us what you are looking for and we will point you to it.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95">
              Ask us directly <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <p className="text-base text-ink-2">
            {hits.length} result{hits.length === 1 ? "" : "s"} for &ldquo;{q.trim()}&rdquo;.
          </p>
        )}
        {hits.length > 0 && (
          <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {hits.map((h, i) => (
              <Reveal key={h.href} delay={(i % 3) * 0.08}>
                <Link href={h.href} className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-cream-2 ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10">
                  <div className="overflow-hidden">
                    <SmartImage
                      src={h.image}
                      alt={h.title}
                      width={1200}
                      height={800}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold tracking-wide text-flame-dark uppercase">{h.kind}</p>
                    <h2 className="pt-3 font-display text-xl leading-snug font-extrabold tracking-tight">{h.title}</h2>
                    <p className="flex-1 pt-2 text-sm leading-relaxed text-ink-2">{h.excerpt}</p>
                    <p className="inline-flex items-center gap-2 pt-4 text-sm font-bold text-ink">
                      View {h.kind === "Project" ? "project" : "article"} <ArrowRight className="h-4 w-4 text-flame transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
