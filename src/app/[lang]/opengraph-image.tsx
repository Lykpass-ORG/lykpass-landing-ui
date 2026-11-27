import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = "Lykpass";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e2622",
          color: "#fff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path
              d="M6 5h20a3 3 0 0 1 3 3v4.2a3.8 3.8 0 0 0 0 7.6V24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-4.2a3.8 3.8 0 0 0 0-7.6V8a3 3 0 0 1 3-3Z"
              fill="#ff5709"
            />
            <path d="m13.2 10.4 1.25 3.35 3.35 1.25-3.35 1.25-1.25 3.35-1.25-3.35L8.6 15l3.35-1.25 1.25-3.35Z" fill="#0e2622" />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2 }}>lykpass</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 80, fontWeight: 800, lineHeight: 0.98, letterSpacing: -3 }}>
          <span>{`${t.hero.l1} ${t.hero.l2}`}</span>
          <span style={{ color: "#ff5709" }}>{t.hero.l3}</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a9bdb6" }}>{t.meta.ogLine}</div>
      </div>
    ),
    size,
  );
}
