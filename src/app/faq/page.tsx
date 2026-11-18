import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/data/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about working with Mr. L Production — cost, timelines, revisions, ownership and how to start.",
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            Questions, <span className="text-flame-dark">answered honestly.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            Cost, timelines, revisions, ownership — the things every client asks before the first call.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="divide-y divide-line rounded-[24px] bg-cream-2 ring-1 ring-line">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span className="font-display text-base font-extrabold tracking-tight sm:text-lg">{f.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-3 text-lg font-black transition-all group-open:rotate-45 group-open:bg-flame-dark group-open:text-white" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pt-3 pr-10 text-sm leading-relaxed text-ink-2 sm:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="pt-10 text-center text-base text-ink-2">
            Still curious?{" "}
            <Link href="/contact" className="font-bold text-flame-dark hover:underline">
              Ask us anything
            </Link>{" "}
            — we reply within one working day.
          </p>
        </Reveal>
      </section>
      <CtaBanner />
    </>
  );
}
