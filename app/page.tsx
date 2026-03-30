import type { Metadata } from "next";

import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://beatcaster.fun";
const pageTitle = "Beatcaster | Show Your Current Song On Stream";
const pageDescription =
  "Connect Spotify and add a live now playing widget to OBS, Streamlabs, and recordings with Beatcaster.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Beatcaster",
    "Spotify overlay",
    "OBS now playing widget",
    "Streamlabs music overlay",
    "streaming music display",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/",
    siteName: "Beatcaster",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beatcaster live music overlay preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.jpg"],
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Beatcaster",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description: pageDescription,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Real-time song sync from Spotify",
    "Customizable now playing layouts",
    "Works with OBS Studio and Streamlabs",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <div className="bg-ribbon">
        <header className="px-4 w-full max-w-7xl mx-auto border-x">
          <div className="sr-only">Beatcaster</div>
          <Nav />
        </header>
        <main>
          <div className="w-full max-w-7xl mx-auto border-x">
            <Hero />

            <div className="border-y h-20 bg-muted">
              <div className="w-full max-w-[56rem] mx-auto border-x h-full"></div>
            </div>

            <HowItWorks />

            <div
              className="border-y h-28 w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                backgroundSize: "10px 10px",
              }}
            >
              <div className="w-full h-full mx-auto max-w-6xl border-x" />
            </div>
          </div>

          <Features />

          <CTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
