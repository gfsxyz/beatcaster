import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
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
  );
}
