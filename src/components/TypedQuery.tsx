"use client";

import { useEffect, useState } from "react";

/** Types through a list of example queries on a loop. Static first line for reduced motion. */
export function TypedQuery({ lines, className = "" }: { lines: string[]; className?: string }) {
  const [text, setText] = useState(lines[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Start with the first line fully shown, then erase and type the next.
    let line = 0;
    let i = lines[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        i++;
        setText(full.slice(0, i));
        if (i === full.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 38 + Math.random() * 40);
      } else {
        i -= 2;
        if (i <= 0) {
          i = 0;
          deleting = false;
          line = (line + 1) % lines.length;
        }
        setText(full.slice(0, Math.max(i, 0)));
        timer = setTimeout(tick, 18);
      }
    };
    timer = setTimeout(tick, 2400);
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <span className={className}>
      {text}
      <span className="type-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] bg-brand" />
    </span>
  );
}
