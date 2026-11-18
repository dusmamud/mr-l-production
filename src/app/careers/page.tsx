import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/data/site";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Careers",
  description: "Work with Mr. L Production — we have no open roles right now, but we always want to hear from brilliant designers, developers and filmmakers.",
};

const WHAT_WE_LOOK_FOR = [
  { title: "Craft over volume", text: "A small portfolio of work you are proud of beats a long list of work you rushed." },
  { title: "Senior hands", text: "We hire people who can own a project end to end — from the first workshop to the final file." },
  { title: "Honest taste", text: "Tell us what you would change about our own site. We would rather hear a sharp opinion than a safe compliment." },
];

export default function CareersPage() {
  const subject = encodeURIComponent("Hello from a future colleague — Mr. L Production");
  const body = encodeURIComponent(
    "Hi Mr. L Production team,\n\nI would love to work with you. Here is a little about me:\n\n- What I do:\n- Work I am proud of (link):\n- Why Mr. L Production:\n\nThanks,\n",
  );
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Careers</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            No open roles <span className="text-flame-dark">right now.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            We are a small studio on purpose, and we hire slowly. There is nothing open today — but brilliant people are always worth a conversation, and we keep every good introduction on file.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {WHAT_WE_LOOK_FOR.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="h-full rounded-[24px] bg-cream-2 p-6 ring-1 ring-line">
                <h2 className="font-display text-lg font-extrabold tracking-tight">{w.title}</h2>
                <p className="pt-2 text-sm leading-relaxed text-ink-2">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 rounded-[24px] bg-ink p-6 text-cream sm:p-10">
            <h2 className="font-display text-2xl font-black tracking-tight sm:text-3xl">
              Think you belong <span className="text-flame-dark">here?</span>
            </h2>
            <p className="max-w-xl pt-3 leading-relaxed text-cream/70">
              Send us a note with what you do, a link to work you are proud of, and why this studio. We reply to every serious introduction — and if a role opens that fits, you will be the first to hear about it.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=${subject}&body=${body}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-flame-dark px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> Write to us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="pt-4 text-xs text-cream/50">Opens your mail app — we store nothing here.</p>
          </div>
        </Reveal>
      </section>
      <CtaBanner />
    </>
  );
}
