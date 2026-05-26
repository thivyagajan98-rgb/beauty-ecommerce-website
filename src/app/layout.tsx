import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomBar from "@/components/MobileBottomBar";

// Single clean modern sans for the whole site (body + display).
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: {
    default: "FACEZ.lk — Sri Lanka's No.1 Authentic Makeup Store",
    template: "%s · FACEZ.lk"
  },
  description:
    "Sri Lanka's No.1 brand bringing authentic makeup since 2015. Charlotte Tilbury, Dior, Huda Beauty, Fenty, Rare Beauty, Maybelline & more — delivered island-wide.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "FACEZ.lk — Authentic Makeup, Sri Lanka",
    description: "Sri Lanka's No.1 brand bringing authentic makeup since 2015.",
    type: "website"
  },
  icons: {
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen bg-white text-ink antialiased">
        <Header />
        <main className="pb-24 lg:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomBar />
      </body>
    </html>
  );
}
