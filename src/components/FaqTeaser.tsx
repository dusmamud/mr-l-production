import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQS } from "@/data/site";
import { Eyebrow, Reveal } from "./Reveal";

// Home section — not wired into page.tsx yet; the coordinator wires it in.
export function FaqTeaser() {
  const shown = FAQS.slice(0, 3);
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Frequently asked questions">
      <Reveal>
        <Eyebrow>FAQ</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-4 pt-4">
          <h2 className="max-w-xl font-display text-3xl font-black tracking-tight sm:text-4xl">
            Asked <span className="text-flame">often.</span>
          </h2>
          <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-flame">
            All questions <ArrowRight className="h-4 w-4 text-flame" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-5 pt-10 lg:grid-cols-3">
        {shown.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.08}>
            <div className="h-full rounded-[24px] bg-cream-2 p-6 ring-1 ring-line">
              <h3 className="font-display text-lg font-extrabold tracking-tight">{f.q}</h3>
              <p className="pt-2 text-sm leading-relaxed text-ink-2">{f.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
