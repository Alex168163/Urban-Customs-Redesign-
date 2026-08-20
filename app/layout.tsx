import type { Metadata, Viewport } from "next";
import { Archivo, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";
import ConversionTracking from "@/components/ConversionTracking";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-archivo",
});

const source = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-source",
});

/**
 * The mono face carries eyebrows, phone numbers and spec figures — all small,
 * none of them the LCP element. Left unpreloaded so it stops competing with
 * the hero image for bandwidth on a throttled connection; display:swap means
 * the fallback shows first and the swap is invisible at this size.
 */
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  preload: false,
  variable: "--font-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Flooring Contractors Phoenix, AZ | Urban Customs",
    template: "%s | Urban Customs",
  },
  description: `Flooring installation, refinishing, and kitchen remodeling across the Phoenix Valley. Family-run for ${site.yearsInBusiness} years. Call ${site.phone.display}.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Flooring Contractors Phoenix, AZ | Urban Customs",
    description: `Hardwood, tile, stone, bamboo, refinishing, and full kitchen remodels across the Valley of the Sun. Call ${site.phone.display}.`,
    images: ["/assets/images/interior-stone-installations-in-arizona.jpg"],
  },
  icons: {
    icon: "/assets/staging/urban-customs-favicon.png",
    apple: "/assets/staging/urban-customs-favicon-300x300.png",
  },
};

/**
 * Exactly width=device-width, initial-scale=1 — nothing more.
 * The agency staging build ships maximum-scale=1, user-scalable=0, which
 * blocks pinch zoom and fails WCAG 1.4.4. It is not carried over.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#127B00",
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.tagline,
  url: site.url,
  telephone: site.phone.display,
  email: site.email,
  image: `${site.url}/assets/images/interior-stone-installations-in-arizona.jpg`,
  logo: `${site.url}/assets/logos/urban-customs-new-logo-1200px.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  openingHours: site.hours.schema,
  areaServed: site.serviceAreas.map((a) => ({
    "@type": "City",
    name: `${a}, AZ`,
  })),
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: site.roc,
    recognizedBy: { "@type": "Organization", name: "Arizona Registrar of Contractors" },
  },
  knowsAbout: [
    "Hardwood flooring installation",
    "Natural stone and tile flooring",
    "Bamboo flooring",
    "Hardwood floor refinishing",
    "Hardwood floor repair and restoration",
    "Kitchen remodeling",
    "Cabinet installation",
  ],
  // aggregateRating is deliberately absent. Add it only from real, verifiable
  // review counts the client supplies — fabricated rating data is a penalty
  // and a legal exposure.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${source.variable} ${plex.variable}`}>
      <head>
        {/* Each page marks its own hero as priority, which emits the preload
            for that page's LCP element rather than a shared one. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-green focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCallBar />
        <ConversionTracking />
      </body>
    </html>
  );
}

