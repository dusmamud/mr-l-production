import { CLIENTS } from "@/data/site";
import { Reveal } from "./Reveal";

// Home section — not wired into page.tsx yet; the coordinator wires it in.
export function ClientStrip() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Trusted by">
      <Reveal>
        <p className="text-center text-[11px] font-bold tracking-[0.28em] text-ink-3 uppercase">Trusted by</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-6">
          {CLIENTS.map((c) => (
            <li key={c} className="font-display text-lg font-black tracking-tight text-ink-2/70 transition-colors hover:text-ink sm:text-xl">
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
