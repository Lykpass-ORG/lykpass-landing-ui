"use client";

import { useEffect, useRef, useState } from "react";
import { FeedScreen, QAScreen, ReminderScreen, TicketScreen } from "./PhoneScreens";

const chapters = [
  {
    id: "feed",
    title: "A feed that knows your weekend.",
    body: "Save a few events and Lykpass learns your taste. Every pick says why it’s there. It only personalizes if you say yes, and you can reset it anytime.",
    Screen: FeedScreen,
  },
  {
    id: "qa",
    title: "Ask the event anything.",
    body: "Parking, dress code, age limits, door times. Answers come from the event’s own details, so you’re not stuck digging through a flyer.",
    Screen: QAScreen,
  },
  {
    id: "ticket",
    title: "Tickets that bend with your plans.",
    body: "Send a ticket to a friend in two taps. Ask about refunds and get the event’s actual policy, plus help filing a request. You confirm every step.",
    Screen: TicketScreen,
  },
  {
    id: "remind",
    title: "Reminders that show up on time.",
    body: "A nudge when it’s time to head out, your tickets ready for the gate, and a heads-up when doors open. Capped, so it never turns into noise.",
    Screen: ReminderScreen,
  },
];

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-[9/19] w-full max-w-[19rem] rounded-[2.8rem] bg-ink p-[10px] shadow-lift ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-white">
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" aria-hidden />
        <div className="h-full pt-8">{children}</div>
      </div>
    </div>
  );
}

export function AttendeeChapters() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="attendee-title" className="bg-paper py-24 sm:py-36">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <h2
          id="attendee-title"
          className="max-w-[44rem] text-[clamp(2.3rem,5vw,4.1rem)] font-extrabold leading-[0.98] text-ink"
          data-reveal
        >
          Everything after <span className="text-brand">“I’m going.”</span>
        </h2>

        <div className="mt-16 grid gap-16 lg:mt-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-24">
          <div>
            {chapters.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="flex flex-col justify-center gap-10 py-8 lg:min-h-[80vh] lg:py-0"
              >
                <div
                  className={`transition-opacity duration-700 ease-[var(--ease-out-expo)] lg:max-w-[30rem] ${
                    active === i ? "lg:opacity-100" : "lg:opacity-30"
                  }`}
                  data-reveal
                >
                  <div className="mb-5 h-[3px] w-full max-w-[12rem] overflow-hidden rounded-full bg-line" aria-hidden>
                    <div
                      className={`h-full rounded-full bg-brand transition-[width] duration-1000 ease-[var(--ease-out-expo)] ${
                        active >= i ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                  <h3 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.05] text-ink">{c.title}</h3>
                  <p className="mt-4 text-[1.08rem] leading-relaxed text-mute">{c.body}</p>
                </div>
                <div className="lg:hidden" data-reveal>
                  <Phone className="max-w-[17rem]">
                    <c.Screen />
                  </Phone>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-19.5rem)]">
              <div className="relative">
                <div className="absolute -inset-x-10 inset-y-16 -z-10 rounded-[3rem] bg-tint" aria-hidden />
                <Phone>
                  <div className="relative h-full">
                    {chapters.map((c, i) => (
                      <div
                        key={c.id}
                        aria-hidden={active !== i}
                        className={`absolute inset-0 transition-[opacity,transform,filter] duration-700 ease-[var(--ease-out-expo)] ${
                          active === i ? "opacity-100 blur-0" : "pointer-events-none translate-y-4 opacity-0 blur-sm"
                        }`}
                      >
                        <c.Screen />
                      </div>
                    ))}
                  </div>
                </Phone>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
