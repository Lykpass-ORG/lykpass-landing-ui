import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cardSize, renderSocialCard } from "@/lib/social-card";
import { site } from "@/lib/site";

export const alt = "Lykpass: say what you feel like doing, get a real ticket. AI event discovery and ticketing.";
export const size = cardSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function TwitterImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return renderSocialCard(getDictionary(hasLocale(lang) ? lang : "en"), new URL(site.url).host);
}
