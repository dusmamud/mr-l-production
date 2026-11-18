"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Custom cursor: a small flame dot that tracks the pointer 1:1, plus a
 * trailing ring on a spring that grows over interactive elements and
 * shrinks while pressed.
 *
 * Safety rules, all deliberate:
 * - Desktop only: mounts only when `(pointer: fine)` matches, so touch
 *   devices never see it and never lose their native cursor.
 * - Disabled under prefers-reduced-motion: renders nothing.
 * - The native cursor is hidden (`cursor: none`) ONLY while this component
 *   is mounted and active, via the `custom-cursor-on` class on
 *   <html> (see globals.css). The class is removed on unmount, so the user
 *   is never left cursor-less.
 * - Rendered as fixed, pointer-events-none, aria-hidden overlays — it can
 *   never block a click or appear in the accessibility tree.
 * - Negative margins (not transforms) centre the dot/ring, so framer's
 *   transform never fights the centring.
 *
 * Add `data-cursor-hover` to any non-link/button element that should grow
 * the ring (e.g. a draggable card).
 */

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor-hover]";

export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Start off-screen so nothing flashes at the top-left corner.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(Boolean(t?.closest?.(HOVER_SELECTOR)));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("custom-cursor-on");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Flame dot — follows the pointer exactly. */}
      <motion.div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[100]" style={{ x, y }}>
        <div className="h-2 w-2 -mt-1 -ml-1 rounded-full bg-flame-dark" />
      </motion.div>
      {/* Trailing ring — lags on a spring, grows over interactive elements. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="h-9 w-9 -mt-[18px] -ml-[18px] rounded-full border-2 border-white mix-blend-difference"
          animate={{ scale: pressed ? 0.8 : hovering ? 1.7 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Soft breathing halo (CSS pulse; independent of the ring scale). */}
          <div className="animate-cursor-pulse h-full w-full rounded-full bg-flame/25" />
        </motion.div>
      </motion.div>
    </>
  );
}
