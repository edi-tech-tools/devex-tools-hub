import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevEx Tools — Developer Experience Tools & Reviews",
  description:
    "Compare developer tools with verified reviews, pricing breakdowns, and expert comparisons. Find the perfect dev tools for your engineering team.",
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
  metadataBase: new URL("https://devex-tools.net"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevEx Tools",
    title: "DevEx Tools — Developer Experience Tools & Reviews",
    description:
      "Compare developer tools with verified reviews, pricing breakdowns, and expert comparisons.",
    url: "https://devex-tools.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevEx Tools — Developer Experience Tools & Reviews",
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
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
