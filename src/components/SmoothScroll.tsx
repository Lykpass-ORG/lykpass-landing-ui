"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scroll. Reduced-motion users keep native scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Wheel and trackpad glide with an eased lerp. Touch keeps the phone's own
    // momentum scrolling, which is already smooth and feels native.
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      syncTouch: false,
      anchors: {
        offset: -72,
        duration: 1.5,
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      },
    });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    if (process.env.NODE_ENV !== "production") (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

/**
 * Drives every [data-reveal] element with one IntersectionObserver.
 * Rendered last inside the page, so its effect runs only after the page
 * segment has hydrated and the data-shown attribute never races React.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.shown = "true";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
