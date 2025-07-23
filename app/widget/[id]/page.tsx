"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { use } from "react";
import MarqueeText from "@/components/MarqueeText";

interface SpotifyData {
  item: {
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string }[];
    };
  };
  is_playing: boolean;
}

async function getCurrentlyPlaying(widgetId: string) {
  const res = await fetch(`/api/widget/${widgetId}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

const POLLING_INTERVAL = 3000;

// Size-based style configurations
const getStyles = (size: string) => ({
  container:
    size === "small" ? "text-xs" : size === "large" ? "text-xl" : "text-base",
  image: {
    width: size === "small" ? 38 : size === "large" ? 72 : 48,
    height: size === "small" ? 38 : size === "large" ? 72 : 48,
  },
  contentContainer: {
    width: size === "small" ? "130px" : size === "large" ? "220px" : "180px",
  },
  title:
    size === "small" ? "text-base" : size === "large" ? "text-2xl" : "text-lg",
  metadata:
    size === "small" ? "text-xs" : size === "large" ? "text-lg" : "text-sm",
});

export default function Widget({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const [data, setData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getCurrentlyPlaying(resolvedParams.id);
      if (JSON.stringify(newData) !== JSON.stringify(data)) {
        setData(newData);
      }
      setIsLoading(false);
    };

    // Initial fetch
    fetchData();

    // Set up polling
    const intervalId = setInterval(fetchData, POLLING_INTERVAL);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [resolvedParams.id]);

  if (isLoading) {
    return null;
  }

  if (!data?.item || !data.is_playing) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.item.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`p-4 ${getStyles(resolvedSearchParams.size).container}`}
      >
        {resolvedSearchParams.cover === "true" ? (
          <div className="flex items-center gap-3">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={data.item.album.images[0]?.url}
              alt="Album Cover"
              width={getStyles(resolvedSearchParams.size).image.width}
              height={getStyles(resolvedSearchParams.size).image.height}
              className="ring-2 ring-white/50"
            />
            <div
              className="space-y-1"
              style={getStyles(resolvedSearchParams.size).contentContainer}
            >
              {resolvedSearchParams.title === "true" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`font-medium overflow-hidden ${
                    getStyles(resolvedSearchParams.size).title
                  }`}
                >
                  {data.item.name.length > 15 ? (
                    <MarqueeText duration={data.item.name.length * 0.45}>
                      {data.item.name}
                    </MarqueeText>
                  ) : (
                    data.item.name
                  )}
                </motion.div>
              )}
              {resolvedSearchParams.artist === "true" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={`text-gray-500 overflow-hidden ${
                    getStyles(resolvedSearchParams.size).metadata
                  }`}
                >
                  {data.item.artists.map((a) => a.name).join(", ").length >
                  15 ? (
                    <MarqueeText
                      duration={
                        data.item.artists.map((a) => a.name).join(", ").length *
                        0.25
                      }
                    >
                      {data.item.artists.map((a) => a.name).join(", ")}
                    </MarqueeText>
                  ) : (
                    data.item.artists.map((a) => a.name).join(", ")
                  )}
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="space-y-1"
            style={getStyles(resolvedSearchParams.size).contentContainer}
          >
            {resolvedSearchParams.title === "true" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`font-medium overflow-hidden ${
                  getStyles(resolvedSearchParams.size).title
                }`}
              >
                <motion.div
                  className="whitespace-nowrap"
                  animate={{
                    x:
                      data.item.name.length > 20
                        ? [0, -(data.item.name.length * 8)]
                        : 0,
                  }}
                  transition={{
                    duration: data.item.name.length * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                >
                  {data.item.name}
                </motion.div>
              </motion.div>
            )}
            {resolvedSearchParams.artist === "true" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={`text-gray-500 overflow-hidden ${
                  getStyles(resolvedSearchParams.size).metadata
                }`}
              >
                <motion.div
                  className="whitespace-nowrap"
                  animate={{
                    x:
                      data.item.artists.map((a) => a.name).join(", ").length >
                      25
                        ? [
                            0,
                            -(
                              data.item.artists.map((a) => a.name).join(", ")
                                .length * 6
                            ),
                          ]
                        : 0,
                  }}
                  transition={{
                    duration:
                      data.item.artists.map((a) => a.name).join(", ").length *
                      0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                >
                  {data.item.artists.map((a) => a.name).join(", ")}
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
