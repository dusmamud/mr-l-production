"use client";

import { useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/site";

const FILTERS = ["All", "Branding", "Web Design", "Motion Graphics"];

export function PortfolioGrid() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  return (
    <>
      <div className="flex flex-wrap gap-2 pt-8" role="group" aria-label="Filter projects by category">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              filter === f ? "bg-ink text-cream" : "bg-cream-2 text-ink-2 ring-1 ring-line hover:ring-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <motion.div key={p.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-[24px] ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10">
              <div className="relative aspect-[4/5] overflow-hidden">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  width={900}
                  height={1125}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 pt-16 text-cream">
                  <p className="pr-12 font-display text-lg leading-tight font-extrabold">{p.title}</p>
                  <p className="pt-1 text-xs font-semibold text-cream/80">{p.category} • {p.year}</p>
                </div>
                <span className="absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink shadow-lg" aria-hidden="true">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <p className="pt-6 text-sm text-ink-3" aria-live="polite">
        Showing {shown.length} of {PROJECTS.length} projects.
      </p>
    </>
  );
}
