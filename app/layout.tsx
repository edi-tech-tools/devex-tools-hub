import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevEx Tools — Curated by Isle Works",
  description:
    "Developer tool reviews and comparisons, curated by the Isle Works engineering team in Stuttgart. Robotics, DevOps, and developer experience expertise.",
  keywords: [
    "developer tools",
    "DevEx",
    "dev tools",
    "Isle Works",
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
    siteName: "DevEx Tools — Isle Works",
    title: "DevEx Tools — Curated by Isle Works",
    description:
      "Developer tool reviews and comparisons, curated by the Isle Works engineering team.",
    url: "https://devex-tools.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevEx Tools — Curated by Isle Works",
    description:
      "Developer tool reviews and comparisons, curated by the Isle Works engineering team.",
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
        {children}
      </body>
    </html>
  );
}
