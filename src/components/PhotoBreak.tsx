"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import festival from "../../public/images/festival-stage.jpg";

export function PhotoBreak() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0, 0.45], [14, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [40, 0]);
  const clip = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} aria-labelledby="break-title" className="on-ink relative bg-paper">
      <motion.div
        style={reduce ? undefined : { clipPath: clip }}
        className="relative h-[80svh] min-h-[32rem] overflow-hidden bg-ink"
      >
        <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
          <Image
            src={festival}
            alt="A packed outdoor festival crowd facing a lit stage at night"
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[78rem] px-5 pb-12 sm:px-8 sm:pb-16">
          <h2
            id="break-title"
            className="max-w-[48rem] text-[clamp(2rem,7vw,4.4rem)] font-extrabold leading-[1] text-white"
            data-reveal
          >
            Less scrolling for plans.
            <br />
            More nights worth talking about.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
