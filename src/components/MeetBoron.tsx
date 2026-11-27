"use client";

import { ArrowRight, LayoutDashboard, MessageCircleQuestion, SearchCheck, Ticket } from "lucide-react";
import { Boron } from "./Boron";
import { useI18n } from "@/i18n/I18nProvider";

const skillIcons = [SearchCheck, MessageCircleQuestion, Ticket, LayoutDashboard];
// Where each speech bubble floats around Boron on larger screens.
const bubbleSpots = [
  "left-[6%] top-[14%]",
  "right-[5%] top-[24%]",
  "left-[4%] bottom-[22%]",
  "right-[7%] bottom-[12%]",
];

/** Boron is element 5: five electrons on two tilted orbits frame the character. */
function Orbits() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
      {/* Electrons placed on their ellipse: (200 + rx·cosθ, 200 + ry·sinθ) before the tilt. */}
      <g className="boron-orbit" style={{ transformOrigin: "200px 200px" }}>
        <g transform="rotate(-24 200 200)">
          <ellipse cx="200" cy="200" rx="170" ry="70" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          <circle cx="40" cy="176" r="4.5" fill="var(--brand)" />
          <circle cx="330" cy="245" r="4" fill="var(--brand-soft)" />
          <circle cx="142" cy="266" r="3.5" fill="#fff" fillOpacity=".7" />
        </g>
      </g>
      <g className="boron-orbit-rev" style={{ transformOrigin: "200px 200px" }}>
        <g transform="rotate(32 200 200)">
          <ellipse cx="200" cy="200" rx="150" ry="58" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
          <circle cx="350" cy="200" r="4.5" fill="var(--brand)" />
          <circle cx="104" cy="156" r="3.5" fill="#fff" fillOpacity=".6" />
        </g>
      </g>
    </svg>
  );
}

export function MeetBoron() {
  const { t } = useI18n();
  const b = t.boron;

  return (
    <section id="boron" aria-labelledby="boron-title" className="bg-paper py-20 sm:py-32">
      <div className="mx-auto grid max-w-[78rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* Stage */}
        <div className="on-ink relative min-w-0" data-reveal>
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-[var(--radius-panel)] bg-night shadow-lift ring-1 ring-white/5">
            <Orbits />
            <div className="absolute inset-0 grid place-items-center">
              <Boron
                size={196}
                track
                grounded
                title={b.label}
                className="drop-shadow-[0_22px_36px_rgba(255,87,9,0.3)] sm:h-[232px] sm:w-[232px]"
              />
            </div>
            {/* Floating requests (larger screens) */}
            {b.bubbles.map((text, i) => (
              <p
                key={text}
                className={`bubble-float absolute hidden max-w-[13rem] rounded-[18px] bg-white/10 px-3.5 py-2 text-[0.85rem] font-medium leading-snug text-white ring-1 ring-white/15 sm:block ${bubbleSpots[i] ?? ""}`}
                style={{ animationDelay: `${i * -1.4}s` }}
              >
                {text}
              </p>
            ))}
          </div>
          {/* Requests as a row on phones */}
          <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:hidden" aria-hidden>
            {b.bubbles.map((text) => (
              <li key={text} className="rounded-full bg-tint px-3 py-1.5 text-[0.82rem] font-medium text-ink">
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Copy */}
        <div className="min-w-0">
          <h2 id="boron-title" className="text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98] text-ink" data-reveal>
            {b.t1}
            <br />
            <span className="text-brand">{b.t2}</span>
          </h2>
          <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-mute sm:text-[1.1rem]" data-reveal>
            {b.body}
          </p>

          <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {b.skills.map((s, i) => {
              const Icon = skillIcons[i] ?? SearchCheck;
              return (
                <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                  <Icon className="h-5 w-5 text-brand" aria-hidden />
                  <h3 className="mt-3 text-[1.08rem] font-bold tracking-[-0.02em] text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-mute">{s.body}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 rounded-[24px] bg-tint p-5 sm:flex sm:items-center sm:gap-5 sm:p-6" data-reveal>
            <div className="min-w-0 flex-1">
              <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[0.78rem] font-bold text-brand-ink">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                {b.soonBadge}
              </p>
              <p className="mt-2.5 text-[0.98rem] leading-relaxed text-ink">{b.soon}</p>
            </div>
            <a
              href="#early-access"
              className="group mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-3 text-[0.95rem] font-semibold text-on-brand transition-colors hover:bg-brand-deep sm:mt-0"
            >
              {b.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
