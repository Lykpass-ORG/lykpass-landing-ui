"use client";

import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function Faq() {
  const { t } = useI18n();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper pb-20 sm:pb-36">
      <div className="mx-auto grid max-w-[78rem] gap-8 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2
            id="faq-title"
            className="text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98] text-ink lg:sticky lg:top-28"
            data-reveal
          >
            {t.faq.t1}
            <br />
            {t.faq.t2}
          </h2>
        </div>
        <div className="border-t border-line">
          {t.faq.items.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[1.05rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-brand-ink sm:gap-6 sm:py-6 sm:text-[1.15rem] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tint text-brand-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45">
                  <Plus className="h-4 w-4" aria-hidden />
                </span>
              </summary>
              <p className="max-w-[40rem] pb-6 pr-2 text-[1rem] leading-relaxed text-mute sm:pb-7 sm:pr-12 sm:text-[1.02rem]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
