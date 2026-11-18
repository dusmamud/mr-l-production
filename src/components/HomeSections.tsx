"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Clapperboard, Fingerprint, Globe, Pause, Play, X } from "lucide-react";
import { PROCESS, PROJECTS, SERVICES } from "@/data/site";
import { Eyebrow, MagneticButton, MaskedHeadline, ParallaxImage, Reveal, TiltCard } from "./Reveal";
import { SmartImage } from "./SmartImage";

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
  const [reelOpen, setReelOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Showreel lightbox: focus the close button on open, close on Escape,
     and lock body scroll while it is open. */
  useEffect(() => {
    if (!reelOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setReelOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [reelOpen]);

  return (
    <>
    <section className="relative overflow-hidden" aria-label="Intro">
      {/* No flame blur blob: the wide portrait already carries vivid orange
          trails, and a blob behind it would wash out the cutout. */}
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pt-8 pb-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-6 lg:px-8 lg:pt-12 lg:pb-20">
        <div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Eyebrow>Creative Studio</Eyebrow>
            <MaskedHeadline
              as="h1"
              className="pt-5 font-display text-[clamp(4rem,11vw,10.5rem)] leading-[0.95] font-black tracking-tight"
              lines={["MAKE", "IDEAS", <span key="m" className="text-flame-dark">MOVE.</span>]}
            />
            <p className="max-w-md pt-5 text-base leading-relaxed text-ink-2 sm:text-lg">
              A creative studio turning bold ideas into powerful digital experiences.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-8">
              <MagneticButton>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full bg-flame-dark px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-flame/25 transition-transform hover:scale-[1.03] active:scale-95"
                >
                  Explore Our Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </MagneticButton>
              <button
                type="button"
                onClick={() => setReelOpen(true)}
                className="group inline-flex items-center gap-3 text-sm font-bold"
                aria-label="Watch reel"
                aria-haspopup="dialog"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 bg-cream-2 transition-all group-hover:border-flame group-hover:bg-flame-dark group-hover:text-white">
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                </span>
                Watch Reel
              </button>
            </div>
          </motion.div>
        </div>
        <div className="relative">
          {/* Wide landscape cutout, bleeding to the right viewport edge on
              desktop: the wrapper grows past the max-w-7xl container by
              exactly the container-to-edge distance. On mobile it stacks
              full width with no bleed. */}
          <ParallaxImage
            bleed
            className="lg:w-[calc(100%+((100vw-80rem)/2+2rem))] lg:max-w-none"
          >
            <div className="animate-float">
              {/* Transparent PNG cutout — the portrait floats on the cream page
                  like the design, instead of sitting in a dark JPG rectangle. */}
              <SmartImage
                src="/images/hero-wide.png"
                alt="Creative portrait — a man looking up, surrounded by flowing orange light trails"
                width={651}
                height={621}
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="h-auto w-full drop-shadow-[0_24px_32px_rgba(22,19,15,0.18)]"
              />
            </div>
          </ParallaxImage>
          {/* Bottom-left of the image, clear of the face (top-left). */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-cream/90 px-4 py-2.5 text-xs font-bold shadow-lg backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-flame-dark" aria-hidden="true" />
            50+ projects shipped
          </div>
        </div>
      </div>
      {/* Design's vertical indicator on the far right edge: 01 / 03, a thin
          line, and a down-arrow that smooth-scrolls to About. Desktop only;
          absolute inside the overflow-hidden section, so no overflow. */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        }}
        className="absolute top-1/2 right-4 hidden -translate-y-1/2 flex-col items-center gap-2 text-ink lg:flex"
        aria-label="Scroll down to About the studio"
      >
        <span className="text-xs font-bold tracking-widest">01</span>
        <span className="text-[10px] font-bold text-ink/50">03</span>
        <span className="h-16 w-px bg-ink/30" aria-hidden="true" />
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
    {reelOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
        onClick={() => setReelOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Showreel"
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setReelOpen(false)}
            aria-label="Close showreel"
            className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-flame-dark hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <video
            src="/videos/showreel.mp4"
            loop
            autoPlay={!reduce}
            muted
            playsInline
            controls
            preload="metadata"
            className="aspect-video w-full rounded-[24px] bg-ink object-cover shadow-2xl"
          />
        </div>
      </div>
    )}
    </>
  );
}

export function Marquee() {
  const [paused, setPaused] = useState(false);
  const items = ["Branding", "Web Design", "Motion Graphics", "Video Production", "Digital Experience", "Creative Strategy"];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-cream-2 py-4">
      <div
        className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animationPlayState: paused ? "paused" : "running" }}
        aria-hidden="true"
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-lg font-extrabold tracking-tight text-ink/80">
            {item} <Asterisk className="h-5 w-5 text-flame-dark" />
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play marquee" : "Pause marquee"}
        aria-pressed={paused}
        className="absolute top-1/2 right-3 z-10 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-ink shadow-md ring-1 ring-line transition-colors hover:text-flame-dark sm:right-6"
      >
        {paused ? <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5 fill-current" aria-hidden="true" />}
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}

