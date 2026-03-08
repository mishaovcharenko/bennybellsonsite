import type { Metadata } from "next";
import { Geist, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-bubble",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Benny Bellson",
  description:
    "Artist world — music, unreleased, history, shows, watch, merch, and more.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Benny Bellson",
    description: "Artist world — music, unreleased, history, shows, watch, merch.",
    type: "website",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benny Bellson",
    description: "Artist world — music, unreleased, history, shows, watch, merch.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=3" />
        <link rel="stylesheet" href="https://use.typekit.net/new-spirit.css" />
      </head>
      <body
        className={`${geistSans.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} antialiased bg-black text-white min-h-screen`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
