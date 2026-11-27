"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { CircleDollarSign, Armchair, ReceiptText, LifeBuoy } from "lucide-react";

const statement = "AI picks, ranks and explains. Your ticket records decide what’s true.";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

const facts = [
  {
    icon: CircleDollarSign,
    title: "Prices",
    body: "Shown exactly as the organizer set them. The assistant can’t round, discount or invent one.",
  },
  {
    icon: Armchair,
    title: "Seats and dates",
    body: "Availability is read live before an event appears. Sold out means it doesn’t show up.",
  },
  {
    icon: ReceiptText,
    title: "Refunds and ticket status",
    body: "Explained from the event’s own policy and your real order. Approving a refund stays with people.",
  },
  {
    icon: LifeBuoy,
    title: "Always a way through",
    body: "If AI is slow or offline, regular search, checkout and your tickets keep working as normal.",
  },
];

export function TrustPromise() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");

  return (
    <section aria-labelledby="promise-title" className="on-ink relative overflow-hidden bg-ink py-28 text-white sm:py-40">
      <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8">
        <div ref={ref}>
          <h2
            id="promise-title"
            className="max-w-[60rem] text-[clamp(2.2rem,5.6vw,4.6rem)] font-extrabold leading-[1.02]"
            aria-label={statement}
          >
            <span aria-hidden>
              {words.map((w, i) => (
                <Word
                  key={i}
                  word={w}
                  progress={scrollYProgress}
                  range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
                />
              ))}
            </span>
          </h2>
          <p className="mt-8 max-w-[38rem] text-[1.1rem] leading-relaxed text-mute-on-ink" data-reveal>
            That’s the rule Lykpass is built on. The assistant helps you find and understand events. It never gets the
            final word on money, seats or your ticket.
          </p>
        </div>

        <dl className="mt-20 grid gap-x-10 gap-y-12 border-t border-white/12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.title} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
              <dt className="flex items-center gap-3 text-[1.15rem] font-bold tracking-[-0.01em]">
                <f.icon className="h-5 w-5 text-brand" aria-hidden />
                {f.title}
              </dt>
              <dd className="mt-3 text-[0.98rem] leading-relaxed text-mute-on-ink">{f.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
