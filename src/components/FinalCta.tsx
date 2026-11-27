"use client";

import Image from "next/image";
import portrait from "../../public/images/portrait-orange-blazer.jpg";
import { WaitlistForm } from "./WaitlistForm";
import { useI18n } from "@/i18n/I18nProvider";

export function FinalCta() {
  const { t } = useI18n();

  return (
    <section id="early-access" aria-labelledby="cta-title" className="bg-paper px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="on-ink relative mx-auto grid max-w-[90rem] overflow-hidden rounded-[32px] bg-night text-white ring-1 ring-white/5 sm:rounded-[36px] lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10 flex min-w-0 flex-col justify-center px-5 py-14 sm:px-12 sm:py-24 lg:px-16 xl:px-20">
          <h2 id="cta-title" className="text-[clamp(2.1rem,7.2vw,4.4rem)] font-extrabold leading-[0.98]" data-reveal>
            {t.cta.t1}
            <br />
            <span className="text-brand">{t.cta.t2}</span>
          </h2>
          <p className="mt-5 max-w-[30rem] text-[1.05rem] leading-relaxed text-mute-on-ink sm:text-[1.1rem]" data-reveal>
            {t.cta.body}
          </p>
          <div className="mt-8 sm:mt-9" data-reveal>
            <WaitlistForm withRole />
          </div>
        </div>
        <div className="relative min-h-[22rem] bg-brand lg:min-h-[40rem]">
          <Image
            src={portrait}
            alt={t.cta.imgAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            loading="eager"
            className="object-cover object-[50%_20%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/0 to-transparent lg:bg-gradient-to-r lg:from-night lg:via-night/0 lg:to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
