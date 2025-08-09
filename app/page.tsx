import Nav from "@/components/landing/Nav";
import SpotifyLoginButton from "@/components/SpotifyLoginButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="px-4 w-full max-w-7xl mx-auto border-x">
        <div className="sr-only">Beatcaster</div>
        <Nav />
      </header>
      <main>
        <div className="w-full max-w-7xl mx-auto border-x min-h-dvh">
          <section id="hero" className="border-b">
            <div className="flex flex-col items-center justify-center gap-8 text-center pt-36 mb-40">
              <h1 className="text-6xl font-bold text-foreground">
                Connect Your <span className="text-primary">Music</span>
                <br />
                to Your Audience
              </h1>
              <p className="text-muted-foreground">
                Seamlessly integrate your current song into your
                <br /> favorite streaming and recording apps with{" "}
                <span className="text-primary">Beatcaster</span>.
              </p>
              <SpotifyLoginButton label="Get Started" size="lg" />
            </div>
          </section>

          <section id="hero-video">
            <div className="w-full max-w-[56rem] mx-auto h-[502px] border-x">
              <div className="bg-foreground rounded-2xl h-full">&nbsp;</div>
            </div>
          </section>

          <div className="border-y h-20">
            <div className="w-full max-w-[56rem] mx-auto border-x h-full" />
          </div>

          <section id="how-it-works">
            <div className="text-center h-44 border-b">
              <div className="w-full max-w-[56rem] mx-auto border-x h-full flex flex-col gap-2 items-center justify-center ">
                <h2 className="text-sm font-medium text-primary">
                  How it works
                </h2>
                <div className="text-2xl font-semibold">
                  In Three Simple Steps
                </div>
              </div>
            </div>
            <div className="flex gap-9 justify-center flex-wrap w-full">
              <Card className="w-full max-w-[360px] py-10 bg-foreground text-primary-foreground rounded-2xl">
                <CardContent className="w-full h-full relative">
                  <div className="absolute p-4 bg-foreground rounded-full -top-2 -left-2 flex items-center justify-center shadow-md z-10 font-semibold text-accent">
                    <span>01</span>
                  </div>
                  <div className="w-full h-72 relative">
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1733817261290-389b086c15ec"
                      }
                      fill
                      className="object-cover rounded-2xl"
                      alt="Step 1: Connect to Spotify"
                    />
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle>Connect Your Music</CardTitle>
                  <CardDescription className="text-muted opacity-65">
                    Login with your Spotify account. Securely link your account
                    to Beatcaster to enable real-time song detection.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="w-full max-w-[360px] py-10 bg-foreground text-primary-foreground rounded-2xl">
                <CardContent className="w-full h-full relative">
                  <div className="absolute p-4 bg-foreground rounded-full -top-2 -left-2 flex items-center justify-center shadow-md z-10 font-semibold text-accent">
                    <span>02</span>
                  </div>
                  <div className="w-full h-72 relative">
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1733817261290-389b086c15ec"
                      }
                      fill
                      className="object-cover rounded-2xl"
                      alt="Step 1: Connect to Spotify"
                    />
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle>Customize Your Look</CardTitle>
                  <CardDescription className="text-muted opacity-65">
                    Set up your styles. Choose from a variety of clean and
                    modern themes or customize the display.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="w-full max-w-[360px] py-10 bg-foreground text-primary-foreground rounded-2xl">
                <CardContent className="w-full h-full relative">
                  <div className="absolute p-4 bg-foreground rounded-full -top-2 -left-2 flex items-center justify-center shadow-md z-10 font-semibold text-accent">
                    <span>03</span>
                  </div>
                  <div className="w-full h-72 relative">
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1733817261290-389b086c15ec"
                      }
                      fill
                      className="object-cover rounded-2xl"
                      alt="Step 1: Connect to Spotify"
                    />
                  </div>
                </CardContent>
                <CardHeader>
                  <CardTitle>Add It To Your App</CardTitle>
                  <CardDescription className="text-muted opacity-65">
                    Add to OBS. With a simple copy-and-paste, you can add
                    Beatcaster's real-time display directly into your stream /
                    recording app
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          <div className="border-y h-28 w-full">
            <div className="w-full h-full mx-auto max-w-6xl border-x" />
          </div>
        </div>

        {/* Features section */}
        <div className="w-full bg-muted">
          <div className="w-full max-w-7xl mx-auto border-x">
            <div className="border-b">
              <div className="w-full max-w-6xl border-x mx-auto">
                <section
                  id="features"
                  className="pt-16 pb-20 mx-auto space-y-10"
                >
                  <div className="flex items-center justify-center gap-2 p-1.5 bg-background rounded-lg w-fit mx-auto shadow-sm">
                    <div className="p-1 bg-primary rounded-lg w-fit">
                      <Image
                        src={Logo}
                        width={17}
                        height={20}
                        alt="Beatcaster logo"
                      />
                    </div>
                    <h2 className="font-bold">Features</h2>
                  </div>
                  <div className="w-full min-h-[372px] bg-background rounded-2xl flex gap-4">
                    <div className="rounded-2xl flex-1/2 relative">
                      <Image
                        src="https://images.unsplash.com/photo-1742995186561-38d69a6d4f99"
                        alt="Features image"
                        fill
                        className="object-cover rounded-2xl shadow-sm"
                      />
                    </div>
                    <div className="flex-1/2 p-6 text-sm text-muted-foreground font-medium flex flex-col items-center justify-center">
                      <ul className="space-y-4">
                        <li>
                          <h3 className="font-bold text-foreground text-base pb-2">
                            Never Miss a Beat, Real-Time Sync
                          </h3>
                          <p>
                            Beatcaster automatically detects and displays your
                            currently playing song in real time. From the moment
                            the first note hits, your audience will know exactly
                            what you're listening to, creating a more engaging
                            experience.
                          </p>
                        </li>
                        <Separator />
                        <li>
                          <h3 className="font-bold text-foreground text-base pb-2">
                            Seamless Integration
                          </h3>
                          <p>
                            Get up and running in minutes. Our app integrates
                            effortlessly with your favorite streaming software,
                            including OBS Studio and Streamlabs
                          </p>
                        </li>
                        <Separator />
                        <li>
                          <h3 className="font-bold text-foreground text-base pb-2">
                            Lightweight
                          </h3>
                          <p>
                            We built Beatcaster to be lightweight and efficient.
                            It runs silently in the background without impacting
                            your computer's performance
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto border-x">
          <div className="w-full max-w-6xl border-x mx-auto py-16">
            <div className="w-full rounded-2xl bg-foreground min-h-96">
              <div className="flex flex-col gap-4 items-center justify-center py-20">
                <div className="py-4 px-[18px] rounded-full bg-primary w-fit">
                  <Image
                    src={Logo}
                    alt="beatcaster logo"
                    width={24}
                    height={28}
                  />
                </div>
                <div className="text-primary-foreground text-center space-y-4 py-6">
                  <h2 className="text-4xl font-semibold">
                    Ready to <span className="text-accent">elevate</span> your
                    video?
                  </h2>
                  <p>
                    Add a dynamic "Now Playing" display to your live streams and
                    video recordings
                  </p>
                </div>
                <SpotifyLoginButton size="lg" label="Get Started, It's free" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full max-w-7xl mx-auto border-x border-t py-4 px-3 text-xs">
        <div className="flex justify-between">
          <div>Beatcaster &copy; 2025</div>
          <div className="space-x-4">
            <Link href="#" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
