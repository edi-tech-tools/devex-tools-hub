import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";

export const metadata: Metadata = {
  title: "DevEx Tools — Curated by DevEx Tools Team",
  description:
    "Developer tool reviews and comparisons, curated by the DevEx Tools Team in Stuttgart. Robotics, DevOps, and developer experience expertise.",
  keywords: [
    "developer tools",
    "DevEx",
    "dev tools",
    "DevEx Tools Team",
    "developer experience",
    "software reviews",
    "engineering tools",
    "DevOps tools",
    "Stuttgart",
  ],
  metadataBase: new URL("https://devex-tools.net"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevEx Tools — DevEx Tools Team",
    title: "DevEx Tools — Curated by DevEx Tools Team",
    description:
      "Developer tool reviews and comparisons, curated by the DevEx Tools Team.",
    url: "https://devex-tools.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevEx Tools — Curated by DevEx Tools Team",
    description:
      "Developer tool reviews and comparisons, curated by the DevEx Tools Team.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}
