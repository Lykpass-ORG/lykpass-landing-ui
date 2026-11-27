type Props = { className?: string; tone?: "ink" | "paper" };

/** Lykpass mark: a ticket with a notch, its stub pierced by a spark. */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M6 5h20a3 3 0 0 1 3 3v4.2a3.8 3.8 0 0 0 0 7.6V24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-4.2a3.8 3.8 0 0 0 0-7.6V8a3 3 0 0 1 3-3Z"
        fill="#ff5709"
      />
      <path d="M21 9v14" stroke="#fff" strokeOpacity=".45" strokeWidth="1.4" strokeDasharray="2 2" />
      <path d="m13.2 10.4 1.25 3.35 3.35 1.25-3.35 1.25-1.25 3.35-1.25-3.35L8.6 15l3.35-1.25 1.25-3.35Z" fill="#0e2622" />
    </svg>
  );
}

export function Logo({ className = "", tone = "ink" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span
        className={`font-[family-name:var(--font-display)] text-[1.4rem] font-extrabold tracking-[-0.04em] ${
          tone === "paper" ? "text-white" : "text-ink"
        }`}
      >
        lykpass
      </span>
    </span>
  );
}
