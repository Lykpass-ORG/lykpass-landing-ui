import { ImageResponse } from "next/og";

export const alt = "Lykpass: say what you feel like doing, get a real ticket.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>Say what you feel like doing.</span>
          <span style={{ color: "#ff5709" }}>Get a real ticket.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a9bdb6" }}>
          AI event discovery and ticketing. Every price, date and seat checked against live records.
        </div>
      </div>
    ),
    size,
  );
}
