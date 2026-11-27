"use client";

import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const cols = [
    {
      title: t.footer.product,
      links: [
        [t.nav.how, "#how-it-works"],
        [t.nav.organizers, "#organizers"],
        [t.nav.live, "#live"],
        [t.nav.faq, "#faq"],
      ],
    },
    {
      title: t.footer.company,
      links: [
        [t.footer.early, "#early-access"],
        [t.footer.ai, "#humans-title"],
      ],
    },
  ];

  return (
    <footer className="bg-paper">
      <div className="mx-auto grid max-w-[78rem] grid-cols-2 gap-10 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-relaxed text-mute">{t.footer.tagline}</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="font-[family-name:var(--font-body)] text-[0.85rem] font-semibold tracking-normal text-ink">
              {c.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-[0.95rem] text-mute transition-colors hover:text-brand-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-[78rem] flex-col gap-2 border-t border-line px-5 py-6 text-[0.82rem] text-mute sm:flex-row sm:justify-between sm:px-8">
        <p>© 2026 Lykpass. {t.footer.rights}</p>
        <p>{t.footer.photos}</p>
      </div>
    </footer>
  );
}
