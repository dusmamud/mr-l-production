import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Heart, Lightbulb, Target } from "lucide-react";
import { ProcessSection } from "@/components/HomeSections";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mr. L Production is a creative agency that believes in the power of imagination — branding, web and motion from one small, senior team.",
};

const VALUES = [
  { Icon: Lightbulb, title: "Imagination first", text: "Every project starts with a bold idea, not a template. If it does not excite us, it will not excite your audience." },
  { Icon: Target, title: "Results, not decoration", text: "Beautiful is the baseline. We measure success in bookings, sales, views and recall — not just compliments." },
  { Icon: Eye, title: "Craft in the details", text: "Type, spacing, light, timing. The small decisions are the ones people feel, even when they cannot name them." },
  { Icon: Heart, title: "Small team, senior hands", text: "You work directly with the people making the work. No hand-offs, no juniors learning on your budget." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>About Mr. L Production</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            A small studio with a big <span className="text-flame">imagination.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            We started Mr. L Production with one belief: bold ideas deserve craft to match. Today we are a compact team of designers, developers and filmmakers helping brands look, feel and move like they mean it.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Image
              src="/images/about.jpg"
              alt="A lone figure walking toward a huge orange sun"
              width={1920}
              height={1280}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[3/2] w-full rounded-[24px] object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-black tracking-tight">What we believe</h2>
            <p className="pt-4 leading-relaxed text-ink-2">
              Great work is not an accident. It comes from listening properly, choosing a clear idea, and then sweating every frame, pixel and word until the idea survives contact with the real world.
            </p>
            <p className="pt-4 leading-relaxed text-ink-2">
              We keep the studio small on purpose. Fewer projects, deeper involvement, and work we are proud to sign. When you hire Mr. L Production, you get the people in the room — not a chain of account managers.
            </p>
            <dl className="grid grid-cols-3 gap-4 pt-8">
              {[
                { v: "50+", l: "Projects Completed" },
                { v: "30+", l: "Happy Clients" },
                { v: "100%", l: "Creative Focus" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-line pl-4">
                  <dd className="font-display text-3xl font-black">{s.v}</dd>
                  <dt className="pt-1 text-xs font-semibold text-ink-3 sm:text-sm">{s.l}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Our values">
        <Reveal>
          <Eyebrow>What guides us</Eyebrow>
          <h2 className="pt-4 font-display text-3xl font-black tracking-tight sm:text-4xl">Four things we never compromise on.</h2>
        </Reveal>
        <div className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-[24px] bg-cream-2 p-6 ring-1 ring-line">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-flame/10 text-flame">
                  <v.Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="pt-4 font-display text-lg font-extrabold tracking-tight">{v.title}</h3>
                <p className="pt-2 text-sm leading-relaxed text-ink-2">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ProcessSection />
      <CtaBanner />
    </>
  );
}
