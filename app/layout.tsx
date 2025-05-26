import type { Metadata } from "next";

import Providers from "@/lib/providers";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { Lexend } from "next/font/google";
import "@/styles/globals.css";
import "overlayscrollbars/overlayscrollbars.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Brew",
    template: `%s - Brew`,
  },
  metadataBase: new URL("https://brewbot.xyz"),
  description: "The best all-in-one bot for keeping your community safe and engaged.",
  openGraph: {
    locale: "en_US",
    url: "https://brewbot.xyz",
    title: "Brew",
    description: "The best all-in-one bot for keeping your community safe and engaged.",
    siteName: "brewbot.xyz",
    images: [
      {
        url: "/assets/brew.png",
        width: 480,
        height: 480,
        alt: "Brew",
      },
    ],
  },
  twitter: {
    card: "player",
    site: "https://brewbot.xyz",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <Script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
      </head> */}
      <body
        className={cn(
          "min-h-screen bg-background text-foreground subpixel-antialiased font-sans",
          lexend.variable,
          GeistMono.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
