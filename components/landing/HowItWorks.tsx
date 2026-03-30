import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Highlighter } from "../magicui/highlighter";
import InView from "./InView";

const steps = [
  {
    number: "01",
    title: "Connect Your Music",
    description:
      "Login with your Spotify account. Securely link your account to Beatcaster to enable real-time song detection.",
    image: "/connect-your-account.png",
    imageAlt: "Step 1: Connect your Spotify account",
  },
  {
    number: "02",
    title: "Customize Your Styles",
    description:
      "Set up your styles. Choose from a variety of clean and modern themes or customize the display.",
    image: "/customize-your-style.png",
    imageAlt: "Step 2: Customize your Beatcaster styles",
  },
  {
    number: "03",
    title: "Add It To Your App",
    description:
      "Add Beatcaster to OBS with a simple copy-and-paste so your stream or recording app shows your current song live.",
    image: "/apply-it-on-your-app.png",
    imageAlt: "Step 3: Add Beatcaster to your streaming app",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title">
      <div
        className="text-center h-44 border-b"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "10px 10px",
        }}
      >
        <InView className="w-full max-w-[56rem] mx-auto border-x h-full flex flex-col gap-2 items-center justify-center bg-background">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h2 id="how-it-works-title" className="text-2xl font-semibold">
            In Three Simple Steps
          </h2>
        </InView>
      </div>
      <div className="flex gap-9 justify-center flex-wrap w-full xl:px-0 px-4 py-10">
        {steps.map((step, index) => (
          <InView
            key={step.number}
            className="w-full max-w-[360px]"
            delay={0.1 + index * 0.1}
            distance={56}
          >
            <Card className="h-full py-10 bg-foreground text-primary-foreground rounded-2xl relative">
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
                  <span>{step.number}</span>
                </div>
                <div className="w-full h-80 relative">
                  <Image
                    src={step.image}
                    fill
                    className="object-contain rounded-2xl p-5"
                    alt={step.imageAlt}
                    sizes="310px"
                  />
                </div>
              </CardContent>
              <CardHeader>
                <h3 className="pb-3 leading-none font-semibold">
                  <Highlighter action="underline" padding={6} color="#ffffff">
                    <span>{step.title}</span>
                  </Highlighter>
                </h3>
                <CardDescription className="text-muted opacity-65">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </InView>
        ))}
      </div>
    </section>
  );
};
export default HowItWorks;
