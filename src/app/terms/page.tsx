import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using the Mr. L Production website and working with the studio — quotes, payment, ownership and liability, in plain language.",
};

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: "Using this website",
    body: [
      "You may browse this site freely. You may not copy, reproduce or redistribute its content, images or code without our written permission, except for short quotations with credit.",
      "The portfolio and blog are shown to illustrate our work. Project results shown are from the projects described; they are not a promise that your project will achieve the same numbers.",
    ],
  },
  {
    h: "Quotes and scope",
    body: [
      "Every project starts with a Discover call, after which we give a fixed written quote describing the scope, the price and the dates. Work outside that scope is quoted separately before it starts.",
      "Prices shown on this site are starting prices only. Your fixed quote is the price that applies.",
    ],
  },
  {
    h: "Payment",
    body: [
      "Unless agreed otherwise in writing, we ask for 50% to start and 50% on delivery. Work is delivered in full on final payment.",
      "If a project is cancelled after work has started, work completed up to that point is billed at the quoted rates.",
    ],
  },
  {
    h: "Revisions",
    body: [
      "Two structured revision rounds are included per phase. Further rounds are possible and are quoted in advance. We ask for consolidated feedback from one decision-maker so the work can move forward.",
    ],
  },
  {
    h: "Ownership",
    body: [
      "On final payment, the finished work — files, source assets and guidelines — is yours, with a licence to use it wherever your brand goes.",
      "We keep the right to show the work in our portfolio and to talk about it, unless you ask us in writing before the project starts not to.",
    ],
  },
  {
    h: "What we are not liable for",
    body: [
      "We build to the scope agreed in the quote. We are not liable for losses arising from content you supply, from changes made to the work after delivery, or from third-party services (hosting, platforms, app stores) outside our control.",
      "Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    h: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The version on this page is the one that applies. These terms were last updated on 17 November 2026.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14">
      <Reveal>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
          Terms of <span className="text-flame">Service.</span>
        </h1>
        <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
          Plain-language terms for using this site and working with the studio. If anything here is unclear, ask us before you agree to it.
        </p>
      </Reveal>
      <div className="space-y-10 pt-12">
        {SECTIONS.map((s) => (
          <Reveal key={s.h}>
            <h2 className="font-display text-2xl font-black tracking-tight">{s.h}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 24)} className="pt-3 leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="pt-12 text-sm text-ink-3">
          Questions about these terms? Write to{" "}
          <a href={`mailto:${SITE.email}`} className="font-bold text-flame-dark hover:underline">
            {SITE.email}
          </a>{" "}
          or see our{" "}
          <Link href="/privacy" className="font-bold text-flame-dark hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </Reveal>
    </section>
  );
}
