"use client";

import { useEffect, useRef, useState } from "react";
import { FeedScreen, QAScreen, ReminderScreen, TicketScreen } from "./PhoneScreens";
import { useI18n } from "@/i18n/I18nProvider";

const screens = [FeedScreen, QAScreen, TicketScreen, ReminderScreen];

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-[9/19] w-full max-w-[19rem] rounded-[2.8rem] bg-night p-[10px] shadow-lift ring-1 ring-white/10 ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-surface">
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-night" aria-hidden />
        <div className="h-full pt-8">{children}</div>
      </div>
    </div>
  );
}

/** Desktop: text chapters scroll past a sticky phone. Phones: a swipeable carousel with synced dots. */
export function AttendeeChapters() {
  const { t } = useI18n();
  const chapters = t.attendee.chapters;
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const track = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLLIElement | null)[]>([]);

  // Desktop: which chapter is in the middle of the screen.
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

  // Mobile: which slide is centred in the carousel.
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSlide(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { root, threshold: 0.6 },
    );
    slides.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = slides.current[i];
    const root = track.current;
    if (el && root) root.scrollTo({ left: el.offsetLeft - root.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="attendee-title" className="overflow-x-clip bg-paper py-20 sm:py-36">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8">
        <h2
          id="attendee-title"
          className="max-w-[44rem] text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98] text-ink"
          data-reveal
        >
          {t.attendee.t1} <span className="text-brand">{t.attendee.t2}</span>
        </h2>

        {/* Phones and small tablets */}
        <div className="lg:hidden">
          <div
            ref={track}
            className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
            aria-roledescription="carousel"
            data-lenis-prevent-wheel
          >
            <ul className="flex gap-4">
              {chapters.map((c, i) => {
                const Screen = screens[i] ?? FeedScreen;
                return (
                  <li
                    key={c.title}
                    ref={(el) => {
                      slides.current[i] = el;
                    }}
                    data-index={i}
                    aria-roledescription="slide"
                    aria-label={`${i + 1} / ${chapters.length}`}
                    className="w-[82vw] max-w-[24rem] shrink-0 snap-center rounded-[var(--radius-panel)] bg-tint p-5 sm:p-6"
                  >
                    <h3 className="text-[1.35rem] font-extrabold leading-[1.08] text-ink">{c.title}</h3>
                    <p className="mt-2.5 text-[0.98rem] leading-relaxed text-mute">{c.body}</p>
                    <div className="mt-6">
                      <Phone className="max-w-[14.5rem]">
                        <Screen />
                      </Phone>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label={t.attendee.swipe}>
            {chapters.map((c, i) => (
              <button
                key={c.title}
                type="button"
                role="tab"
                aria-selected={slide === i}
                aria-label={c.title}
                onClick={() => goTo(i)}
                className="grid h-8 w-8 place-items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-out-expo)] ${
                    slide === i ? "w-7 bg-brand" : "w-2 bg-line"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="mt-8 hidden gap-24 lg:grid lg:grid-cols-[1fr_minmax(0,26rem)]">
          <div>
            {chapters.map((c, i) => (
              <div
                key={c.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[80vh] flex-col justify-center"
              >
                <div
                  className={`max-w-[30rem] transition-opacity duration-700 ease-[var(--ease-out-expo)] ${
                    active === i ? "opacity-100" : "opacity-30"
                  }`}
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
              </div>
            ))}
          </div>

          <div>
            <div className="sticky top-[calc(50vh-20rem)]">
              <div className="relative">
                <div className="absolute -inset-x-10 inset-y-16 -z-10 rounded-[3rem] bg-tint" aria-hidden />
                <Phone>
                  <div className="relative h-full">
                    {screens.map((Screen, i) => (
                      <div
                        key={i}
                        aria-hidden={active !== i}
                        className={`absolute inset-0 transition-[opacity,transform,filter] duration-700 ease-[var(--ease-out-expo)] ${
                          active === i ? "opacity-100 blur-0" : "pointer-events-none translate-y-4 opacity-0 blur-sm"
                        }`}
                      >
                        <Screen />
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
