"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import festival from "../../public/images/festival-stage.jpg";
import { useI18n } from "@/i18n/I18nProvider";

export function PhotoBreak() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0, 0.4], [8, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [36, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} aria-labelledby="break-title" className="on-ink relative bg-paper">
      {/* The night background shows while the photo decodes, so the frame never looks blank. */}
      <motion.div
        style={reduce ? undefined : { clipPath }}
        className="relative h-[70svh] min-h-[26rem] overflow-hidden bg-night sm:h-[80svh] sm:min-h-[32rem]"
      >
        <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
          <Image
            src={festival}
            alt={t.breakSec.imgAlt}
            fill
            sizes="100vw"
            placeholder="blur"
            loading="eager"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-night/10" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[78rem] px-5 pb-10 sm:px-8 sm:pb-16">
          <h2
            id="break-title"
            className="max-w-[48rem] text-[clamp(2rem,7vw,4.4rem)] font-extrabold leading-[1] text-white"
          >
            {t.breakSec.l1}
            <br />
            {t.breakSec.l2}
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
