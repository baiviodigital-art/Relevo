import type { Metadata, Viewport } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TransitionProvider } from "@/components/motion/TransitionProvider";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Relevo · Servicios para viviendas vacacionales en Canarias", template: "%s · Relevo" },
  description: site.description,
  applicationName: "Relevo",
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: "Relevo",
    title: "Relevo · Tu vivienda. Nuestro relevo.",
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: "Relevo · Tu vivienda. Nuestro relevo.", description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#03203D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${manrope.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#contenido"
          className="sr-only z-[200] bg-scarlet px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <TransitionProvider>
          <Navbar />
          <main id="contenido" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  );
}
