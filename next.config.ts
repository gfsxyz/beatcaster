import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://upload.wikimedia.org/wikipedia/id/e/e6/**"),
      new URL("https://i.scdn.co/image/**"),
    ],
  },
};

export default nextConfig;
