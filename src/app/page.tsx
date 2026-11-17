import type { Metadata } from "next";
import { AboutTeaser, Hero, Marquee, ProcessSection, ProjectsTeaser, ServicesTeaser } from "@/components/HomeSections";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Mr. L Production — Make Ideas Move | Creative Studio",
  description:
    "A creative studio turning bold ideas into powerful digital experiences — branding, web design and motion graphics.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutTeaser />
      <ServicesTeaser />
      <ProjectsTeaser />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
