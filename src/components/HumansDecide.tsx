const levels = [
  { label: "Answers", detail: "Event questions and policy explanations, from approved event data.", who: "AI on its own" },
  { label: "Suggests", detail: "Event copy, prices, campaign drafts. A person edits and approves.", who: "You approve" },
  { label: "Prepares", detail: "A refund request or a saved event, ready for you to confirm.", who: "You confirm" },
  { label: "Tidies", detail: "Reminder timing and result order. Small, logged and reversible.", who: "Logged, reversible" },
  { label: "Never alone", detail: "Payouts, refund approvals, bans, publishing and bulk sends.", who: "People only" },
];

export function HumansDecide() {
  return (
    <section aria-labelledby="humans-title" className="bg-paper py-24 sm:py-36">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="humans-title" className="text-[clamp(2.3rem,5vw,4.1rem)] font-extrabold leading-[0.98] text-ink" data-reveal>
            AI helps.
            <br />
            <span className="text-brand">People decide.</span>
          </h2>
          <p className="max-w-[32rem] text-[1.1rem] leading-relaxed text-mute lg:pb-2" data-reveal>
            The closer something gets to money or people, the less the AI does on its own. Fraud flags and content
            reports land in a human review queue, never an automatic ban.
          </p>
        </div>

        <ol className="mt-16 grid overflow-hidden rounded-[var(--radius-panel)] border border-line lg:grid-cols-5" data-reveal>
          {levels.map((l, i) => {
            const shade = ["bg-white", "bg-tint", "bg-tint-2", "bg-brand text-ink", "bg-ink text-white"][i];
            const sub = i === 4 ? "text-white/75" : i === 3 ? "text-ink/80" : "text-mute";
            return (
              <li
                key={l.label}
                className={`flex flex-col justify-between gap-10 border-line p-6 sm:p-7 lg:min-h-[17rem] ${shade} ${
                  i < levels.length - 1 ? "border-b lg:border-b-0 lg:border-r" : ""
                } ${i >= 3 ? "border-transparent" : ""}`}
              >
                <div>
                  <p className={`text-[0.8rem] font-semibold ${i === 4 ? "text-brand" : i === 3 ? "text-ink" : "text-brand-ink"}`}>
                    {l.who}
                  </p>
                  <h3 className="mt-2 text-[1.45rem] font-extrabold tracking-[-0.03em]">{l.label}</h3>
                </div>
                <p className={`text-[0.95rem] leading-relaxed ${sub}`}>{l.detail}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex justify-between px-2 text-[0.8rem] font-medium text-mute" aria-hidden>
          <span>More AI</span>
          <span>More human</span>
        </div>
      </div>
    </section>
  );
}
