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
 * Reveals every [data-reveal] element once its top edge enters the viewport.
 *
 * Uses a throttled scroll check rather than IntersectionObserver: browsers pause
 * or skip IntersectionObserver in background tabs, some in-app webviews and
 * power-saving modes, which left whole sections invisible. Elements already
 * scrolled past (deep links, restored scroll) are shown at once.
 *
 * Rendered last inside the page, so it runs only after the page has hydrated
 * and the data-shown attribute never races React.
 */
export function RevealObserver() {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
    let last = 0;
    let trailing = 0;

    const check = () => {
      last = performance.now();
      const line = window.innerHeight * 0.94;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < line) {
          el.dataset.shown = "true";
          return false;
        }
        return true;
      });
      if (!pending.length) stop();
    };

    // At most one check every 60ms while scrolling, plus one after scrolling settles.
    const onScroll = () => {
      window.clearTimeout(trailing);
      if (performance.now() - last > 60) check();
      trailing = window.setTimeout(check, 80);
    };

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(trailing);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return stop;
  }, []);

  return null;
}
