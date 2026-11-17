"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Shared motion helpers for the Mr. L Production motion system.
 *
 * EASE — the studio's standard ease-out curve, used by every primitive so
 * reveals, wipes and hovers all feel like one system.
 *
 * useFinePointer / useDesktopMotion — gate hover-driven motion (magnetic
 * buttons, tilt cards, custom cursor) to desktop-class pointers. They start
 * `false` and flip after mount, so server-rendered HTML never differs from
 * the first client render.
 */

/** Studio ease: fast start, long soft landing. Matches the existing Reveal. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** True only on desktop-class pointers (mouse / trackpad), after mount. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/**
 * True when hover-driven motion is appropriate: a fine pointer AND motion
 * allowed (i.e. prefers-reduced-motion is off). Hover primitives render
 * their static fallback whenever this is false.
 */
export function useDesktopMotion() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  return fine && !reduce;
}
