"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Play, ShieldCheck, ArrowLeftRight, Link2, Smartphone } from "lucide-react";
import singer from "../../public/images/live-singer.jpg";

const statuses = [
  { key: "scheduled", label: "Scheduled", note: "Join opens 30 min before start" },
  { key: "soon", label: "Starting soon", note: "Join is open" },
  { key: "live", label: "Live now", note: "1 active session on this ticket" },
  { key: "replay", label: "Replay available", note: "Until Sunday, 11:59 PM" },
] as const;

const points = [
  { icon: ShieldCheck, text: "Only a valid, unrefunded ticket gets in. No link in an email for anyone to forward." },
  { icon: ArrowLeftRight, text: "Transfer your ticket and the stream access moves with it, instantly." },
  { icon: Smartphone, text: "Opens straight in the Lykluk app, or guides you to install it and brings you back." },
  { icon: Link2, text: "If the stream provider has a problem, ticket holders get the organizer’s backup link." },
];

export function LiveEvents() {
  const [i, setI] = useState(2);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % statuses.length), 2600);
    return () => clearInterval(t);
  }, []);

  const s = statuses[i];
  const live = s.key === "live";
  const canJoin = s.key !== "scheduled";

  return (
    <section id="live" aria-labelledby="live-title" className="on-ink bg-ink py-24 text-white sm:py-36">
      <div className="mx-auto grid max-w-[78rem] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="live-title" className="text-[clamp(2.3rem,5vw,4.1rem)] font-extrabold leading-[0.98]" data-reveal>
            Online event?
            <br />
            <span className="text-brand">Your ticket is the way in.</span>
          </h2>
          <p className="mt-6 max-w-[32rem] text-[1.1rem] leading-relaxed text-mute-on-ink" data-reveal>
            A Join live button appears on your ticket when the stream opens. Streams run on Lykluk Live, and buying a
            ticket never needs a Lykluk account.
          </p>
          <ul className="mt-10 space-y-5">
            {points.map((p, n) => (
              <li
                key={p.text}
                className="flex gap-4"
                data-reveal
                style={{ "--reveal-delay": `${n * 90}ms` } as React.CSSProperties}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 ring-1 ring-white/12">
                  <p.icon className="h-[1.15rem] w-[1.15rem] text-brand" aria-hidden />
                </span>
                <p className="pt-2 text-[1rem] leading-relaxed text-white/85">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] sm:aspect-[5/5]">
            <Image
              src={singer}
              alt="A performer in a yellow outfit singing on stage"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden />
          </div>

          {/* Ticket */}
          <div className="relative z-10 mx-auto -mt-40 w-[92%] max-w-[26rem] rounded-[24px] bg-white text-ink shadow-lift sm:-mt-48">
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[1.1rem] font-bold tracking-[-0.02em]">Laughs Online: Late Edition</p>
                  <p className="tabular text-[0.82rem] text-mute">Tonight · 9:00 PM · Online</p>
                </div>
                <span
                  aria-live="polite"
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-bold transition-colors duration-500 ${
                    live ? "bg-brand text-ink" : "bg-tint text-brand-ink"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${live ? "live-dot bg-ink" : "bg-brand"}`} />
                  {s.label}
                </span>
              </div>
            </div>
            <div className="relative border-t border-dashed border-line" aria-hidden>
              <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-ink" />
              <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-ink" />
            </div>
            <div className="flex items-center justify-between gap-4 p-5">
              <p className="text-[0.8rem] leading-snug text-mute">{s.note}</p>
              <span
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[0.9rem] font-semibold transition-[background-color,color,opacity] duration-500 ${
                  canJoin ? "bg-brand text-ink" : "bg-line text-mute"
                }`}
                aria-hidden
              >
                <Play className="h-4 w-4 fill-current" />
                {s.key === "replay" ? "Watch replay" : "Join live"}
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-[0.78rem] text-mute-on-ink">Sample ticket</p>
        </div>
      </div>
    </section>
  );
}
