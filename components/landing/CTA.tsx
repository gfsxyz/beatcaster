import { Highlighter } from "../magicui/highlighter";
import Image from "next/image";
import InView from "./InView";
import LandingSignInButton from "./LandingSignInButton";

const CTA = () => {
  return (
    <section
      aria-labelledby="cta-title"
      className="w-full max-w-7xl mx-auto border-x"
      style={{
        backgroundImage:
          "radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
        backgroundSize: "10px 10px",
      }}
    >
      <div className="w-full max-w-6xl border-x mx-auto py-16 xl:px-0 px-4">
        <InView
          className="w-full rounded-2xl bg-foreground min-h-96 shadow-lg"
          distance={56}
          style={{
            backgroundImage: `
        radial-gradient(circle at 20% 80%, oklch(0.4495 0.0486 39.211) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, oklch(0.3 0.0358 30.2042) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, oklch(0.4495 0.0486 39.211) 0%, transparent 50%)`,
          }}
        >
          <div className="flex flex-col gap-4 items-center justify-center py-20">
            <InView delay={0.05}>
              <div className="py-4 px-[18px] rounded-full bg-primary w-fit">
                <Image
                  src={"/svg/logo-light.svg"}
                  alt="Beatcaster logo"
                  width={24}
                  height={28}
                />
              </div>
            </InView>
            <InView
              delay={0.12}
              className="text-primary-foreground text-center space-y-4 py-6 md:px-0 px-6"
            >
              <h2 id="cta-title" className="text-4xl font-semibold">
                Ready to&nbsp;
                <Highlighter
                  color="oklch(0.8952 0.0504 146.0366)"
                  action="underline"
                >
                  <span className="text-accent">elevate</span>
                </Highlighter>
                &nbsp; your video?
              </h2>
              <p>
                Add a dynamic &quot;Now Playing&quot; display to your live
                streams and video recordings.
              </p>
            </InView>
            <InView delay={0.2}>
              <LandingSignInButton
                size="lg"
                label="Get Started, It's free"
                className="border-primary"
                arrow
              />
            </InView>
          </div>
        </InView>
      </div>
    </section>
  );
};
export default CTA;
