"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Boron } from "./Boron";
import heroImg from "../../public/images/crowd-golden.jpg";
import { WaitlistForm } from "./WaitlistForm";
import { TypedQuery } from "./TypedQuery";
import { useI18n } from "@/i18n/I18nProvider";
import { useMedia } from "@/lib/useMedia";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMedia("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const fade = useTransform(scrollYProgress, [0.2, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="on-ink relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night text-white"
    >
      <motion.div
        className="absolute inset-0 -z-10 will-change-transform"
        style={reduce ? undefined : { scale: imgScale, y: imgY }}
      >
        <Image
          src={heroImg}
          alt={t.hero.imgAlt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,17,15,0.92)_0%,rgba(8,17,15,0.7)_40%,rgba(8,17,15,0.15)_78%),linear-gradient(0deg,rgba(8,17,15,0.9)_0%,rgba(8,17,15,0)_50%)]"
      />

      {/* Copy only drifts and fades on desktop; on phones it stays put so the hero never looks empty. */}
      <motion.div
        style={reduce || !desktop ? undefined : { y: copyY, opacity: fade }}
        className="mx-auto grid w-full max-w-[78rem] gap-10 px-5 pb-10 pt-28 sm:px-8 sm:pb-16 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:pb-20 xl:gap-16"
      >
        <div className="min-w-0">
          <h1
            id="hero-title"
            className="hero-rise text-[clamp(1.9rem,min(10.2vw,11.5vh),6rem)] font-extrabold leading-[0.98] sm:leading-[0.92]"
          >
            {t.hero.l1}
            <br /> {t.hero.l2}
            <br />
            <span className="text-brand">{t.hero.l3}</span>
          </h1>
          <p
            style={{ animationDelay: "0.18s" }}
            className="hero-rise mt-5 max-w-[33rem] text-[1.05rem] leading-relaxed text-white/85 sm:mt-6 sm:text-[1.2rem]"
          >
            {t.hero.sub}
          </p>
          <div style={{ animationDelay: "0.32s" }} className="hero-rise mt-7 sm:mt-8">
            <WaitlistForm />
          </div>
        </div>

        <div style={{ animationDelay: "0.5s" }} className="hero-rise hidden lg:block" aria-hidden>
          <div className="ml-auto max-w-[25rem] rounded-[var(--radius-panel)] bg-surface p-3 text-ink shadow-lift">
            <div className="flex items-center gap-3 rounded-[20px] bg-tint px-4 py-4">
              <Boron size={34} thinking />
              <TypedQuery lines={t.hero.queries} className="text-[1.02rem] font-medium" />
            </div>
            <div className="flex items-center justify-between px-3 pb-1 pt-3 text-sm text-mute">
              <span>{t.hero.matches}</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                <span className="h-2 w-2 rounded-full bg-brand" />
                {t.hero.checked}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
