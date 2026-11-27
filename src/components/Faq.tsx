import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper pb-24 sm:pb-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="faq-title" className="text-[clamp(2.05rem,7vw,4.1rem)] font-extrabold leading-[0.98] text-ink lg:sticky lg:top-28" data-reveal>
            Questions,
            <br />
            answered.
          </h2>
        </div>
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line" data-reveal>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[1.15rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-brand-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tint text-brand transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45">
                  <Plus className="h-4 w-4" aria-hidden />
                </span>
              </summary>
              <p className="max-w-[40rem] pb-7 pr-12 text-[1.02rem] leading-relaxed text-mute">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
