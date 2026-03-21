import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fairfield Bio — The Global Genomic Data Marketplace",
    template: "%s | Fairfield Bio",
  },
  description:
    "Fairfield Bio is building the world's first trusted marketplace for non-human genomic data, unlocking the 99.9% of Earth's species with no genomic sequence.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fairfield Bio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
