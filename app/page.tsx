import SpotifyLoginButton from "@/components/SpotifyLoginButton";
import { BarChart } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden bg-neutral-100">
      <div className="text-center max-w-4xl mx-auto z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Never let your viewers ask <br />
          <span className="text-emerald-400">
            &#34;what song is this?&#34;
          </span>{" "}
          again.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto">
          Beatcaster effortlessly displays your currently playing Spotify song
          as a stylish, customizable overlay for your OBS streams and
          recordings. No more typing song names in chat!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <SpotifyLoginButton label="Get Started - It's Free" />
        </div>
      </div>

      <div className="mt-16 w-full max-w-md z-10">
        <p className="text-center text-sm text-gray-500 mb-2">
          - Example Overlay -
        </p>
        <div className="relative rounded-lg border border-gray-300 bg-gray-300/50 p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-md bg-gray-200 flex-shrink-0">
              <Image
                src="https://upload.wikimedia.org/wikipedia/id/e/e6/The_Weeknd_-_Blinding_Lights.png"
                alt="Album Art for Blinding Lights by The Weeknd"
                className="h-full w-full object-cover rounded-md"
                width={160}
                height={160}
              />
            </div>
            <div className="overflow-hidden flex-grow">
              <p className="font-bold text-black truncate">Blinding Lights</p>
              <p className="text-sm text-gray-700 truncate">The Weeknd</p>
            </div>
            <BarChart className="h-6 w-6 text-emerald-400 animate-pulse flex-shrink-0" />
          </div>
        </div>
      </div>
    </main>
  );
}
