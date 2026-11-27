import Image from "next/image";
import { Check, Megaphone, PenLine, Users, MessageSquareText, Sparkles } from "lucide-react";
import organizer from "../../public/images/organizer-orange.jpg";

const extras = [
  {
    icon: Megaphone,
    title: "Campaigns you sign off",
    body: "Subject lines, copy and audience ideas, drafted for you. Nothing sends until you approve it.",
  },
  {
    icon: Users,
    title: "Know who’ll show up",
    body: "Expected turnout for staffing and scanners, so you plan the gate before the queue forms.",
  },
  {
    icon: MessageSquareText,
    title: "Ask your reports",
    body: "“Which ticket tier sold fastest?” Plain questions, answers from your own sales data.",
  },
];

function ForecastChart() {
  // Sample forecast: tickets sold over 8 weeks, with an estimate band.
  const w = 320;
  const h = 128;
  const low = [4, 18, 40, 70, 104, 142, 186, 220];
  const high = [8, 30, 64, 108, 156, 206, 262, 310];
  const mid = low.map((l, i) => (l + high[i]) / 2);
  const x = (i: number) => (i / (low.length - 1)) * w;
  const y = (v: number) => h - (v / 330) * h;
  const band =
    low.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(high[i])}`).join(" ") +
    " " +
    [...low]
      .map((v, i) => [v, i] as const)
      .reverse()
      .map(([v, i]) => `L${x(i)},${y(v)}`)
      .join(" ") +
    " Z";
  const line = mid.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");

  return (
    <svg viewBox={`0 -6 ${w} ${h + 12}`} className="h-auto w-full" role="img" aria-label="Sample sales forecast rising to between 220 and 310 tickets by event day">
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1="0" x2={w} y1={h * t} y2={h * t} stroke="#ede6e0" strokeWidth="1" />
      ))}
      <path d={band} fill="#ff5709" fillOpacity="0.14" />
      <path d={line} fill="none" stroke="#ff5709" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={x(7)} cy={y(mid[7])} r="4.5" fill="#0e2622" stroke="#ff5709" strokeWidth="2" />
    </svg>
  );
}

export function Organizers() {
  return (
    <section id="organizers" aria-labelledby="org-title" className="bg-tint py-24 sm:py-36">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 id="org-title" className="text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98] text-ink" data-reveal>
            For organizers: one sentence to a <span className="text-brand">ready-to-publish</span> event.
          </h2>
          <p className="max-w-[30rem] text-[1.1rem] leading-relaxed text-mute lg:pb-2" data-reveal>
            Describe the event. Lykpass drafts the page, suggests prices from comparable events and forecasts sales.
            You edit, you approve, you hit publish.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {/* Brief over photo */}
          <div className="relative min-h-[26rem] overflow-hidden rounded-[var(--radius-panel)] bg-ink lg:col-span-5" data-reveal>
            <Image
              src={organizer}
              alt="A smiling organizer in glasses holding a laptop against an orange wall"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" aria-hidden />
            <div className="absolute inset-x-4 bottom-4 rounded-[20px] bg-white p-4 shadow-lift">
              <p className="flex items-center gap-2 text-[0.78rem] font-semibold text-brand-ink">
                <PenLine className="h-3.5 w-3.5" aria-hidden /> Your brief
              </p>
              <p className="mt-1.5 text-[1rem] font-medium leading-snug text-ink">
                Afrobeats brunch for 300 people in Lekki, last Saturday of March, family friendly.
              </p>
            </div>
          </div>

          {/* Draft */}
          <div className="rounded-[var(--radius-panel)] bg-white p-6 shadow-soft sm:p-8 lg:col-span-7" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 text-[0.8rem] font-semibold text-brand-ink">
                <Sparkles className="h-3.5 w-3.5" aria-hidden /> AI draft · review before publishing
              </p>
              <p className="text-[0.8rem] text-mute">Sample</p>
            </div>
            <p className="mt-5 font-[family-name:var(--font-display)] text-[1.9rem] font-extrabold leading-tight tracking-[-0.03em] text-ink">
              Sunday Groove: Afrobeats Brunch
            </p>
            <p className="mt-3 max-w-[38rem] text-[1rem] leading-relaxed text-mute">
              Good food, a live DJ and a garden full of people who came to dance. Bring the kids, there’s a supervised
              play area till 4. Brunch served from noon.
            </p>
            <dl className="mt-6 grid gap-x-6 gap-y-4 border-t border-line pt-6 text-[0.92rem] sm:grid-cols-3">
              <div>
                <dt className="text-mute">Category</dt>
                <dd className="mt-1 font-semibold text-ink">Food & music</dd>
              </div>
              <div>
                <dt className="text-mute">Age guidance</dt>
                <dd className="mt-1 font-semibold text-ink">All ages</dd>
              </div>
              <div>
                <dt className="text-mute">Tags</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {["afrobeats", "brunch", "outdoor", "family"].map((t) => (
                    <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[0.8rem] font-medium text-ink">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Forecast */}
          <div className="rounded-[var(--radius-panel)] bg-white p-6 shadow-soft sm:p-8 lg:col-span-7" data-reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[1.25rem] font-bold tracking-[-0.02em] text-ink">Sales forecast</h3>
              <p className="text-[0.8rem] font-medium text-mute">Estimate · with confidence range</p>
            </div>
            <p className="tabular mt-1 text-[0.95rem] text-mute">
              Likely <span className="font-semibold text-ink">220 – 310 tickets</span> by event day
            </p>
            <div className="mt-6">
              <ForecastChart />
              <div className="tabular mt-2 flex justify-between text-[0.75rem] text-mute">
                <span>8 weeks out</span>
                <span>Event day</span>
              </div>
            </div>
            <p className="mt-4 text-[0.82rem] text-mute">Too little history? It says “insufficient data” instead of guessing.</p>
          </div>

          {/* Pricing */}
          <div className="rounded-[var(--radius-panel)] bg-ink p-6 text-white shadow-soft sm:p-8 lg:col-span-5" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <h3 className="text-[1.25rem] font-bold tracking-[-0.02em]">Suggested price</h3>
            <p className="tabular mt-3 font-[family-name:var(--font-display)] text-[2.4rem] font-extrabold leading-none tracking-[-0.03em] text-brand">
              ₦8,000 – ₦10,000
            </p>
            <p className="mt-2 text-[0.9rem] text-mute-on-ink">Regular tier, based on these similar events:</p>
            <ul className="tabular mt-4 divide-y divide-white/10 text-[0.88rem]">
              {[
                ["Garden Jams Brunch · Lekki", "₦9,000"],
                ["Highlife & Pancakes · Ikoyi", "₦10,000"],
                ["Sunday Social Grill · Ikeja", "₦7,500"],
              ].map(([n, p]) => (
                <li key={n} className="flex justify-between gap-4 py-2.5">
                  <span className="text-white/85">{n}</span>
                  <span className="font-semibold">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 inline-flex items-center gap-2 text-[0.82rem] text-mute-on-ink">
              <Check className="h-4 w-4 text-brand" aria-hidden /> You set the final price.
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-10 sm:grid-cols-3">
          {extras.map((e, i) => (
            <li key={e.title} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
              <e.icon className="h-6 w-6 text-brand" aria-hidden />
              <h3 className="mt-4 text-[1.2rem] font-bold tracking-[-0.02em] text-ink">{e.title}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-mute">{e.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
