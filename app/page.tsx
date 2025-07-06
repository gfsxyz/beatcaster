import { MicVocal } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto z-10">
        <div className="text-4xl text-rose-500">TEST CI CD</div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Never let your viewers ask <br />
          <span className="text-emerald-400">
            &#34;what song is this?&#34;
          </span>{" "}
          again.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Beatcaster effortlessly displays your currently playing Spotify song
          as a stylish, customizable overlay for your OBS streams and
          recordings. No more typing song names in chat!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#getting-started"
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get Started - It&apos;s Free
          </a>
          <a
            href="#learn-more"
            className="inline-flex items-center justify-center rounded-md border border-gray-600 bg-transparent px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="mt-16 w-full max-w-md z-10">
        <p className="text-center text-sm text-gray-500 mb-2">
          - Example Overlay -
        </p>
        <div className="relative rounded-lg border border-gray-700 bg-gray-800/50 p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-md bg-gray-700 flex-shrink-0">
              <Image
                src="https://upload.wikimedia.org/wikipedia/id/e/e6/The_Weeknd_-_Blinding_Lights.png"
                alt="Album Art for Blinding Lights by The Weeknd"
                className="h-full w-full object-cover rounded-md"
                width={160}
                height={160}
              />
            </div>
            <div className="overflow-hidden flex-grow">
              <p className="font-bold text-white truncate">Blinding Lights</p>
              <p className="text-sm text-gray-400 truncate">The Weeknd</p>
            </div>
            <MicVocal className="h-6 w-6 text-green-400 animate-pulse flex-shrink-0" />
          </div>
        </div>
      </div>
    </main>
  );
}
