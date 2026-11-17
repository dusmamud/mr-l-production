import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mr. L Production handles your information — what we collect, why, and how to ask us to delete it.",
};

const SECTIONS: { h: string; body: string[] }[] = [
  {
    h: "What we collect",
    body: [
      "When you contact us through the form on this site, you share your name, email address and the details of your project. That is the only personal information we ask for.",
      "We do not run accounts, comments or checkouts on this site, and we do not sell, rent or trade your information.",
    ],
  },
  {
    h: "How we use it",
    body: [
      "We use your contact details only to reply to your enquiry, prepare a quote, and deliver the work you ask for. We do not add you to a mailing list unless you separately ask to join one.",
      "If you email us directly, the same applies — your message is used to answer you, and nothing else.",
    ],
  },
  {
    h: "What we store, and for how long",
    body: [
      "Enquiries are kept only as long as needed to handle them and to keep a record of work agreed. When a project ends and there is no reason to keep the correspondence, we delete it on request.",
      "This website itself stores nothing about you in a database. The contact form confirms your brief on screen and does not send it to a server; to reach us, use the email link on the contact page.",
    ],
  },
  {
    h: "Cookies and analytics",
    body: [
      "We do not currently run analytics or advertising trackers on this site. If that changes, this page will be updated first, and the change will be described here in plain language.",
    ],
  },
  {
    h: "Your rights",
    body: [
      "You can ask us at any time what we hold about you, ask us to correct it, or ask us to delete it. Write to us at the email below and we will act on it promptly.",
    ],
  },
  {
    h: "Contact",
    body: [
      `For any privacy question, write to ${SITE.email}. This policy was last updated on 17 November 2026.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-14">
      <Reveal>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
          Privacy <span className="text-flame">Policy.</span>
        </h1>
        <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
          Short version: we only use what you send us to answer you — and we do not sell it, share it, or keep it longer than needed.
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
          Questions? Write to{" "}
          <a href={`mailto:${SITE.email}`} className="font-bold text-flame-dark hover:underline">
            {SITE.email}
          </a>{" "}
          or see our{" "}
          <Link href="/terms" className="font-bold text-flame-dark hover:underline">
            Terms
          </Link>
          .
        </p>
      </Reveal>
    </section>
  );
}
