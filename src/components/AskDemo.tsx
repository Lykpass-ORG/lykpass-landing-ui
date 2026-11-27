"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { CalendarDays, Check, MapPin, Music2, Sparkles, Ticket, Wallet, Building2 } from "lucide-react";
import stage from "../../public/images/festival-stage.jpg";
import singer from "../../public/images/live-singer.jpg";
import golden from "../../public/images/party-crowd.jpg";
import { useMedia } from "@/lib/useMedia";

const QUERY = "rooftop jazz night under ₦15k this weekend";

const chips = [
  { icon: Music2, label: "Jazz · live music" },
  { icon: Building2, label: "Rooftop" },
  { icon: CalendarDays, label: "Fri – Sun" },
  { icon: Wallet, label: "Up to ₦15,000" },
  { icon: MapPin, label: "Near you" },
];

type Ev = { img: StaticImageData; alt: string; title: string; where: string; when: string; price: string; why: string };

const events: Ev[] = [
  {
    img: stage,
    alt: "Crowd facing a lit outdoor stage at night",
    title: "Skyline Jazz Sessions",
    where: "Rooftop terrace, Victoria Island",
    when: "Sat · 8:00 PM",
    price: "₦12,000",
    why: "Rooftop, live jazz, and ₦3,000 under your budget",
  },
  {
    img: singer,
    alt: "A singer in a yellow outfit performing on stage",
    title: "Sunset Sax on the Terrace",
    where: "Open-air deck, Lekki Phase 1",
    when: "Sun · 6:30 PM",
    price: "₦9,500",
    why: "Golden-hour set this Sunday, seats still open",
  },
  {
    img: golden,
    alt: "People dancing close together at a crowded night party",
    title: "Afro-Jazz After Dark",
    where: "Sky lounge, Ikoyi",
    when: "Fri · 9:00 PM",
    price: "₦15,000",
    why: "Matches jazz + rooftop, right at your limit",
  },
];

const steps = [
  {
    title: "Ask like you'd text a friend.",
    body: "Mood, budget, day, vibe. Type it the way you'd say it. Follow up with “cheaper” or “somewhere with parking” and it keeps up.",
  },
  {
    title: "Lykpass reads the details.",
    body: "Your sentence becomes real filters you can see and change: what, where, when, and how much.",
  },
  {
    title: "Only bookable events come back.",
    body: "Each result exists, has seats, and fits every filter. The reason it was picked is shown right on it.",
  },
];

export function AskDemo() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useMedia("(min-width: 1024px)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const pinned = desktop && !reduce;
  const [p, setP] = useState(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (pinned) setP(v);
  });

  const prog = pinned ? p : 1;
  const typed = Math.round(Math.min(1, prog / 0.26) * QUERY.length);
  const chipCount = Math.floor(Math.max(0, Math.min(1, (prog - 0.28) / 0.2)) * (chips.length + 0.99));
  const cardCount = Math.floor(Math.max(0, Math.min(1, (prog - 0.5) / 0.32)) * (events.length + 0.99));
  const stepIdx = prog < 0.28 ? 0 : prog < 0.5 ? 1 : 2;

  return (
    <section
      ref={ref}
      id="how-it-works"
      aria-labelledby="ask-title"
      className={`relative bg-paper ${pinned ? "h-[340vh]" : ""}`}
    >
      <div className={`${pinned ? "sticky top-0 flex h-screen items-center" : "py-24 sm:py-32"}`}>
        <div className="mx-auto grid w-full max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <h2 id="ask-title" className="text-[clamp(2.3rem,5vw,4.1rem)] font-extrabold leading-[0.98] text-ink" data-reveal>
              Plain words in.
              <br />
              <span className="text-brand">Real events out.</span>
            </h2>
            <ol className="mt-10 space-y-2">
              {steps.map((s, i) => {
                const active = !pinned || i === stepIdx;
                return (
                  <li
                    key={s.title}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                    className={`relative rounded-[20px] py-4 pl-12 pr-4 transition-[opacity,background-color] duration-700 ease-[var(--ease-out-expo)] ${
                      pinned ? (active ? "bg-tint opacity-100" : "opacity-45") : ""
                    }`}
                  >
                    <span
                      className={`absolute left-4 top-[1.35rem] grid h-5 w-5 place-items-center rounded-full text-[0.7rem] font-bold transition-colors duration-500 ${
                        active ? "bg-brand text-ink" : "bg-line text-mute"
                      }`}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <h3 className="text-[1.25rem] font-bold leading-tight tracking-[-0.02em] text-ink">{s.title}</h3>
                    <p className="mt-1.5 max-w-[30rem] text-[1rem] leading-relaxed text-mute">{s.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Demo stage */}
          <div className="relative" data-reveal>
            <div className="rounded-[var(--radius-panel)] bg-ink p-3 shadow-lift sm:p-4">
              <div className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-4 sm:px-5">
                <Sparkles className="h-5 w-5 shrink-0 text-brand" aria-hidden />
                <p className="min-h-[1.5em] text-[1rem] font-medium text-ink sm:text-[1.1rem]" aria-label={`Example search: ${QUERY}`}>
                  <span aria-hidden>
                    {QUERY.slice(0, typed)}
                    {typed < QUERY.length && (
                      <span className="type-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] bg-brand" />
                    )}
                  </span>
                </p>
              </div>

              <ul className="flex flex-wrap gap-2 px-1 pb-1 pt-3" aria-label="Filters Lykpass understood">
                {chips.map((c, i) => {
                  const on = i < chipCount;
                  return (
                    <li
                      key={c.label}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.85rem] font-medium transition-[opacity,transform,background-color] duration-500 ease-[var(--ease-out-expo)] ${
                        on
                          ? "translate-y-0 border-white/15 bg-white/10 text-white opacity-100"
                          : "translate-y-1 border-white/10 text-white/0 opacity-40"
                      }`}
                    >
                      <c.icon className="h-3.5 w-3.5 text-brand" aria-hidden />
                      {c.label}
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-2 space-y-2">
                {events.map((e, i) => {
                  const on = i < cardCount;
                  return (
                    <li
                      key={e.title}
                      className={`grid grid-cols-[4.5rem_1fr] items-center gap-3 rounded-[18px] bg-white p-2.5 pr-4 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] sm:grid-cols-[6rem_1fr_auto] sm:gap-4 ${
                        on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-[0.07]"
                      }`}
                    >
                      <div className="relative h-[4.5rem] overflow-hidden rounded-[12px] sm:h-[5rem]">
                        <Image src={e.img} alt={e.alt} fill sizes="96px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[1.02rem] font-bold tracking-[-0.01em] text-ink">{e.title}</p>
                        <p className="truncate text-[0.85rem] text-mute">
                          {e.where} · {e.when}
                        </p>
                        <p className="mt-1 flex items-start gap-1.5 text-[0.82rem] font-medium text-brand-ink">
                          <Check className="mt-[0.15em] h-3.5 w-3.5 shrink-0" aria-hidden />
                          <span className="line-clamp-1">Why this: {e.why}</span>
                        </p>
                      </div>
                      <div className="col-span-2 flex items-center justify-between border-t border-line pt-2 sm:col-span-1 sm:block sm:border-0 sm:pt-0 sm:text-right">
                        <p className="tabular text-[1.05rem] font-bold text-ink">{e.price}</p>
                        <p className="inline-flex items-center gap-1 text-[0.75rem] text-mute">
                          <Ticket className="h-3 w-3" aria-hidden /> Seats open
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="px-2 pb-1 pt-3 text-[0.78rem] text-mute-on-ink">Sample events, shown for illustration.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
