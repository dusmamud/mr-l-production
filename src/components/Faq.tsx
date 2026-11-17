"use client";

import { useState } from "react";
import { FAQS } from "@/data/site";

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