export function AboutTeaser() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-label="About the studio">
      {/* Design mark: large orange asterisk-burst bleeding off the right edge.
          Clipped by the section's own overflow-hidden, so it can never cause
          horizontal overflow. */}
      <div className="pointer-events-none absolute -top-2 -right-8 sm:-right-4 lg:-right-2" aria-hidden="true">
        <Asterisk className="animate-spin-slow h-24 w-24 text-flame-dark sm:h-32 sm:w-32" />
      </div>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <SmartImage
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
              We are a creative agency that believes in the power of <span className="text-flame-dark">imagination.</span>
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
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-flame-dark hover:gap-3 transition-all">
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
        <div>
          <Eyebrow>Our Services</Eyebrow>
          <h2 className="pt-4 font-display text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl lg:text-[2.75rem]">
            From concept
            <br />
            to creation — <span className="text-flame-dark">we do it all.</span>
          </h2>
          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold transition-all hover:border-ink hover:bg-ink hover:text-cream"
          >
            View All Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
      {/* Relative wrapper: the swooping curve sits behind the grid. The
          grid carries bottom padding so the Motion sphere, which pokes
          below its card, never collides with the next section. */}
      <div className="relative pt-10">
        <svg
          className="pointer-events-none absolute top-2 left-0 hidden h-24 w-full text-ink/10 lg:block"
          viewBox="0 0 1200 96"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-20 64 C 220 -8, 480 104, 720 36 S 1120 72, 1220 16"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <div className="relative grid gap-5 pb-12 sm:grid-cols-2 lg:grid-cols-3 lg:pb-16">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            const isMotion = s.slug === "motion-graphics-video";
            return (
              <Reveal key={s.slug} delay={i * 0.08} className="h-full">
                {/* Plain stagger wrapper (not a motion element): framer sets
                    an inline transform on Reveal/TiltCard, which would
                    override a Tailwind translate on those elements. The
                    middle card is raised on lg only; no stagger on mobile. */}
                <div className={i === 1 ? "h-full lg:-translate-y-6" : "h-full"}>
                  {/* TiltCard is the overflow-visible outer wrapper; the
                      Link inside carries the rounded card background, so
                      the sphere can escape the card without breaking the
                      ring/shadow. */}
                  <TiltCard max={3} className="h-full">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col rounded-[24px] bg-cream-2 ring-1 ring-line transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
                    >
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream ring-1 ring-line">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-colors group-hover:bg-flame-dark">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="pt-4 font-display text-xl font-extrabold tracking-tight">{s.title}</h3>
                        <p className="pt-1 text-sm text-ink-2">{s.short}</p>
                      </div>
                      {isMotion ? (
                        /* Motion sphere OVERFLOW: SmartImage's contained
                           cutout rendering is a no-op here (no object-cover
                           class), so the sphere still pokes below the card
                           (24px on mobile, 48px on lg) with a drop-shadow,
                           like the design. The wrapper's negative bottom
                           margin pulls the card's bottom edge up.
                           Overflow stays inside this card's column; the
                           grid's bottom padding absorbs it. */
                        <div className="relative mt-auto overflow-visible px-6 -mb-6 lg:-mb-12">
                          <SmartImage
                            src={s.image}
                            alt=""
                            width={634}
                            height={647}
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="h-auto w-full drop-shadow-[0_24px_24px_rgba(22,19,15,0.35)] transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      ) : (
                        /* JPGs stay flush to the card's bottom edge: the
                           wrapper clips to the card's rounded bottom
                           corners and the image fills it with object-cover. */
                        <div className="relative mt-auto overflow-hidden rounded-b-[24px]">
                          <SmartImage
                            src={s.image}
                            alt=""
                            width={1200}
                            height={800}
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                    </Link>
                  </TiltCard>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProjectsTeaser() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEnds = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= max - 2);
  };

  useEffect(() => {
    updateEnds();
    window.addEventListener("resize", updateEnds);
    return () => window.removeEventListener("resize", updateEnds);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-project-card]") as HTMLElement | null;
    // One card width + the flex gap (gap-5 = 20px) per click.
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-label="Selected projects">
      <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
        <Reveal>
          <div>
            <Eyebrow>Selected Projects</Eyebrow>
            <h2 className="pt-4 font-display text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Ideas
              <br />
              We&apos;ve Brought
              <br />
              <span className="text-flame-dark">to Life.</span>
            </h2>
            <div className="flex items-center gap-3 pt-6">
              <button
                type="button"
                onClick={() => scroll(-1)}
                disabled={atStart}
                aria-label="Scroll projects backwards"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-all hover:border-ink hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-flame disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink/20 disabled:hover:bg-transparent disabled:hover:text-ink"
              >
                <ArrowRight className="h-5 w-5 rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                disabled={atEnd}
                aria-label="Scroll projects forwards"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-all hover:border-ink hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-flame disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink/20 disabled:hover:bg-transparent disabled:hover:text-ink"
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <Link
              href="/portfolio"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-flame-dark transition-all hover:gap-3"
            >
              View all work <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <div
          ref={trackRef}
          onScroll={updateEnds}
          tabIndex={0}
          role="region"
          aria-label="Selected projects carousel — scroll to see all six projects"
          className="flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              data-project-card
              className="group block w-[78%] shrink-0 snap-start overflow-hidden rounded-[24px] ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10 sm:w-[46%] lg:w-[31.5%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <SmartImage
                  src={p.image}
                  alt=""
                  width={900}
                  height={1125}
                  loading="lazy"
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 pt-16 text-cream">
                  <p className="pr-12 font-display text-lg leading-tight font-extrabold">{p.title}</p>
                  <p className="pt-1 text-xs font-semibold text-cream/80">{p.category}</p>
                </div>
                <span className="absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink shadow-lg" aria-hidden="true">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24" aria-label="Our process">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="animate-float relative">
            {/* Design marks: small 4-point star sparkles near the process ring. */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="animate-spin-slow pointer-events-none absolute -top-1 right-10 h-6 w-6 text-flame-dark" aria-hidden="true">
              <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" />
            </svg>
            <svg viewBox="0 0 24 24" fill="currentColor" className="pointer-events-none absolute right-2 bottom-8 h-4 w-4 text-flame-dark" aria-hidden="true">
              <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" />
            </svg>
            <svg viewBox="0 0 24 24" fill="currentColor" className="pointer-events-none absolute top-1/2 left-1 h-5 w-5 text-flame-dark" aria-hidden="true">
              <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" />
            </svg>
            {/* Transparent PNG cutout — the ring floats on the cream page
                like the design, instead of a JPG box with its own background. */}
            <SmartImage
              src="/images/process-ring.png"
              alt="A black ring wrapped in orange light — our process, in one image"
              width={820}
              height={588}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full drop-shadow-xl"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow>Our Process</Eyebrow>
            <h2 className="pt-4 font-display text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl lg:text-[2.75rem]">
              A Simple Process.
              <br />
              A Big <span className="text-flame-dark">Impact.</span>
            </h2>
          </Reveal>
          <ol className="pt-8">
            {PROCESS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <li className="flex gap-5 border-b border-line py-5 first:pt-0 last:border-b-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 font-display text-sm font-black text-flame-dark">
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
