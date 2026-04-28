import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALVA 15 — Your Personalized 30-Day Health Plan",
  description: "A personalized 30-day health plan for women 40–60. Improve energy, reduce stress and feel like yourself again — in just 15 minutes a day.",
  openGraph: {
    title: "ALVA 15 — Your Personalized 30-Day Health Plan",
    description: "Designed for women 40–60. Simple daily routines tailored to you.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
