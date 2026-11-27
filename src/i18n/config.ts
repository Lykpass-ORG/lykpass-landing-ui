export const locales = ["en", "fr", "de", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { name: string; flag: string; og: string }> = {
  en: { name: "English", flag: "gb", og: "en_GB" },
  fr: { name: "Français", flag: "fr", og: "fr_FR" },
  de: { name: "Deutsch", flag: "de", og: "de_DE" },
  es: { name: "Español", flag: "es", og: "es_ES" },
};

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Flag image from flagcdn.com, sized for crisp display at 2x. */
export const flagUrl = (code: string, width: 20 | 40 | 80 = 40) => `https://flagcdn.com/w${width}/${code}.png`;

/** Remember the visitor's language so the root redirect uses it next time. */
export function rememberLocale(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}
