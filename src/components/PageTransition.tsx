"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { EASE } from "./Motion";

/**
 * Page transition wrapper for the root layout.
 *
 * On every client-side navigation (pathname change AFTER the initial load)
 * it plays a quick cream → flame wipe: a cream panel sweeps across, a
 * flame panel trails 60ms behind, total ≤ 500ms, while the new page fades
 * in underneath. On the initial load nothing plays — the overlay never
 * renders and the page starts at full opacity, so first paint is never
 * blocked. Under prefers-reduced-motion there is no wipe and no fade;
 * navigation is instant.
 *
 * Static-export safe: a plain client component, no server-only APIs, no
 * `new Date()` or any other value that differs between prerender and
 * hydration. Children are never remounted — only an opacity animation
 * runs on the wrapper — so page state and effects survive navigation.
 */

const WIPE_MS = 500;
const FLAME_DELAY_S = 0.06;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const firstRender = useRef(true);
  const [wiping, setWiping] = useState(false);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      // Initial load: no animation at all.
      firstRender.current = false;
      return;
    }
    if (reduce) return;
    setWiping(true);
    setFaded(true);
    const stopWipe = window.setTimeout(() => setWiping(false), WIPE_MS + 40);
    const stopFade = window.setTimeout(() => setFaded(false), 260);
    return () => {
      window.clearTimeout(stopWipe);
      window.clearTimeout(stopFade);
    };
  }, [pathname, reduce]);

  return (
    <>
      {wiping && (
        <>
          {/* Flame panel trails behind the cream panel. */}
          <motion.div
            key={`flame-${pathname}`}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] bg-flame"
            initial={{ x: "-102%" }}
            animate={{ x: ["-102%", "0%", "102%"] }}
            transition={{ duration: WIPE_MS / 1000, times: [0, 0.45, 1], delay: FLAME_DELAY_S, ease: "easeInOut" }}
          />
          <motion.div
            key={`cream-${pathname}`}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] bg-cream"
            initial={{ x: "-102%" }}
            animate={{ x: ["-102%", "0%", "102%"] }}
            transition={{ duration: WIPE_MS / 1000, times: [0, 0.45, 1], ease: "easeInOut" }}
          />
        </>
      )}
      <motion.div animate={{ opacity: faded ? 0 : 1 }} transition={{ duration: 0.35, ease: EASE }}>
        {children}
      </motion.div>
    </>
  );
}
