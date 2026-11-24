import type { Metadata, Viewport } from "next";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { cities } from "@/data/cities";
import { packs } from "@/data/pricing";
import { siteUrl } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-jakarta", display: "swap" });
const archivo = Archivo({ subsets: ["latin", "latin-ext"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Biuro rachunkowe E-Numerika – księgowość online i w Szczecinie", template: "%s | E-Numerika" },
  description: "Biuro rachunkowe E-Numerika: księgowość JDG i spółek z o.o., kadry i płace, sprawozdania. Online w całej Polsce i stacjonarnie pod Szczecinem. Od 200 zł netto.",
  applicationName: site.name,
  formatDetection: { telephone: false },
  ...(process.env.NEXT_PUBLIC_NOINDEX === "1" ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = { themeColor: "#003366" };

const organization = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${siteUrl}/#firma`,
  name: site.legalName,
  url: siteUrl,
  logo: `${siteUrl}/logo-512.png`,
  image: `${siteUrl}/og-default.jpg`,
  telephone: site.phone,
  email: site.email,
  taxID: site.nip,
  priceRange: `od ${packs.jdg[0].price} zł netto / mies.`,
  address: { "@type": "PostalAddress", streetAddress: site.street, postalCode: site.postal, addressLocality: site.city, addressRegion: site.region, addressCountry: "PL" },
  areaServed: [...cities.map((c) => ({ "@type": "City", name: c.name })), { "@type": "Country", name: "Polska" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${jakarta.variable} ${archivo.variable}`}>
      <body>
        <a href="#tresc" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white">
          Przejdź do treści
        </a>
        <Header />
        <main id="tresc">{children}</main>
        <Footer />
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
