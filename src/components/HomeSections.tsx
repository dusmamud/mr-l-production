"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Asterisk, Clapperboard, Fingerprint, Globe, Play } from "lucide-react";
import { PROCESS, PROJECTS, SERVICES } from "@/data/site";
import { Eyebrow, Reveal } from "./Reveal";

const SERVICE_ICONS = { fingerprint: Fingerprint, globe: Globe, clapperboard: Clapperboard } as const;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className="font-display text-3xl font-black tracking-tight sm:text-4xl">
      {val}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-label="Intro">
      <div className="pointer-events-none absolute top-0 right-0 h-[480px] w-[480px] rounded-full bg-flame/10 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pt-8 pb-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-6 lg:px-8 lg:pt-12 lg:pb-20">
        <div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow>Creative Studio</Eyebrow>
            <h1 className="pt-5 font-display text-[clamp(3rem,9vw,5.75rem)] leading-[0.95] font-black tracking-tight">
              MAKE
              <br />
              IDEAS
              <br />
              <span className="text-flame">MOVE.</span>
            </h1>
            <p className="max-w-md pt-5 text-base leading-relaxed text-ink-2 sm:text-lg">
              A creative studio turning bold ideas into powerful digital experiences.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-8">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-flame/25 transition-transform hover:scale-[1.03] active:scale-95"
              >
                Explore Our Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio/digital-experience-velocity"
                className="group inline-flex items-center gap-3 text-sm font-bold"
                aria-label="Watch reel — Velocity project"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 bg-cream-2 transition-all group-hover:border-flame group-hover:bg-flame group-hover:text-white">
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                </span>
                Watch Reel
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="animate-float">
            <Image
              src="/images/hero.jpg"
              alt="Creative portrait — a man looking up, surrounded by flowing orange light trails"
              width={1280}
              height={1920}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/5] w-full rounded-[28px] object-cover sm:aspect-[3/4] lg:aspect-[4/5]"
            />
          </div>
          <div className="absolute right-4 bottom-4 flex items-center gap-3 rounded-full bg-cream/90 px-4 py-2.5 text-xs font-bold shadow-lg backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-flame" aria-hidden="true" />
            50+ projects shipped
          </div>
          <div className="absolute top-4 left-4 hidden items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-xs font-bold text-cream backdrop-blur sm:flex" aria-hidden="true">
            01 <span className="text-cream/50">/ 03</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = ["Branding", "Web Design", "Motion Graphics", "Video Production", "Digital Experience", "Creative Strategy"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-cream-2 py-4" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-lg font-extrabold tracking-tight text-ink/80">
            {item} <Asterisk className="h-5 w-5 text-flame" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function AboutTeaser() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-label="About the studio">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <Image
              src="/images/about.jpg"
              alt="A lone figure walking toward a huge orange sun — the studio's belief in imagination"
              width={1920}
              height={1280}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[3/2] w-full rounded-[24px] object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-ink/85 px-4 py-2 text-xs font-bold text-cream backdrop-blur">
              About Studio
            </span>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow>About Mr. L Production</Eyebrow>
            <h2 className="pt-4 font-display text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl lg:text-[2.75rem]">
              We are a creative agency that believes in the power of <span className="text-flame">imagination.</span>
            </h2>
            <p className="pt-4 max-w-xl text-base leading-relaxed text-ink-2">
              We craft stunning visuals, build meaningful brands, and create digital experiences that inspire, engage, and make an impact.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-3 gap-4 pt-8">
              {[
                { to: 50, suffix: "+", label: "Projects Completed" },
                { to: 30, suffix: "+", label: "Happy Clients" },
                { to: 100, suffix: "%", label: "Creative Focus" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-line pl-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <Counter to={s.to} suffix={s.suffix} />
                    <p className="pt-1 text-xs leading-snug font-semibold text-ink-3 sm:text-sm">{s.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-flame hover:gap-3 transition-all">
              More about us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ServicesTeaser() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12" aria-label="Services">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="pt-4 font-display text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl lg:text-[2.75rem]">
              From concept
              <br />
              to creation — <span className="text-flame">we do it all.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold transition-all hover:border-ink hover:bg-ink hover:text-cream"
          >
            View All Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = SERVICE_ICONS[s.icon];
          return (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/services/${s.slug}`}
                className="group block overflow-hidden rounded-[24px] bg-cream-2 ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={1200}
                    height={800}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-ink backdrop-blur">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-display text-xl font-extrabold tracking-tight">{s.title}</h3>
                    <p className="pt-1 text-sm text-ink-2">{s.short}</p>
                  </div>
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-colors group-hover:bg-flame">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function ProjectsTeaser() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-label="Selected projects">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected Projects</Eyebrow>
            <h2 className="pt-4 font-display text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Ideas
              <br />
              We&apos;ve Brought <span className="text-flame">to Life.</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold transition-all hover:border-ink hover:bg-ink hover:text-cream"
          >
            View All Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.slice(0, 3).map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link
              href={`/portfolio/${p.slug}`}
              className="group block overflow-hidden rounded-[24px] ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={1200}
                  height={800}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 pt-16 text-cream">
                  <p className="font-display text-lg leading-tight font-extrabold">{p.title}</p>
                  <p className="pt-1 text-xs font-semibold text-cream/80">{p.category}</p>
                </div>
                <span className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24" aria-label="Our process">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="animate-float">
            <Image
              src="/images/process-ring.jpg"
              alt="A black ring wrapped in orange light — our process, in one image"
              width={1920}
              height={1280}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[3/2] w-full rounded-[24px] object-cover"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow>Our Process</Eyebrow>
            <h2 className="pt-4 font-display text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl lg:text-[2.75rem]">
              A Simple Process.
              <br />
              A Big <span className="text-flame">Impact.</span>
            </h2>
          </Reveal>
          <ol className="pt-8">
            {PROCESS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <li className="flex gap-5 border-b border-line py-5 first:pt-0 last:border-b-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 font-display text-sm font-black text-flame">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold tracking-tight">{step.title}</h3>
                    <p className="pt-1 text-sm leading-relaxed text-ink-2">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
