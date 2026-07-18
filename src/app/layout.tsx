import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import { StructuredData } from "@/components/system/structured-data";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TRYON — AI Virtual Try-On",
    template: "%s | TRYON",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/" },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "TRYON — AI Virtual Try-On",
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "TRYON — AI Virtual Try-On" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRYON — AI Virtual Try-On",
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StructuredData
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: absoluteUrl("/icon"),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.productName,
              url: siteConfig.url,
              inLanguage: siteConfig.language,
              description: siteConfig.description,
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: siteConfig.productName,
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              url: siteConfig.url,
              description: siteConfig.description,
            },
          ]}
        />
        <a className="skip-link" href="#main-content">Saltar al contenido</a>
        <div className="site-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
