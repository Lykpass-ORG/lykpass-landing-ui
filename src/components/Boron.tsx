"use client";

import { useEffect, useRef } from "react";

/**
 * Boron, the Lykpass AI assistant.
 * A ticket-shaped character (notched sides, like the Lykpass mark) with pill eyes that blink,
 * a small smile and an antenna spark. Motion lives in globals.css (.boron-*) and stops for
 * reduced-motion users.
 *
 * - thinking: eyes glance side to side (used while Boron is "typing")
 * - track:    eyes follow the pointer (large, hero-style uses only)
 */

export const BORON_BODY =
  "M16 8H32A12 12 0 0 1 44 20V20.5A3.5 3.5 0 0 0 44 27.5V28A12 12 0 0 1 32 40H16A12 12 0 0 1 4 28V27.5A3.5 3.5 0 0 0 4 20.5V20A12 12 0 0 1 16 8Z";

type Props = {
  size?: number;
  className?: string;
  thinking?: boolean;
  track?: boolean;
  /** Accessible name. Omit for decorative uses next to visible text. */
  title?: string;
};

export function Boron({ size = 24, className = "", thinking = false, track = false, title }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!track) return;
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, d / 400);
        el.style.setProperty("--bx", `${((dx / d) * 2.6 * reach).toFixed(2)}px`);
        el.style.setProperty("--by", `${((dy / d) * 1.8 * reach).toFixed(2)}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [track]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`boron shrink-0 overflow-visible ${thinking ? "boron-thinking" : ""} ${className}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* antenna */}
      <path d="M24 8V4.2" stroke="var(--brand)" strokeWidth="2.4" strokeLinecap="round" />
      <circle className="boron-spark" cx="24" cy="3.2" r="2.6" fill="var(--brand-soft)" />
      {/* head */}
      <path d={BORON_BODY} fill="var(--brand)" />
      <path d="M12 11.5H36" stroke="#fff" strokeOpacity=".28" strokeWidth="1.6" strokeLinecap="round" />
      {/* eyes: outer group looks around, inner group blinks */}
      <g className="boron-look">
        <g className="boron-blink">
          <rect x="15.5" y="17.5" width="5" height="10.5" rx="2.5" fill="var(--on-brand)" />
          <rect x="27.5" y="17.5" width="5" height="10.5" rx="2.5" fill="var(--on-brand)" />
          <circle cx="17.2" cy="19.6" r="1" fill="#fff" fillOpacity=".9" />
          <circle cx="29.2" cy="19.6" r="1" fill="#fff" fillOpacity=".9" />
        </g>
      </g>
      {/* smile */}
      <path d="M21 32.2Q24 34.4 27 32.2" fill="none" stroke="var(--on-brand)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
