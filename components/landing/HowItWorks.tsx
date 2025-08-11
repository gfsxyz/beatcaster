import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Highlighter } from "../magicui/highlighter";

const HowItWorks = () => {
  return (
    <section id="how-it-works">
      <div
        className="text-center h-44 border-b"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "10px 10px",
        }}
      >
        <div className="w-full max-w-[56rem] mx-auto border-x h-full flex flex-col gap-2 items-center justify-center bg-background">
          <h2 className="text-sm font-medium text-primary">How it works</h2>
          <div className="text-2xl font-semibold">In Three Simple Steps</div>
        </div>
      </div>
      <div className="flex gap-9 justify-center flex-wrap w-full xl:px-0 px-4">
        <Card className="w-full max-w-[360px] py-10 bg-foreground text-primary-foreground rounded-2xl relative">
          <div
            className="absolute inset-0 z-0 rounded-2xl animate-pulse"
            style={{
              backgroundImage: `
                    linear-gradient(to right, #6d4c41 1px, transparent 1px),
                    linear-gradient(to bottom, #6d4c41 1px, transparent 1px)
                  `,
              backgroundSize: "96px 96px",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            }}
          />
          <CardContent className="w-full h-full relative">
            <div className="absolute p-4 bg-foreground rounded-full -top-2 -left-2 flex items-center justify-center shadow-md z-10 font-semibold">
              <span>01</span>
            </div>
            <div className="w-full h-80 relative">
              <Image
                src="/connect-your-account.png"
                fill
                className="object-contain rounded-2xl p-5"
                alt="Step 1: Connect to Spotify"
                sizes="310px"
              />
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle className="pb-3">
              <Highlighter action="underline" padding={6} color="#ffffff">
                <h2>Connect Your Music</h2>
              </Highlighter>
            </CardTitle>
            <CardDescription className="text-muted opacity-65">
              Login with your Spotify account. Securely link your account to
              Beatcaster to enable real-time song detection.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full max-w-[360px] py-10 bg-foreground text-primary-foreground rounded-2xl relative">
          <div
            className="absolute inset-0 z-0 rounded-2xl animate-pulse"
            style={{
              backgroundImage: `
                    linear-gradient(to right, #6d4c41 1px, transparent 1px),
                    linear-gradient(to bottom, #6d4c41 1px, transparent 1px)
                  `,
              backgroundSize: "96px 96px",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            }}
          />
          <CardContent className="w-full h-full relative">
            <div className="absolute p-4 bg-foreground rounded-full -top-2 -left-2 flex items-center justify-center shadow-md z-10 font-semibold">
              <span>02</span>
            </div>
            <div className="w-full h-80 relative">
              <Image
                src="/customize-your-style.png"
                fill
                className="object-contain rounded-2xl p-5"
                alt="Step 2: Customize your styles"
                sizes="310px"
              />
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle className="pb-3">
              <Highlighter action="underline" padding={6} color="#ffffff">
                <h2>Customize Your Styles</h2>
              </Highlighter>
            </CardTitle>
            <CardDescription className="text-muted opacity-65">
              Set up your styles. Choose from a variety of clean and modern
              themes or customize the display.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full max-w-[360px] py-10 bg-foreground text-primary-foreground rounded-2xl relative">
          <div
            className="absolute inset-0 z-0 rounded-2xl animate-pulse"
            style={{
              backgroundImage: `
                    linear-gradient(to right, #6d4c41 1px, transparent 1px),
                    linear-gradient(to bottom, #6d4c41 1px, transparent 1px)
                  `,
              backgroundSize: "96px 96px",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            }}
          />
          <CardContent className="w-full h-full relative">
            <div className="absolute p-4 bg-foreground rounded-full -top-2 -left-2 flex items-center justify-center shadow-md z-10 font-semibold">
              <span>03</span>
            </div>
            <div className="w-full h-80 relative">
              <Image
                src="/apply-it-on-your-app.png"
                fill
                className="object-contain rounded-2xl p-5"
                alt="Step 3: Add it to your app"
                sizes="310px"
              />
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle className="pb-3">
              <Highlighter action="underline" padding={6} color="#ffffff">
                <h2>Add It To Your App</h2>
              </Highlighter>
            </CardTitle>
            <CardDescription className="text-muted opacity-65">
              Add to OBS. With a simple copy-and-paste, you can add
              Beatcaster&apos;s real-time display directly into your stream /
              recording app
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};
export default HowItWorks;
