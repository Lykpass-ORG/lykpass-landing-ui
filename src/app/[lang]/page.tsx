import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { AskDemo } from "@/components/AskDemo";
import { MeetBoron } from "@/components/MeetBoron";
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
import { ExpandOnScroll } from "@/components/ExpandOnScroll";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
      >
        {t.nav.skip}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <AskDemo />
        <MeetBoron />
        <ExpandOnScroll>
          <TrustPromise />
        </ExpandOnScroll>
        <AttendeeChapters />
        <PhotoBreak />
        <Organizers />
        <ExpandOnScroll under="bg-tint">
          <LiveEvents />
        </ExpandOnScroll>
        <HumansDecide />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
