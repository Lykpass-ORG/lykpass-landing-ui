import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { AskDemo } from "@/components/AskDemo";
import { TrustPromise } from "@/components/TrustPromise";
import { AttendeeChapters } from "@/components/AttendeeChapters";
import { PhotoBreak } from "@/components/PhotoBreak";
import { Organizers } from "@/components/Organizers";
import { LiveEvents } from "@/components/LiveEvents";
import { HumansDecide } from "@/components/HumansDecide";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <AskDemo />
        <TrustPromise />
        <AttendeeChapters />
        <PhotoBreak />
        <Organizers />
        <LiveEvents />
        <HumansDecide />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
