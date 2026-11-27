"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import heroImg from "../../public/images/crowd-golden.jpg";
import { WaitlistForm } from "./WaitlistForm";
import { TypedQuery } from "./TypedQuery";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="on-ink relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white"
    >
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { scale: imgScale, y: imgY }}>
        <Image
          src={heroImg}
          alt="A festival crowd with hands raised in warm orange stage light"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,38,34,0.92)_0%,rgba(14,38,34,0.72)_38%,rgba(14,38,34,0.15)_75%),linear-gradient(0deg,rgba(14,38,34,0.85)_0%,rgba(14,38,34,0)_45%)]"
      />

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: fade }}
        className="mx-auto grid w-full max-w-[78rem] gap-10 px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:pb-20 xl:gap-16"
      >
        <div>
          <motion.h1
            id="hero-title"
            initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease }}
            className="text-[clamp(2.9rem,min(8.4vw,11.5vh),6rem)] font-extrabold leading-[0.92]"
          >
            Say what you
            <br /> feel like doing.
            <br />
            <span className="text-brand">Get a real ticket.</span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="mt-6 max-w-[33rem] text-[1.1rem] leading-relaxed text-white/85 sm:text-[1.2rem]"
          >
            Lykpass turns a plain sentence into events you can actually book. Every price, date and seat comes
            straight from live ticket records, never from a guess.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="mt-8"
          >
            <WaitlistForm tone="on-photo" />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.55, ease }}
          className="hidden lg:block"
          aria-hidden
        >
          <div className="ml-auto max-w-[25rem] rounded-[var(--radius-panel)] bg-white p-3 text-ink shadow-lift">
            <div className="flex items-center gap-3 rounded-[20px] bg-tint px-4 py-4">
              <Sparkles className="h-5 w-5 shrink-0 text-brand" />
              <TypedQuery
                lines={[
                  "rooftop jazz night under ₦15k this weekend",
                  "something chill on Sunday with parking",
                  "online comedy tonight under ₦5k",
                ]}
                className="text-[1.02rem] font-medium"
              />
            </div>
            <div className="flex items-center justify-between px-3 pb-1 pt-3 text-sm text-mute">
              <span>3 events match</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Prices checked live
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
