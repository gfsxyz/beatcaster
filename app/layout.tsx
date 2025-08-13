import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comicSans = Caveat({
  variable: "--font-comic-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://beatcaster.fun";

export const metadata: Metadata = {
  // Primary SEO tags for search engines
  title: "Beatcaster - Music of the moment",
  description:
    "Add your current played song on your favorite streaming/recording app",

  // Best practice: define a base URL for a full path
  metadataBase: new URL(siteUrl),

  // Open Graph (OG) metadata for social media sharing (Facebook, LinkedIn, etc.)
  openGraph: {
    title: "Beatcaster - Music of the moment",
    description:
      "Add your current played song on your favorite streaming/recording app",
    url: siteUrl, // The canonical URL of your page
    siteName: "Beatcaster",
    images: [
      {
        url: "/og-image.jpg", // The path to your OG image in the public folder
        width: 1200,
        height: 630,
        alt: "A graphic of the Beatcaster app logo and a music player interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata for sharing on X (Twitter)
  twitter: {
    card: "summary_large_image", // This is the recommended card type for images
    title: "Beatcaster - Music of the moment",
    description:
      "Add your current played song on your favorite streaming/recording app",
    images: ["/og-image.jpg"],
    // Optional: Add your Twitter handle for attribution
    // creator: "@yourTwitterHandle",
    // site: "@yourTwitterHandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} ${comicSans.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
