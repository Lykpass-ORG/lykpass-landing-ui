"use client";

import { useI18n } from "@/i18n/I18nProvider";

// From "AI on its own" to "people only": each step hands more of the decision to a person.
const shades = [
  { box: "bg-surface", who: "text-brand-ink", sub: "text-mute" },
  { box: "bg-tint", who: "text-brand-ink", sub: "text-mute" },
  { box: "bg-tint-2", who: "text-brand-ink", sub: "text-mute" },
  { box: "bg-brand text-on-brand", who: "text-on-brand", sub: "text-on-brand/80" },
  { box: "on-ink bg-night text-white", who: "text-brand", sub: "text-white/75" },
];

export function HumansDecide() {
  const { t } = useI18n();
  const h = t.humans;

  return (
    <section aria-labelledby="humans-title" className="bg-paper py-20 sm:py-36">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-end">
          <h2 id="humans-title" className="text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98] text-ink" data-reveal>
            {h.t1}
            <br />
            <span className="text-brand">{h.t2}</span>
          </h2>
          <p className="max-w-[32rem] text-[1.05rem] leading-relaxed text-mute sm:text-[1.1rem] lg:pb-2" data-reveal>
            {h.body}
          </p>
        </div>

        <div className="mt-12 sm:mt-16" data-reveal>
          <ol className="grid overflow-hidden rounded-[var(--radius-panel)] ring-1 ring-line sm:grid-cols-2 lg:grid-cols-5">
            {h.levels.map((l, i) => {
              const s = shades[i] ?? shades[0];
              return (
                <li
                  key={l.label}
                  className={`flex flex-col justify-between gap-6 p-5 sm:gap-10 sm:p-7 lg:min-h-[17rem] ${s.box} ${
                    i === h.levels.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    <p className={`text-[0.8rem] font-semibold ${s.who}`}>{l.who}</p>
                    <h3 className="mt-1.5 text-[1.35rem] font-extrabold tracking-[-0.03em] sm:mt-2 sm:text-[1.45rem]">{l.label}</h3>
                  </div>
                  <p className={`text-[0.95rem] leading-relaxed ${s.sub}`}>{l.detail}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex justify-between px-2 text-[0.8rem] font-medium text-mute" aria-hidden>
            <span>{h.moreAi}</span>
            <span>{h.moreHuman}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
