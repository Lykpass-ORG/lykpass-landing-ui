import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`]));
  return locales.map((l) => ({
    url: `${site.url}/${l}`,
    changeFrequency: "weekly",
    priority: l === "en" ? 1 : 0.9,
    alternates: { languages },
    images: [`${site.url}/${l}/opengraph-image`],
  }));
}
