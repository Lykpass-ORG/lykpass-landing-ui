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

/**
 * Boron at full fidelity for the still card: shaded egg head, party hat with pom-pom,
 * blush, eye shine, and (optionally) the party blower out mid-toot.
 * Each <svg> is rasterised on its own, so the gradient ids can repeat safely.
 */
function BoronStill({ size = 38, blower = false }: { size?: number; blower?: boolean }) {
  // viewBox leaves room above for the hat and to the right for the blower.
  const vb = blower ? { x: 0, y: -16, w: 72, h: 64 } : { x: 0, y: -16, w: 48, h: 64 };
  return (
    <svg width={Math.round((size * vb.w) / 48)} height={Math.round((size * vb.h) / 48)} viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}>
      <defs>
        <radialGradient id="skin" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#ff9a5c" />
          <stop offset="48%" stopColor="#ff5f14" />
          <stop offset="100%" stopColor="#d93f00" />
        </radialGradient>
        <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity=".55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hat" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d4a42" />
          <stop offset="55%" stopColor="#0e2622" />
          <stop offset="100%" stopColor="#081a17" />
        </linearGradient>
      </defs>
      <path d={BORON_EGG} fill="url(#skin)" />
      <path d="M9.2 35.6C12.4 40.6 17.6 43.2 24 43.2C30.4 43.2 35.6 40.6 38.8 35.6" fill="none" stroke="#ffb07a" strokeOpacity=".45" strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx="17.2" cy="12.6" rx="6.6" ry="3.6" fill="url(#sheen)" transform="rotate(-24 17.2 12.6)" />
      <g transform="translate(1.6 0) rotate(-14 24 7)">
        <path d="M16.4 7.3L24 -11.4L31.6 7.3Q24 9.8 16.4 7.3Z" fill="url(#hat)" />
        <path d="M24 -11.4L20.6 6.2" stroke="#fff" strokeOpacity=".14" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="21.4" cy="-0.6" r="1.35" fill="#ff8a52" />
        <circle cx="26.2" cy="2.8" r="1.25" fill="#fff2ea" />
        <circle cx="24" cy="-5.6" r="1.05" fill="#fff2ea" />
        <circle cx="19.8" cy="4.6" r="1.1" fill="#ffb07a" />
        <circle cx="25.6" cy="-2.6" r=".9" fill="#ff8a52" />
        <path d="M16.2 7.1Q24 9.9 31.8 7.1" fill="none" stroke="#ffe0cd" strokeWidth="2.3" strokeLinecap="round" />
        <circle cx="24" cy="-12.3" r="3" fill="#fff2ea" />
        <circle cx="24.9" cy="-11.5" r="1.6" fill="#ffd2b8" fillOpacity=".8" />
        <circle cx="23" cy="-13.3" r=".9" fill="#fff" />
      </g>
      <ellipse cx="11.6" cy="31.4" rx="2.9" ry="1.7" fill="#c42f00" fillOpacity=".32" />
      <ellipse cx="36.4" cy="31.4" rx="2.9" ry="1.7" fill="#c42f00" fillOpacity=".32" />
      <rect x="15" y="19.6" width="5.2" height="10.8" rx="2.6" fill={C.ink} />
      <rect x="27.8" y="19.6" width="5.2" height="10.8" rx="2.6" fill={C.ink} />
      <circle cx="16.8" cy="21.9" r="1.15" fill="#fff" />
      <circle cx="29.6" cy="21.9" r="1.15" fill="#fff" />
      <circle cx="18.6" cy="28" r=".5" fill="#fff" fillOpacity=".55" />
      <circle cx="31.4" cy="28" r=".5" fill="#fff" fillOpacity=".55" />
      <path d="M20.4 34.6Q24 37.6 27.6 34.6" fill="none" stroke={C.ink} strokeWidth="1.9" strokeLinecap="round" />
      {blower && (
        <g transform="translate(25.4 35.7) rotate(14)">
          <rect x="-1.4" y="-1.35" width="3.2" height="2.7" rx="1.1" fill={C.ink} />
          <rect x="1.4" y="-1.5" width="17" height="3" rx="1.5" fill={C.ink} />
          {[3.2, 6.4, 9.6, 12.8, 16].map((x) => (
            <rect key={x} x={x} y="-1.5" width="1.5" height="3" fill="#fff2ea" />
          ))}
          <path d="M18.2 -1.5L21.8 -3.3V3.3L18.2 1.5Z" fill="#ffe0cd" />
        </g>
      )}
    </svg>
  );
}

/**
 * The share card for Open Graph and Twitter: localized headline on deep green,
 * the hero photo in a rounded frame, the product's ask bar floating over it,
 * and Boron (party hat on, blower out) perched on the bar.
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

          {/* Boron, party-ready, perched on the ask bar */}
          <div style={{ position: "absolute", right: 58, bottom: 244, display: "flex" }}>
            <BoronStill size={178} blower />
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
              <BoronStill size={40} />
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
