"use client";

import Image from "next/image";
import { Check, Megaphone, MessageSquareText, PenLine, Users } from "lucide-react";
import { Boron } from "./Boron";
import organizer from "../../public/images/organizer-orange.jpg";
import { useI18n } from "@/i18n/I18nProvider";

const extraIcons = [Megaphone, Users, MessageSquareText];

function ForecastChart({ label }: { label: string }) {
  // Sample forecast: tickets sold over 8 weeks, with an estimate band.
  const w = 320;
  const h = 128;
  const low = [4, 18, 40, 70, 104, 142, 186, 220];
  const high = [8, 30, 64, 108, 156, 206, 262, 310];
  const mid = low.map((l, i) => (l + high[i]) / 2);
  const x = (i: number) => (i / (low.length - 1)) * w;
  const y = (v: number) => h - (v / 330) * h;
  const band =
    high.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ") +
    " " +
    low
      .map((v, i) => [v, i] as const)
      .reverse()
      .map(([v, i]) => `L${x(i)},${y(v)}`)
      .join(" ") +
    " Z";
  const line = mid.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");

  return (
    <svg viewBox={`0 -6 ${w} ${h + 12}`} className="h-auto w-full" role="img" aria-label={label}>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="var(--line)" strokeWidth="1" />
      ))}
      <path d={band} fill="var(--brand)" fillOpacity="0.16" />
      <path d={line} fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={x(7)} cy={y(mid[7])} r="4.5" fill="var(--surface)" stroke="var(--brand)" strokeWidth="2.5" />
    </svg>
  );
}

export function Organizers() {
  const { t } = useI18n();
  const o = t.org;

  return (
    <section id="organizers" aria-labelledby="org-title" className="bg-tint py-20 sm:py-36">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 id="org-title" className="text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98] text-ink" data-reveal>
            {o.tA} <span className="text-brand">{o.tB}</span>
            {o.tC}
          </h2>
          <p className="max-w-[30rem] text-[1.05rem] leading-relaxed text-mute sm:text-[1.1rem] lg:pb-2" data-reveal>
            {o.body}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-12">
          {/* Brief over photo */}
          <div className="relative min-h-[24rem] overflow-hidden rounded-[var(--radius-panel)] bg-night sm:min-h-[26rem] lg:col-span-5" data-reveal>
            <Image
              src={organizer}
              alt={o.imgAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              loading="eager"
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" aria-hidden />
            <div className="absolute inset-x-3 bottom-3 rounded-[20px] bg-surface p-4 shadow-lift sm:inset-x-4 sm:bottom-4">
              <p className="flex items-center gap-2 text-[0.78rem] font-semibold text-brand-ink">
                <PenLine className="h-3.5 w-3.5" aria-hidden /> {o.briefLabel}
              </p>
              <p className="mt-1.5 text-[0.98rem] font-medium leading-snug text-ink">{o.brief}</p>
            </div>
          </div>

          {/* Draft */}
          <div
            className="min-w-0 rounded-[var(--radius-panel)] bg-surface p-5 shadow-soft sm:p-8 lg:col-span-7"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 text-[0.78rem] font-semibold text-brand-ink">
                <Boron size={22} delay={-6} className="-my-1" /> {o.draftBadge}
              </p>
              <p className="text-[0.8rem] text-mute">{o.sample}</p>
            </div>
            <p className="mt-5 font-[family-name:var(--font-display)] text-[1.6rem] font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-[1.9rem]">
              {o.draftTitle}
            </p>
            <p className="mt-3 max-w-[38rem] text-[0.98rem] leading-relaxed text-mute sm:text-[1rem]">{o.draftBody}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-[0.92rem] sm:grid-cols-3">
              <div>
                <dt className="text-mute">{o.catLabel}</dt>
                <dd className="mt-1 font-semibold text-ink">{o.cat}</dd>
              </div>
              <div>
                <dt className="text-mute">{o.ageLabel}</dt>
                <dd className="mt-1 font-semibold text-ink">{o.age}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-mute">{o.tagsLabel}</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {o.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line px-2.5 py-0.5 text-[0.8rem] font-medium text-ink">
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Forecast */}
          <div className="min-w-0 rounded-[var(--radius-panel)] bg-surface p-5 shadow-soft sm:p-8 lg:col-span-7" data-reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[1.2rem] font-bold tracking-[-0.02em] text-ink sm:text-[1.25rem]">{o.fcTitle}</h3>
              <p className="text-[0.8rem] font-medium text-mute">{o.fcNote}</p>
            </div>
            <p className="tabular mt-1 text-[0.95rem] text-mute">
              {o.fcLikely} <span className="font-semibold text-ink">{o.fcRange}</span> {o.fcBy}
            </p>
            <div className="mt-6">
              <ForecastChart label={o.fcChart} />
              <div className="tabular mt-2 flex justify-between text-[0.75rem] text-mute">
                <span>{o.fcStart}</span>
                <span>{o.fcEnd}</span>
              </div>
            </div>
            <p className="mt-4 text-[0.82rem] text-mute">{o.fcThin}</p>
          </div>

          {/* Pricing */}
          <div
            className="on-ink min-w-0 rounded-[var(--radius-panel)] bg-night p-5 text-white shadow-soft ring-1 ring-white/5 sm:p-8 lg:col-span-5"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <h3 className="text-[1.2rem] font-bold tracking-[-0.02em] sm:text-[1.25rem]">{o.priceTitle}</h3>
            <p className="tabular mt-3 font-[family-name:var(--font-display)] text-[clamp(1.9rem,8vw,2.4rem)] font-extrabold leading-none tracking-[-0.03em] text-brand">
              {o.priceRange}
            </p>
            <p className="mt-2 text-[0.9rem] text-mute-on-ink">{o.priceBasis}</p>
            <ul className="tabular mt-4 divide-y divide-white/10 text-[0.88rem]">
              {o.comps.map(([n, p]) => (
                <li key={n} className="flex justify-between gap-4 py-2.5">
                  <span className="min-w-0 text-white/85">{n}</span>
                  <span className="shrink-0 font-semibold">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 inline-flex items-center gap-2 text-[0.82rem] text-mute-on-ink">
              <Check className="h-4 w-4 text-brand" aria-hidden /> {o.priceFinal}
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-10">
          {o.extras.map((e, i) => {
            const Icon = extraIcons[i] ?? Users;
            return (
              <li key={e.title} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
                <Icon className="h-6 w-6 text-brand" aria-hidden />
                <h3 className="mt-4 text-[1.15rem] font-bold tracking-[-0.02em] text-ink sm:text-[1.2rem]">{e.title}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-mute">{e.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
