"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Building2, CalendarDays, Check, MapPin, Music2, Ticket, Wallet } from "lucide-react";
import { Boron } from "./Boron";
import stage from "../../public/images/festival-stage.jpg";
import singer from "../../public/images/live-singer.jpg";
import party from "../../public/images/party-crowd.jpg";
import { useMedia } from "@/lib/useMedia";
import { naira } from "@/lib/format";
import { useI18n } from "@/i18n/I18nProvider";

const chipIcons = [Music2, Building2, CalendarDays, Wallet, MapPin];
const eventImgs: StaticImageData[] = [stage, singer, party];
const prices = [12000, 9500, 15000];

type Stage = { typed: number; chipCount: number; cardCount: number; stepIdx: number };

function stageAt(prog: number, queryLen: number, chips: number, events: number): Stage {
  return {
    typed: Math.round(Math.min(1, prog / 0.26) * queryLen),
    chipCount: Math.floor(Math.max(0, Math.min(1, (prog - 0.28) / 0.2)) * (chips + 0.99)),
    cardCount: Math.floor(Math.max(0, Math.min(1, (prog - 0.5) / 0.32)) * (events + 0.99)),
    stepIdx: prog < 0.28 ? 0 : prog < 0.5 ? 1 : 2,
  };
}

function sameStage(a: Stage, b: Stage) {
  return a.typed === b.typed && a.chipCount === b.chipCount && a.cardCount === b.cardCount && a.stepIdx === b.stepIdx;
}

export function AskDemo() {
  const { t, locale } = useI18n();
  const a = t.ask;
  const ref = useRef<HTMLElement>(null);
  const desktop = useMedia("(min-width: 1024px)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const pinned = desktop && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const at = (p: number) => stageAt(p, a.query.length, a.chips.length, a.events.length);
  const [stage, setStage] = useState(() => at(1));

  // Re-render only when a visible step changes, not on every scroll frame.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!pinned) return;
    const next = at(v);
    setStage((s) => (sameStage(s, next) ? s : next));
  });

  const { typed, chipCount, cardCount, stepIdx } = pinned ? stage : at(1);

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="ask-title"
      className={`relative bg-paper ${pinned ? "h-[340vh]" : ""}`}
    >
      <div className={pinned ? "sticky top-0 flex h-screen items-center" : "py-20 sm:py-32"}>
        <div className="mx-auto grid w-full max-w-[78rem] gap-10 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex min-w-0 flex-col justify-center">
            <h2 id="ask-title" className="text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98] text-ink" data-reveal>
              {a.t1}
              <br />
              <span className="text-brand">{a.t2}</span>
            </h2>
            <ol className="mt-8 space-y-2 sm:mt-10">
              {a.steps.map((s, i) => {
                const active = !pinned || i === stepIdx;
                return (
                  <li
                    key={s.title}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                    className={`relative rounded-[20px] py-3.5 pl-11 pr-3 transition-[opacity,background-color] duration-700 ease-[var(--ease-out-expo)] sm:py-4 sm:pl-12 sm:pr-4 ${
                      pinned ? (active ? "bg-tint opacity-100" : "opacity-45") : ""
                    }`}
                  >
                    <span
                      className={`absolute left-3.5 top-[1.15rem] grid h-5 w-5 place-items-center rounded-full text-[0.7rem] font-bold transition-colors duration-500 sm:left-4 sm:top-[1.35rem] ${
                        active ? "bg-brand text-on-brand" : "bg-line text-mute"
                      }`}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <h3 className="text-[1.15rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 max-w-[30rem] text-[0.98rem] leading-relaxed text-mute sm:text-[1rem]">{s.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Demo stage */}
          <div className="relative min-w-0" data-reveal>
            <div className="rounded-[var(--radius-panel)] bg-night p-2.5 shadow-lift ring-1 ring-white/5 sm:p-4">
              <div className="flex items-start gap-3 rounded-[20px] bg-surface px-4 py-3.5 sm:items-center sm:px-5 sm:py-4">
                <Boron size={34} delay={-3} thinking={typed < a.query.length} className="-my-1" />
                <p className="min-h-[1.5em] text-[0.98rem] font-medium text-ink sm:text-[1.1rem]" aria-label={`${a.queryLabel}: ${a.query}`}>
                  <span aria-hidden>
                    {a.query.slice(0, typed)}
                    {typed < a.query.length && (
                      <span className="type-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] bg-brand" />
                    )}
                  </span>
                </p>
              </div>

              <ul className="flex flex-wrap gap-1.5 px-1 pb-1 pt-3 sm:gap-2" aria-label={a.filtersLabel}>
                {a.chips.map((label, i) => {
                  const Icon = chipIcons[i] ?? MapPin;
                  const on = i < chipCount;
                  return (
                    <li
                      key={label}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.8rem] font-medium transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] sm:px-3 sm:text-[0.85rem] ${
                        on
                          ? "translate-y-0 border-white/15 bg-white/10 text-white opacity-100"
                          : "translate-y-1 border-white/10 text-white/0 opacity-40"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 text-brand" aria-hidden />
                      {label}
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-2 space-y-2">
                {a.events.map((e, i) => {
                  const on = i < cardCount;
                  return (
                    <li
                      key={e.title}
                      className={`grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 rounded-[18px] bg-surface p-2.5 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:gap-4 sm:pr-4 ${
                        on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-[0.07]"
                      }`}
                    >
                      <div className="relative h-16 overflow-hidden rounded-[12px] sm:h-[5rem]">
                        <Image src={eventImgs[i]} alt={e.alt} fill sizes="96px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[0.98rem] font-bold tracking-[-0.01em] text-ink sm:text-[1.02rem]">{e.title}</p>
                        <p className="truncate text-[0.82rem] text-mute sm:text-[0.85rem]">
                          {e.where} · {e.when}
                        </p>
                        <p className="mt-1 flex items-start gap-1.5 text-[0.8rem] font-medium text-brand-ink sm:text-[0.82rem]">
                          <Check className="mt-[0.15em] h-3.5 w-3.5 shrink-0" aria-hidden />
                          <span className="line-clamp-2 sm:line-clamp-1">
                            {a.why}: {e.why}
                          </span>
                        </p>
                      </div>
                      <div className="col-span-2 flex items-center justify-between border-t border-line pt-2 sm:col-span-1 sm:block sm:border-0 sm:pt-0 sm:text-right">
                        <p className="tabular text-[1.02rem] font-bold text-ink">{naira(locale, prices[i])}</p>
                        <p className="inline-flex items-center gap-1 text-[0.75rem] text-mute">
                          <Ticket className="h-3 w-3" aria-hidden /> {a.seats}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="px-2 pb-1 pt-3 text-[0.78rem] text-mute-on-ink">{a.sample}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
