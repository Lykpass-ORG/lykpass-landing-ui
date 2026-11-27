import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Dictionary } from "@/i18n/dictionaries/en";

// Same outline as the Boron component; duplicated because this module renders on the server only.
const BORON_EGG =
  "M24 4.5C35.2 4.5 43.6 15.6 43.6 27.4C43.6 38.2 35.2 45 24 45C12.8 45 4.4 38.2 4.4 27.4C4.4 15.6 12.8 4.5 24 4.5Z";

export const cardSize = { width: 1200, height: 630 };

const C = {
  night: "#0e2622",
  deep: "#08110f",
  brand: "#ff5709",
  white: "#ffffff",
  mute: "#a9bdb6",
  tint: "#fff2ea",
  ink: "#0e2622",
};

async function assets() {
  // Cached so the cards can be prerendered at build time instead of on every request.
  "use cache";
  const root = process.cwd();
  const [display, body, bodyBold, symbols, photo] = await Promise.all([
    readFile(join(root, "src/assets/fonts/BricolageGrotesque-ExtraBold.woff"), "base64"),
    readFile(join(root, "src/assets/fonts/Geist-Medium.woff"), "base64"),
    readFile(join(root, "src/assets/fonts/Geist-SemiBold.woff"), "base64"),
    // Geist has no naira sign (₦); Noto Sans' extended Latin set supplies it.
    readFile(join(root, "src/assets/fonts/NotoSans-SemiBold-ext.woff"), "base64"),
    readFile(join(root, "public/images/crowd-golden.jpg"), "base64"),
  ]);
  return { display, body, bodyBold, symbols, photo: `data:image/jpeg;base64,${photo}` };
}

/** Fonts are cached as base64 strings (binary does not survive the cache); decode to an ArrayBuffer. */
const ab = (b64: string) => {
  const u = Buffer.from(b64, "base64");
  return u.buffer.slice(u.byteOffset, u.byteOffset + u.byteLength) as ArrayBuffer;
};

function Mark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path
        d="M6 5h20a3 3 0 0 1 3 3v4.2a3.8 3.8 0 0 0 0 7.6V24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-4.2a3.8 3.8 0 0 0 0-7.6V8a3 3 0 0 1 3-3Z"
        fill={C.brand}
      />
      <path d="M21 9v14" stroke="#fff" strokeOpacity=".45" strokeWidth="1.4" strokeDasharray="2 2" />
      <path d="m13.2 10.4 1.25 3.35 3.35 1.25-3.35 1.25-1.25 3.35-1.25-3.35L8.6 15l3.35-1.25 1.25-3.35Z" fill={C.ink} />
    </svg>
  );
}

/** Boron, drawn statically (the card is a still image, so no motion). */
function BoronStill({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <defs>
        <radialGradient id="skin" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#ff9a5c" />
          <stop offset="48%" stopColor="#ff5f14" />
          <stop offset="100%" stopColor="#d93f00" />
        </radialGradient>
      </defs>
      <path d={BORON_EGG} fill="url(#skin)" />
      <ellipse cx="17.2" cy="12.6" rx="6.6" ry="3.6" fill="#fff" fillOpacity=".3" transform="rotate(-24 17.2 12.6)" />
      <ellipse cx="11.6" cy="31.4" rx="2.9" ry="1.7" fill="#c42f00" fillOpacity=".32" />
      <ellipse cx="36.4" cy="31.4" rx="2.9" ry="1.7" fill="#c42f00" fillOpacity=".32" />
      <rect x="15" y="19.6" width="5.2" height="10.8" rx="2.6" fill={C.ink} />
      <rect x="27.8" y="19.6" width="5.2" height="10.8" rx="2.6" fill={C.ink} />
      <circle cx="16.8" cy="21.9" r="1.15" fill="#fff" />
      <circle cx="29.6" cy="21.9" r="1.15" fill="#fff" />
      <path d="M20.4 34.6Q24 37.6 27.6 34.6" fill="none" stroke={C.ink} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The share card for Open Graph and Twitter: localized headline on deep green,
 * the hero photo in a rounded frame, and the product's ask bar floating over it.
 */
export async function renderSocialCard(t: Dictionary, host: string) {
  const a = await assets();
  // Size the headline to the 540px column: Bricolage ExtraBold runs about 0.52em per character.
  const longest = Math.max(t.hero.l1.length, t.hero.l2.length, t.hero.l3.length);
  const headline = Math.round(Math.max(54, Math.min(74, 540 / (longest * 0.52))));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${C.night} 0%, ${C.deep} 100%)`,
          color: C.white,
          fontFamily: "Geist, Noto Sans",
          position: "relative",
        }}
      >
        {/* Left: brand + message */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
            padding: "64px 28px 60px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Mark />
            <span style={{ fontFamily: "Bricolage", fontSize: 40, letterSpacing: -1.6 }}>lykpass</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: headline, lineHeight: 0.98, letterSpacing: -2.6 }}>
            <span>{t.hero.l1}</span>
            <span>{t.hero.l2}</span>
            <span style={{ color: C.brand }}>{t.hero.l3}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: C.mute }}>
            <span
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                background: C.brand,
                color: C.ink,
                fontWeight: 600,
                fontSize: 22,
              }}
            >
              {t.nav.cta}
            </span>
            <span>{host}</span>
          </div>
        </div>

        {/* Right: photo with the ask bar over it */}
        <div style={{ display: "flex", position: "relative", flex: 1, padding: "40px 40px 40px 8px" }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 36,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
            <img src={a.photo} alt="" width={512} height={550} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                background: "linear-gradient(0deg, rgba(8,17,15,0.75) 0%, rgba(8,17,15,0) 55%)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: -24,
              right: 64,
              bottom: 84,
              display: "flex",
              flexDirection: "column",
              padding: 12,
              borderRadius: 28,
              background: C.white,
              color: C.ink,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.55)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "18px 20px",
                borderRadius: 20,
                background: C.tint,
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              <BoronStill />
              <span style={{ display: "flex", flex: 1 }}>{t.hero.queries[0]}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, padding: "14px 10px 4px", fontSize: 18 }}>
              <span style={{ display: "flex", flexShrink: 0, color: "#4d5e59" }}>{t.hero.matches}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, textAlign: "right" }}>
                <span style={{ width: 10, height: 10, flexShrink: 0, borderRadius: 99, background: C.brand }} />
                {t.hero.checked}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...cardSize,
      fonts: [
        { name: "Bricolage", data: ab(a.display), weight: 800, style: "normal" },
        { name: "Geist", data: ab(a.body), weight: 500, style: "normal" },
        { name: "Geist", data: ab(a.bodyBold), weight: 600, style: "normal" },
        { name: "Noto Sans", data: ab(a.symbols), weight: 600, style: "normal" },
      ],
    },
  );
}
