import Image from "next/image";
import portrait from "../../public/images/portrait-orange-blazer.jpg";
import { WaitlistForm } from "./WaitlistForm";

export function FinalCta() {
  return (
    <section id="early-access" aria-labelledby="cta-title" className="bg-paper px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="on-ink relative mx-auto grid max-w-[90rem] grid-cols-1 overflow-hidden rounded-[36px] bg-ink text-white lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-24 lg:px-16 xl:px-20">
          <h2 id="cta-title" className="text-[clamp(2.1rem,7.2vw,4.4rem)] font-extrabold leading-[0.98]" data-reveal>
            Be first in when
            <br />
            <span className="text-brand">Lykpass opens.</span>
          </h2>
          <p className="mt-5 max-w-[30rem] text-[1.1rem] leading-relaxed text-mute-on-ink" data-reveal>
            We’re letting people in a few at a time. Tell us whether you go to events or run them, and we’ll send your
            invite when it’s ready.
          </p>
          <div className="mt-9" data-reveal>
            <WaitlistForm tone="on-brand" withRole />
          </div>
        </div>
        <div className="relative min-h-[24rem] bg-brand lg:min-h-[40rem]">
          <Image
            src={portrait}
            alt="A smiling woman in an orange blazer standing against a pale wall"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            className="object-cover object-[50%_20%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/0 lg:to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
