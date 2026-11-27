import { Logo } from "./Logo";

const cols = [
  {
    title: "Product",
    links: [
      ["How it works", "#how-it-works"],
      ["For organizers", "#organizers"],
      ["Live events", "#live"],
      ["FAQ", "#faq"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Early access", "#early-access"],
      ["How AI is used", "#humans-title"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto grid max-w-[78rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-relaxed text-mute">
            Find events by saying what you feel like doing. Run them with a co-pilot that never makes things up.
          </p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="font-[family-name:var(--font-body)] text-[0.85rem] font-semibold tracking-normal text-ink">
              {c.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[0.95rem] text-mute transition-colors hover:text-brand-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-[78rem] flex-col gap-2 border-t border-line px-5 py-6 text-[0.82rem] text-mute sm:flex-row sm:justify-between sm:px-8">
        <p>© 2026 Lykpass. All rights reserved.</p>
        <p>Photography via Unsplash.</p>
      </div>
    </footer>
  );
}
