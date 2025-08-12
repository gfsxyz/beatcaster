import { Highlighter } from "../magicui/highlighter";
import SpotifyLoginButton from "../SpotifyLoginButton";
import Image from "next/image";

const CTA = () => {
  return (
    <div
      className="w-full max-w-7xl mx-auto border-x"
      style={{
        backgroundImage:
          "radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
        backgroundSize: "10px 10px",
      }}
    >
      <div className="w-full max-w-6xl border-x mx-auto py-16 xl:px-0 px-4">
        <div
          className="w-full rounded-2xl bg-foreground min-h-96 shadow-lg"
          style={{
            backgroundImage: `
        radial-gradient(circle at 20% 80%, oklch(0.4495 0.0486 39.211) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, oklch(0.3 0.0358 30.2042) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, oklch(0.4495 0.0486 39.211) 0%, transparent 50%)`,
          }}
        >
          <div className="flex flex-col gap-4 items-center justify-center py-20">
            <div className="py-4 px-[18px] rounded-full bg-primary w-fit">
              <Image
                src={"/svg/logo-light.svg"}
                alt="beatcaster logo"
                width={24}
                height={28}
              />
            </div>
            <div className="text-primary-foreground text-center space-y-4 py-6 md:px-0 px-6">
              <h2 className="text-4xl font-semibold">
                Ready to&nbsp;
                <Highlighter
                  color="oklch(0.8952 0.0504 146.0366)"
                  action="underline"
                >
                  <div className="text-accent">elevate</div>
                </Highlighter>
                &nbsp; your video?
              </h2>
              <p>
                Add a dynamic &quot;Now Playing&quot; display to your live
                streams and video recordings
              </p>
            </div>
            <SpotifyLoginButton
              size="lg"
              label="Get Started, It's free"
              className="border-primary"
              arrow
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CTA;
