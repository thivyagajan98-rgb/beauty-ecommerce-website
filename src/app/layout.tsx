import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomBar from "@/components/MobileBottomBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Facez — Authentic Branded Makeup, Sri Lanka",
    template: "%s · Facez"
  },
  description:
    "Facez.lk — curated, 100% authentic branded makeup in Sri Lanka. New & gently used pieces from Charlotte Tilbury, Rare Beauty, MAC, Fenty, Dior and more.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Facez — Authentic Branded Makeup",
    description: "Curated, 100% authentic branded makeup in Sri Lanka.",
    type: "website"
  },
  // icon.svg is auto-detected from /src/app/icon.svg by Next.js.
  // Apple touch icon needs to be wired manually because Next.js's
  // file-convention loader for apple-icon doesn't accept .svg yet.
  icons: {
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased">
        <Header />
        <main className="pb-24 lg:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomBar />
      </body>
    </html>
  );
}
