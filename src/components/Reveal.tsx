"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { EASE, useDesktopMotion } from "./Motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] text-ink-2 uppercase">
      <span className="h-[2px] w-8 bg-flame" aria-hidden="true" />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Masked line / headline reveal                                       */
/* ------------------------------------------------------------------ */

type MaskedLineProps = {
  children: ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  className?: string;
};

/**
 * One line of a headline, revealed from behind a mask: the inner span
 * slides up from y 110% with a slight rotate. The text itself is always
 * in the server-rendered HTML — framer only adds the transform on the
 * client — so there is never a blank headline on first paint. Under
 * prefers-reduced-motion the line renders normally, no animation.
 */
export function MaskedLine({ children, delay = 0, className }: MaskedLineProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <span className={className ? `block overflow-hidden ${className}` : "block overflow-hidden"}>
        <span className="block">{children}</span>
      </span>
    );
  }
  // whileInView lives on the OUTER mask (in normal flow, visible to the
  // IntersectionObserver) and the inner line animates via variant
  // propagation. Putting whileInView on the inner span deadlocks: it starts
  // translated 110% down, i.e. entirely outside its own overflow-hidden
  // mask, so the observer clips its intersection to zero and the reveal
  // never fires — the headline stays hidden forever.
  return (
    <motion.span
      className={className ? `block overflow-hidden ${className}` : "block overflow-hidden"}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.span
        className="block will-change-transform"
        style={{ transformOrigin: "0% 100%" }}
        variants={{
          hidden: { y: "110%", rotate: 3 },
          visible: { y: "0%", rotate: 0 },
        }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

type MaskedHeadlineProps = {
  /** One entry per visual line. Each renders as a masked block line. */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  /** Delay before the first line, in seconds. */
  delay?: number;
  /** Gap between lines, in seconds. */
  stagger?: number;
  className?: string;
};

/**
 * A multi-line masked headline. Lines rise one after another from behind
 * their masks. Reduced-motion renders the lines as plain text.
 */
export function MaskedHeadline({
  lines,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.09,
  className,
}: MaskedHeadlineProps) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <MaskedLine key={i} delay={delay + i * stagger}>
          {line}
        </MaskedLine>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* MagneticButton — hover pull toward the cursor (desktop only)        */
/* ------------------------------------------------------------------ */

type MagneticButtonProps = {
  children: ReactNode;
  /** Fraction of the cursor offset applied to the child (0–1). Default 0.35. */
  strength?: number;
  className?: string;
};

/**
 * Wraps any child (e.g. a next/link) and translates it slightly toward
 * the cursor on hover, springing back on leave. Desktop fine-pointer only;
 * on touch or reduced-motion it renders a plain inline-block wrapper with
 * no handlers, so the child behaves exactly as if unwrapped.
 */
export function MagneticButton({ children, strength = 0.35, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useDesktopMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const cls = className ? `inline-block ${className}` : "inline-block";
  if (!active) {
    return <div className={cls}>{children}</div>;
  }
  return (
    <motion.div
      ref={ref}
      className={cls}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard — subtle springy hover tilt (desktop only)                 */
/* ------------------------------------------------------------------ */

type TiltCardProps = {
  children: ReactNode;
  /** Max tilt in degrees. Default 4. */
  max?: number;
  className?: string;
};

/**
 * Subtle hover tilt for cards: rotateX/rotateY follow the pointer up to
 * `max` degrees, on springs. Disabled on touch / reduced-motion, where it
 * renders a plain div. Put it around the card itself, not around a link
 * that already has its own hover transform.
 */
export function TiltCard({ children, max = 4, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useDesktopMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 16 });
  const sry = useSpring(ry, { stiffness: 160, damping: 16 });

  if (!active) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ParallaxImage — scroll-linked parallax + scale-in                   */
/* ------------------------------------------------------------------ */

type ParallaxImageProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px across the full scroll pass. Default 40. */
  strength?: number;
  /**
   * When true, the inner content is pre-scaled ~1.12 so the parallax
   * travel never exposes edges — use for full-bleed images.
   */
  bleed?: boolean;
};

/**
 * Scroll-linked image wrapper: gentle y-parallax as the section travels
 * through the viewport, plus a scale-in from 0.96 → 1 as it enters.
 * Wrap a next/image (or SmartImage) with it. Reduced-motion renders a
 * static div — no scroll listener, no transform.
 */
export function ParallaxImage({ children, className, strength = 40, bleed = false }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // SSR-safe: the scroll-linked transform must only attach after mount.
  // useScroll can attach a native scroll-timeline in a microtask, which may
  // update the element's inline style mid-hydration and mismatch the
  // server HTML (React error #418). Rendering a static div for the first
  // client render keeps server and client output identical; the parallax
  // engages in an effect, after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.96, 1]);

  if (reduce || !mounted) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div ref={ref} className={className} style={{ y, scale }}>
      {bleed ? <div className="scale-[1.12]">{children}</div> : children}
    </motion.div>
  );
}
