"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

type Ctx = { t: Dictionary; locale: Locale };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ t, locale, children }: Ctx & { children: React.ReactNode }) {
  return <I18nContext.Provider value={{ t, locale }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
