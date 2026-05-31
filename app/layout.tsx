import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import CookieBanner from "./components/CookieBanner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "DevEx Tools Hub — Developer Experience Tools & Reviews",
  description:
    "Compare developer tools with verified reviews, pricing breakdowns, and expert comparisons. Find the perfect dev tools, frameworks, APIs, and SaaS for your engineering team.",
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
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={`${spaceGrotesk.className} min-h-screen antialiased`}>
        {/* Background Effects */}
        <div className="aurora-bg" />
        <div className="grid-pattern" />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="relative z-10">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Cookie Consent Banner */}
        <CookieBanner />
      </body>
    </html>
  );
}
