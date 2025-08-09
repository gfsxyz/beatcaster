import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Beatcaster - Your Music Companion",
  description:
    "Beatcaster effortlessly displays your currently playing Spotify song as a stylish, customizable overlay for your OBS or Streamlab streams and recordings. No more typing song names in chat!",
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
    </html>
  );
}
