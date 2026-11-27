"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#organizers", label: "For organizers" },
  { href: "#live", label: "Live events" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.75);
      setLifted(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onInk = !solid && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[78rem] items-center justify-between rounded-full py-2 pl-4 pr-2 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] sm:pl-5 ${
          solid ? "bg-white shadow-soft" : lifted ? "bg-ink shadow-lift" : "bg-transparent"
        }`}
      >
        <a href="#top" aria-label="Lykpass home" className="rounded-full">
          <Logo tone={onInk ? "paper" : "ink"} />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-300 ${
                  onInk ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-ink/75 hover:bg-tint hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#early-access"
            className={`hidden rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors duration-300 sm:inline-flex ${
              onInk ? "bg-white text-ink hover:bg-tint" : "bg-brand text-ink hover:bg-brand-deep"
            }`}
          >
            Get early access
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
              onInk ? "bg-white/10 text-white hover:bg-white/20" : "bg-ink text-white"
            }`}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="on-ink fixed inset-x-3 top-[4.75rem] rounded-[var(--radius-panel)] bg-ink p-6 text-white shadow-lift lg:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-4 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.03em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#early-access"
          onClick={() => setOpen(false)}
          className="mt-6 flex justify-center rounded-full bg-brand px-6 py-4 font-semibold text-ink"
        >
          Get early access
        </a>
      </div>
    </header>
  );
}
