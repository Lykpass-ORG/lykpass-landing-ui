"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Theme = "light" | "dark";
const EVENT = "lykpass-theme";

function read(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  // Follow the OS setting until the visitor picks a theme themselves.
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {}
    if (!saved) apply(mq.matches ? "dark" : "light", false);
  };
  mq.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener(EVENT, cb);
    mq.removeEventListener("change", onSystem);
  };
}

function apply(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.classList.add("theme-fade");
  root.dataset.theme = theme;
  window.setTimeout(() => root.classList.remove("theme-fade"), 500);
  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeToggle({ onInk = false }: { onInk?: boolean }) {
  const { t } = useI18n();
  const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme);
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => apply(dark ? "light" : "dark", true)}
      aria-label={dark ? t.nav.toLight : t.nav.toDark}
      title={dark ? t.nav.toLight : t.nav.toDark}
      className={`relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full transition-colors duration-300 ${
        onInk ? "bg-white/10 text-white hover:bg-white/20" : "bg-tint text-ink hover:bg-tint-2"
      }`}
    >
      <Sun
        aria-hidden
        className={`keep-transition absolute h-[1.15rem] w-[1.15rem] transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] ${
          dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        aria-hidden
        className={`keep-transition absolute h-[1.1rem] w-[1.1rem] transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] ${
          dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
      />
    </button>
  );
}
