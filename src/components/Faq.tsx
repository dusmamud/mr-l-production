"use client";

import { useState } from "react";

const FAQS = [
  { q: "How much does a project cost?", a: "Focused engagements typically start at ₹50,000. After a short Discover call we give you a fixed quote — no hourly surprises." },
  { q: "How long does a project take?", a: "A focused branding, web or motion project usually takes 3–6 weeks. Larger, multi-service projects are scoped in phases with dates agreed up front." },
  { q: "Who will I work with?", a: "Directly with the senior people making the work. No hand-offs to juniors, no chain of account managers." },
  { q: "Do you work with startups?", a: "Yes — roughly half our work is with early-stage teams. If the idea is bold and the timeline is honest, we want to hear it." },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line rounded-[24px] bg-cream-2 ring-1 ring-line">
      {FAQS.map((f, i) => {
        const open = openIdx === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-base font-extrabold tracking-tight sm:text-lg">{f.q}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-black transition-all ${open ? "rotate-45 bg-flame text-white" : "bg-cream-3"}`} aria-hidden="true">+</span>
            </button>
            {open && <p className="px-6 pb-5 text-sm leading-relaxed text-ink-2 sm:text-base">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
