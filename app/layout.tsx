import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import CookieBanner from "./components/CookieBanner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "DevEx Tools Hub — Developer Experience Tools & Reviews",
  description:
    "Compare developer tools with verified reviews, pricing breakdowns, and expert comparisons. Find the perfect dev tools, frameworks, APIs, and platforms for your engineering team.",
  keywords: [
    "developer tools",
    "DevEx",
    "dev tools",
    "API tools",
    "developer experience",
    "software reviews",
    "engineering tools",
    "DevOps tools",
  ],
  verification: {
    google: "T5bb4mZivi0CfaYYRiKZLSNIWmhvAX6_RVgDEyonTGo",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevEx Tools Hub",
    title: "DevEx Tools Hub — Developer Experience Tools & Reviews",
    description:
      "Compare developer tools with verified reviews, pricing breakdowns, and expert comparisons.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.className} min-h-screen antialiased`}>
        <div className="aurora-bg" />
        <div className="grid-pattern" />

        <Header />

        <main className="relative z-10">{children}</main>

        <Footer />

        <CookieBanner />
      </body>
    </html>
  );
}
