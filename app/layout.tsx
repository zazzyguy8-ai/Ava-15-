import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ALVA 15 — Your Personalized 30-Day Health Plan",
  description:
    "A personalized 30-day health and lifestyle plan for women 40–60. Improve energy, reduce stress, and feel like yourself again — in just 15 minutes a day.",
  openGraph: {
    title: "ALVA 15 — Your Personalized 30-Day Health Plan",
    description:
      "Designed for women 40–60. Simple daily routines tailored to you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
