"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Boron, the Lykpass AI assistant.
 *
 * An egg-shaped orange head with soft shading, pill eyes, a smile, a little blush and a party hat.
 * Layers, outermost first (each animated on its own in globals.css, .boron-*):
 *   head   turns left and right now and then (slight rotate + shift)
 *   face   moves further than the head during a turn, which reads as a 3D turn
 *   track  follows the pointer (when `track` is set)
 *   eyes   wander around on their own, and blink
 *   mouth  breaks into a bigger grin from time to time
 *   hat    wobbles, its pom-pom bounces
 *   blower now and then unrolls from the mouth and rolls back up
 * Everything holds still for reduced-motion users.
 */

export const BORON_EGG =
  "M24 4.5C35.2 4.5 43.6 15.6 43.6 27.4C43.6 38.2 35.2 45 24 45C12.8 45 4.4 38.2 4.4 27.4C4.4 15.6 12.8 4.5 24 4.5Z";

type Props = {
  size?: number;
  className?: string;
  /** Eyes dart side to side while Boron is "typing". */
  thinking?: boolean;
  /** Eyes follow the pointer (large uses only). */
  track?: boolean;
  /** Soft ground shadow under the head (large uses only). */
  grounded?: boolean;
  /** Offset (seconds) so several Borons on one page don't move in sync. */
  delay?: number;
  /** Accessible name. Omit for decorative uses next to visible text. */
  title?: string;
};

export function Boron({ size = 24, className = "", thinking = false, track = false, grounded = false, delay = 0, title }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  useEffect(() => {
    if (!track) return;
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let idle = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, d / 420);
        el.style.setProperty("--bx", `${((dx / d) * 2.4 * reach).toFixed(2)}px`);
        el.style.setProperty("--by", `${((dy / d) * 1.7 * reach).toFixed(2)}px`);
        // While the pointer moves Boron watches it; after a pause it goes back to looking around.
        el.classList.add("boron-tracking");
        window.clearTimeout(idle);
        idle = window.setTimeout(() => {
          el.classList.remove("boron-tracking");
          el.style.setProperty("--bx", "0px");
          el.style.setProperty("--by", "0px");
        }, 2200);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.removeEventListener("pointermove", onMove);
    };
  }, [track]);

  const skin = `boron-skin-${uid}`;
  const sheen = `boron-sheen-${uid}`;
  const hatFill = `boron-hat-${uid}`;
  const stripes = `boron-stripes-${uid}`;

  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`boron shrink-0 overflow-visible ${thinking ? "boron-thinking" : ""} ${className}`}
      style={{ "--boron-delay": `${delay}s` } as React.CSSProperties}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <radialGradient id={skin} cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#ff9a5c" />
          <stop offset="48%" stopColor="#ff5f14" />
          <stop offset="100%" stopColor="#d93f00" />
        </radialGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity=".55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={hatFill} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d4a42" />
          <stop offset="55%" stopColor="#0e2622" />
          <stop offset="100%" stopColor="#081a17" />
        </linearGradient>
        <pattern id={stripes} width="3.2" height="4" patternUnits="userSpaceOnUse">
          <rect width="3.2" height="4" fill="#0e2622" />
          <rect width="1.5" height="4" fill="#fff2ea" />
        </pattern>
      </defs>

      {grounded && <ellipse className="boron-shadow" cx="24" cy="47.2" rx="12.5" ry="1.7" fill="#000" fillOpacity=".22" />}

      <g className={grounded ? "boron-bob" : undefined}>
      <g className="boron-head">
        <path d={BORON_EGG} fill={`url(#${skin})`} />
        {/* rim light along the lower edge and a glossy highlight up top */}
        <path d="M9.2 35.6C12.4 40.6 17.6 43.2 24 43.2C30.4 43.2 35.6 40.6 38.8 35.6" fill="none" stroke="#ffb07a" strokeOpacity=".45" strokeWidth="1.1" strokeLinecap="round" />
        <ellipse cx="17.2" cy="12.6" rx="6.6" ry="3.6" fill={`url(#${sheen})`} transform="rotate(-24 17.2 12.6)" />

        {/* party hat: tilted to one side, polka dots, cream band and a pom-pom that bounces */}
        <g transform="translate(1.6 0) rotate(-14 24 7)">
          <g className="boron-hat">
            <path d="M16.4 7.3L24 -11.4L31.6 7.3Q24 9.8 16.4 7.3Z" fill={`url(#${hatFill})`} />
            <path d="M24 -11.4L20.6 6.2" stroke="#fff" strokeOpacity=".14" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="21.4" cy="-0.6" r="1.35" fill="#ff8a52" />
            <circle cx="26.2" cy="2.8" r="1.25" fill="#fff2ea" />
            <circle cx="24" cy="-5.6" r="1.05" fill="#fff2ea" />
            <circle cx="19.8" cy="4.6" r="1.1" fill="#ffb07a" />
            <circle cx="25.6" cy="-2.6" r=".9" fill="#ff8a52" />
            <path d="M16.2 7.1Q24 9.9 31.8 7.1" fill="none" stroke="#ffe0cd" strokeWidth="2.3" strokeLinecap="round" />
            <g className="boron-pom">
              <circle cx="24" cy="-12.3" r="3" fill="#fff2ea" />
              <circle cx="24.9" cy="-11.5" r="1.6" fill="#ffd2b8" fillOpacity=".8" />
              <circle cx="23" cy="-13.3" r=".9" fill="#fff" />
            </g>
          </g>
        </g>

        <g className="boron-face">
          {/* blush */}
          <ellipse cx="11.6" cy="31.4" rx="2.9" ry="1.7" fill="#c42f00" fillOpacity=".32" />
          <ellipse cx="36.4" cy="31.4" rx="2.9" ry="1.7" fill="#c42f00" fillOpacity=".32" />
          <g className="boron-track">
            <g className="boron-eyes">
              <g className="boron-blink">
                <rect x="15" y="19.6" width="5.2" height="10.8" rx="2.6" fill="#0e2622" />
                <rect x="27.8" y="19.6" width="5.2" height="10.8" rx="2.6" fill="#0e2622" />
                <circle cx="16.8" cy="21.9" r="1.15" fill="#fff" />
                <circle cx="29.6" cy="21.9" r="1.15" fill="#fff" />
                <circle cx="18.6" cy="28" r=".5" fill="#fff" fillOpacity=".55" />
                <circle cx="31.4" cy="28" r=".5" fill="#fff" fillOpacity=".55" />
              </g>
            </g>
          </g>
          <g className="boron-mouth">
            <path d="M20.4 34.6Q24 37.6 27.6 34.6" fill="none" stroke="#0e2622" strokeWidth="1.9" strokeLinecap="round" />
          </g>
          {/* party blower: now and then it unrolls from the mouth, toots, and rolls back up */}
          <g transform="translate(25.4 35.7) rotate(14)">
            <g className="boron-blower">
              <rect x="-1.4" y="-1.35" width="3.2" height="2.7" rx="1.1" fill="#0e2622" />
              <rect x="1.4" y="-1.5" width="17" height="3" rx="1.5" fill={`url(#${stripes})`} />
              <path d="M18.2 -1.5L21.8 -3.3V3.3L18.2 1.5Z" fill="#ffe0cd" />
            </g>
          </g>
        </g>
      </g>
      </g>
    </svg>
  );
}
