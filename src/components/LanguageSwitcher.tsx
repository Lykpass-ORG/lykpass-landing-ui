"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { flagUrl, localeMeta, locales, rememberLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

function Flag({ code, size = 20 }: { code: string; size?: number }) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full ring-1 ring-black/10"
      style={{ width: size, height: size }}
    >
      <Image src={flagUrl(code, 80)} alt="" fill sizes={`${size}px`} unoptimized className="object-cover" />
    </span>
  );
}

export function LanguageSwitcher({ onInk = false }: { onInk?: boolean }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.nav.language}: ${localeMeta[locale].name}`}
        className={`flex h-11 items-center gap-1.5 rounded-full pl-2.5 pr-2 text-[0.85rem] font-semibold uppercase tracking-wide transition-colors duration-300 ${
          onInk ? "bg-white/10 text-white hover:bg-white/20" : "bg-tint text-ink hover:bg-tint-2"
        }`}
      >
        <Flag code={localeMeta[locale].flag} />
        <span className="hidden sm:inline">{locale}</span>
        <ChevronDown
          aria-hidden
          className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute right-0 top-[calc(100%+0.6rem)] z-50 w-[13.5rem] origin-top-right rounded-[22px] bg-surface p-1.5 text-ink shadow-lift ring-1 ring-line transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)] ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <p className="px-3 pb-1.5 pt-2 text-[0.75rem] font-medium text-mute">{t.nav.language}</p>
        <ul id={listId} role="listbox" aria-label={t.nav.language}>
          {locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <a
                  href={`/${l}`}
                  hrefLang={l}
                  lang={l}
                  tabIndex={open ? 0 : -1}
                  onClick={() => rememberLocale(l)}
                  className={`flex items-center gap-3 rounded-[16px] px-3 py-2.5 text-[0.95rem] font-medium transition-colors ${
                    active ? "bg-tint" : "hover:bg-tint"
                  }`}
                >
                  <Flag code={localeMeta[l].flag} size={24} />
                  <span className="flex-1">{localeMeta[l].name}</span>
                  {active && <Check aria-hidden className="h-4 w-4 text-brand-ink" />}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
