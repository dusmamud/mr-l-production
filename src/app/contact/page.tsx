import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Mr. L Production — tell us about your idea and we will reply within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Get In Touch</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            Let&apos;s create something <span className="text-flame">extraordinary.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            Have a project in mind? Tell us about it — we reply to every serious enquiry within one working day.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-2">
            <div className="space-y-4">
              {[
                { Icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                { Icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
                { Icon: MapPin, label: "Studio", value: SITE.location, href: undefined },
                { Icon: Clock, label: "Hours", value: "Mon–Sat, 10:00 – 19:00 IST", href: undefined },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-[20px] bg-cream-2 p-5 ring-1 ring-line">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-flame/10 text-flame">
                    <c.Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-wide text-ink-3 uppercase">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="pt-1 block font-display text-base font-extrabold hover:text-flame">{c.value}</a>
                    ) : (
                      <p className="pt-1 font-display text-base font-extrabold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="pt-14">
          <Reveal>
            <h2 className="font-display text-2xl font-black tracking-tight sm:text-3xl">Before you write — quick answers.</h2>
          </Reveal>
          <div className="pt-6">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
