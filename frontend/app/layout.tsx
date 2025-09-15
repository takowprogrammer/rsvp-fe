import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ConditionalNavbar from "@/components/ConditionalNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Doris & Emmanuel Wedding",
  description: "Join us in celebrating our special day with beautiful digital invitations and seamless RSVP management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-800">
        <div className="flex flex-col min-h-screen">
          <ConditionalNavbar />
          <main className="flex-grow">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
