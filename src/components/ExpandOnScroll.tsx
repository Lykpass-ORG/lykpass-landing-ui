"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Section-to-section transition: the wrapped (dark) section enters as an inset,
 * rounded panel and opens out to full bleed as it scrolls into view.
 */
export function ExpandOnScroll({ children, under = "bg-paper" }: { children: React.ReactNode; under?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const inset = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [44, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0% ${i}% 0% ${i}% round ${r}px ${r}px 0 0)`);

  return (
    <div ref={ref} className={under}>
      <motion.div style={reduce ? undefined : { clipPath }} className="will-change-[clip-path]">
        {children}
      </motion.div>
    </div>
  );
}
