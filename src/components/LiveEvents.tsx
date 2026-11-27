"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeftRight, Link2, Play, ShieldCheck, Smartphone } from "lucide-react";
import singer from "../../public/images/live-singer.jpg";
import { useI18n } from "@/i18n/I18nProvider";

const order = ["scheduled", "soon", "live", "replay"] as const;
const pointIcons = [ShieldCheck, ArrowLeftRight, Smartphone, Link2];

export function LiveEvents() {
  const { t } = useI18n();
  const l = t.live;
  const [i, setI] = useState(2);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setI((v) => (v + 1) % order.length), 2600);
    return () => clearInterval(timer);
  }, []);

  const key = order[i];
  const [label, note] = l.statuses[key];
  const live = key === "live";
  const canJoin = key !== "scheduled";

  return (
    <section id="live" aria-labelledby="live-title" className="on-ink bg-night py-20 text-white sm:py-36">
      <div className="mx-auto grid max-w-[78rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <h2 id="live-title" className="text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98]" data-reveal>
            {l.t1}
            <br />
            <span className="text-brand">{l.t2}</span>
          </h2>
          <p className="mt-6 max-w-[32rem] text-[1.05rem] leading-relaxed text-mute-on-ink sm:text-[1.1rem]" data-reveal>
            {l.body}
          </p>
          <ul className="mt-9 space-y-5 sm:mt-10">
            {l.points.map((p, n) => {
              const Icon = pointIcons[n] ?? Link2;
              return (
                <li key={p} className="flex gap-4" data-reveal style={{ "--reveal-delay": `${n * 90}ms` } as React.CSSProperties}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 ring-1 ring-white/12">
                    <Icon className="h-[1.15rem] w-[1.15rem] text-brand" aria-hidden />
                  </span>
                  <p className="pt-2 text-[1rem] leading-relaxed text-white/85">{p}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative min-w-0" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] bg-night-2 sm:aspect-square">
            <Image
              src={singer}
              alt={l.imgAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              loading="eager"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" aria-hidden />
          </div>

          {/* Ticket */}
          <div className="relative z-10 mx-auto -mt-36 w-[92%] max-w-[26rem] rounded-[24px] bg-surface text-ink shadow-lift sm:-mt-48">
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[1.05rem] font-bold tracking-[-0.02em] sm:text-[1.1rem]">{l.event}</p>
                  <p className="tabular text-[0.82rem] text-mute">{l.meta}</p>
                </div>
                <span
                  aria-live="polite"
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-bold transition-colors duration-500 ${
                    live ? "bg-brand text-on-brand" : "bg-tint text-brand-ink"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${live ? "live-dot bg-on-brand" : "bg-brand"}`} />
                  {label}
                </span>
              </div>
            </div>
            <div className="relative border-t border-dashed border-line" aria-hidden>
              <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-night" />
              <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-night" />
            </div>
            <div className="flex items-center justify-between gap-3 p-4 sm:gap-4 sm:p-5">
              <p className="min-w-0 text-[0.8rem] leading-snug text-mute">{note}</p>
              <span
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-[0.88rem] font-semibold transition-[background-color,color] duration-500 sm:px-5 ${
                  canJoin ? "bg-brand text-on-brand" : "bg-line text-mute"
                }`}
                aria-hidden
              >
                <Play className="h-4 w-4 fill-current" />
                {key === "replay" ? l.replay : l.join}
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-[0.78rem] text-mute-on-ink">{l.sample}</p>
        </div>
      </div>
    </section>
  );
}
