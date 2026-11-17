import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected work from Mr. L Production — branding, web design and motion graphics that brought bold ideas to life.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-4 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Eyebrow>Selected Projects</Eyebrow>
          <h1 className="max-w-3xl pt-4 font-display text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl">
            Ideas we&apos;ve brought <span className="text-flame">to life.</span>
          </h1>
          <p className="max-w-2xl pt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            A selection of branding, web and motion work — each one measured by what it did, not just how it looked.
          </p>
        </Reveal>
        <PortfolioGrid />
      </section>
      <div className="pt-10">
        <CtaBanner />
      </div>
    </>
  );
}
