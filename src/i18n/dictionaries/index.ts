import type { Locale } from "../config";
import en, { type Dictionary } from "./en";
import fr from "./fr";
import de from "./de";
import es from "./es";

const dictionaries: Record<Locale, Dictionary> = { en, fr, de, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
