"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

export function Nav() {
  const { t } = useI18n();
  const [solid, setSolid] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#how-it-works", label: t.nav.how },
    { href: "#organizers", label: t.nav.organizers },
    { href: "#live", label: t.nav.live },
    { href: "#faq", label: t.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.75);
      setLifted(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onInk = !solid;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[78rem] items-center justify-between gap-2 rounded-full py-2 pl-4 pr-2 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] sm:pl-5 ${
          solid ? "bg-surface shadow-soft ring-1 ring-line" : lifted || open ? "bg-night shadow-lift" : "bg-transparent"
        }`}
      >
        <a href="#top" aria-label={t.nav.home} className="shrink-0 rounded-full">
          <Logo tone={onInk ? "paper" : "ink"} />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[0.93rem] font-medium transition-colors duration-300 xl:px-4 ${
                  onInk ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-ink/75 hover:bg-tint hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher onInk={onInk} />
          <ThemeToggle onInk={onInk} />
          <a
            href="#early-access"
            className={`hidden whitespace-nowrap rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors duration-300 md:inline-flex ${
              onInk ? "bg-white text-night hover:bg-tint" : "bg-brand text-on-brand hover:bg-brand-deep"
            }`}
          >
            {t.nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors lg:hidden ${
              onInk ? "bg-white/10 text-white hover:bg-white/20" : "bg-night text-white"
            }`}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`on-ink fixed inset-x-3 top-[4.75rem] origin-top rounded-[var(--radius-panel)] bg-night p-6 text-white shadow-lift ring-1 ring-white/10 transition-[opacity,transform] duration-400 ease-[var(--ease-out-expo)] lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-4 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#early-access"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="mt-6 flex justify-center rounded-full bg-brand px-6 py-4 font-semibold text-on-brand"
        >
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
}
