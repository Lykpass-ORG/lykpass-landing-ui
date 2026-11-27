"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Armchair, CircleDollarSign, LifeBuoy, ReceiptText } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const icons = [CircleDollarSign, Armchair, ReceiptText, LifeBuoy];

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

export function TrustPromise() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  // The statement lights up word by word while it crosses the middle of the screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = t.promise.statement.split(" ");

  return (
    <section aria-labelledby="promise-title" className="on-ink relative overflow-hidden bg-night py-20 text-white sm:py-28 lg:py-32">
      <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8">
        <div ref={ref}>
          <h2
            id="promise-title"
            className="max-w-[60rem] text-[clamp(2rem,7vw,4.6rem)] font-extrabold leading-[1.02]"
            aria-label={t.promise.statement}
          >
            <span aria-hidden>
              {words.map((w, i) => (
                <Word
                  key={`${w}-${i}`}
                  word={w}
                  progress={scrollYProgress}
                  range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
                />
              ))}
            </span>
          </h2>
          <p className="mt-6 max-w-[38rem] text-[1.05rem] leading-relaxed text-mute-on-ink sm:text-[1.1rem]" data-reveal>
            {t.promise.body}
          </p>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-10 border-t border-white/12 pt-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {t.promise.facts.map((f, i) => {
            const Icon = icons[i] ?? LifeBuoy;
            return (
              <div key={f.title} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
                <dt className="flex items-center gap-3 text-[1.12rem] font-bold tracking-[-0.01em]">
                  <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                  {f.title}
                </dt>
                <dd className="mt-3 text-[0.98rem] leading-relaxed text-mute-on-ink">{f.body}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
