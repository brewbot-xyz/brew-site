import { env } from "@/lib/env";
import Providers from "@/lib/providers";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Script from "next/script";
import "overlayscrollbars/overlayscrollbars.css";
import manifest from "./manifest";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Brew",
    template: "%s - Brew",
  },
  metadataBase: new URL("https://brewbot.xyz"),
  description: manifest().description,
  openGraph: {
    locale: "en_US",
    url: "https://brewbot.xyz",
    title: "Brew",
    description: manifest().description,
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
      {env.NEXT_PUBLIC_APP_ENV !== "production" && (
        <head>
          <Script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        </head>
      )}
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground subpixel-antialiased",
          lexend.variable,
          GeistMono.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
