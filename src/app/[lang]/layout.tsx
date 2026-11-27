import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localeMeta, locales } from "@/i18n/config";
import { site } from "@/lib/site";
import "../globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: "%s · Lykpass" },
    description: t.meta.description,
    keywords: site.keywords,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    category: "events",
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: localeMeta[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeMeta[l].og),
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1715" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: applies the saved or system theme (no flash) and enables reveal motion.
const bootScript = `(function(){var d=document.documentElement;try{var s=localStorage.getItem('theme');var dark=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;d.dataset.theme=dark?'dark':'light'}catch(e){d.dataset.theme='light'}d.classList.add('js-motion')})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/${lang}`,
        name: site.name,
        description: t.meta.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: lang,
      },
      {
        "@type": "SoftwareApplication",
        name: site.name,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web, iOS, Android",
        description: t.meta.description,
        inLanguage: lang,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <html lang={lang} className={`${display.variable} ${body.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <SmoothScroll />
        <I18nProvider t={t} locale={lang}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
