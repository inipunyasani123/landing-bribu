import { Inter_Tight, Inter } from "next/font/google";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import "./globals.css";

const interTight = Inter_Tight({ variable: "--font-intertight", subsets: ["latin"], weight: ["600", "700", "800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const __jsonld = {"@context":"https://schema.org","@type":"Organization","name":"Bribu","description":"Papan brief desain dengan tiga sketsa yang dibayar","url":"https://landing-bribu.pintuweb.id","inLanguage":"id"};

export const metadata = {
  metadataBase: new URL("https://landing-bribu.pintuweb.id"),
  title: { default: "Bribu — Papan Brief Desain, Tiga Sketsa yang Dibayar", template: "%s — Bribu" },
  description: "Bribu: pasang brief desain, kurator memilih tiga desainer, dan ketiganya dibayar untuk satu sketsa. Anda memilih satu arah untuk diselesaikan — logo, kemasan, media sosial, ilustrasi.",
  applicationName: "Bribu",
  keywords: ["jasa desain logo", "brief desain", "desain kemasan", "templat media sosial", "desainer grafis indonesia"],
  authors: [{ name: "Bribu" }],
  creator: "Bribu",
  publisher: "Bribu",
  alternates: { canonical: "https://landing-bribu.pintuweb.id" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://landing-bribu.pintuweb.id",
    siteName: "Bribu",
    title: { default: "Bribu — Papan Brief Desain, Tiga Sketsa yang Dibayar", template: "%s — Bribu" },
    description: "Bribu: pasang brief desain, kurator memilih tiga desainer, dan ketiganya dibayar untuk satu sketsa. Anda memilih satu arah untuk diselesaikan — logo, kemasan, media sosial, ilustrasi.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Bribu — Papan Brief Desain, Tiga Sketsa yang Dibayar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: { default: "Bribu — Papan Brief Desain, Tiga Sketsa yang Dibayar", template: "%s — Bribu" },
    description: "Bribu: pasang brief desain, kurator memilih tiga desainer, dan ketiganya dibayar untuk satu sketsa. Anda memilih satu arah untuk diselesaikan — logo, kemasan, media sosial, ilustrasi.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${interTight.variable} ${inter.variable} antialiased`}>
        <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-board focus:px-4 focus:py-2 focus:text-chalk">Lompat ke konten</a>
        <SiteHeader />
        <div id="konten">{children}</div>
        <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
