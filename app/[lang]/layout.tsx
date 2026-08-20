import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource-variable/noto-kufi-arabic";
import "../globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { getDictionary, hasLocale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const copy = getDictionary(lang);

  const title =
    lang === "ar"
      ? "إسماعيل فكري وشركاه | حلول مالية وقانونية وتطوير أعمال"
      : "Ismail Fekri & Partners | Financial, Legal & Business Advisory";

  const description = copy.hero.supporting;

  return {
    metadataBase: new URL("https://if-sepia.vercel.app"),
    title,
    description,
    keywords:
      lang === "ar"
        ? "استشارات مالية, استشارات قانونية, تطوير أعمال, ضرائب, إعادة هيكلة, تحكيم تجاري, مصر, الإمارات"
        : "financial advisory, legal counsel, business development, tax strategy, restructuring, commercial arbitration, Egypt, UAE",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${lang}`,
      siteName: "Ismail Fekri & Partners",
      locale: lang === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const skipLabel = lang === "ar" ? "انتقل إلى المحتوى الرئيسي" : "Skip to main content";

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body>
        <a href="#top" className="skip-link">
          {skipLabel}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
