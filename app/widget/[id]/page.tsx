"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { use } from "react";
import MarqueeText from "@/components/MarqueeText";
import { WidgetSettings } from "@/types/types";
import { FONT_VARIABLES } from "@/lib/font_variables";

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

async function getCurrentUserSettings(widgetId: string) {
  const res = await fetch(`/api/widget/${widgetId}/settings`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

const POLLING_INTERVAL = 3000;

// Size-based style configurations
const getStyles = (size: string) => ({
  container:
    size === "small" ? "text-base" : size === "large" ? "text-3xl" : "text-xl",
  image: {
    width: size === "small" ? 48 : size === "large" ? 92 : 68,
    height: size === "small" ? 48 : size === "large" ? 92 : 68,
  },
  contentContainer: {
    width: size === "small" ? "230px" : size === "large" ? "600px" : "400px",
  },
  title:
    size === "small" ? "text-xl" : size === "large" ? "text-4xl" : "text-2xl",
  metadata:
    size === "small" ? "text-lg" : size === "large" ? "text-2xl" : "text-xl",
});

export default function Widget({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [data, setData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [widgetSettings, setWidgetSettings] = useState<WidgetSettings>();

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getCurrentlyPlaying(resolvedParams.id);
      const settings = await getCurrentUserSettings(resolvedParams.id);
      setWidgetSettings((prevSettings) =>
        JSON.stringify(settings) !== JSON.stringify(prevSettings)
          ? settings
          : prevSettings
      );
      setData((prevData) =>
        JSON.stringify(newData) !== JSON.stringify(prevData)
          ? newData
          : prevData
      );
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

  if (!data?.item || !data.is_playing || !widgetSettings) {
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
        className={`p-4 ${getStyles(widgetSettings.size).container}`}
        style={{ fontFamily: `var(${FONT_VARIABLES[widgetSettings.font]})` }}
      >
        <div className="flex items-center gap-3">
          {widgetSettings.show_album_cover && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={data.item.album.images[0]?.url}
              alt="Album Cover"
              width={getStyles(widgetSettings.size).image.width}
              height={getStyles(widgetSettings.size).image.height}
              className="ring-2 ring-white/50"
            />
          )}
          <div
            className="space-y-1"
            style={getStyles(widgetSettings.size).contentContainer}
          >
            {widgetSettings.show_title && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`text-shadow-md text-gray-100 font-medium overflow-hidden ${
                  getStyles(widgetSettings.size).title
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
            {widgetSettings.show_artist && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={`text-shadow-md text-gray-300 overflow-hidden ${
                  getStyles(widgetSettings.size).metadata
                }`}
              >
                {data.item.artists.map((a) => a.name).join(", ").length > 15 ? (
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
      </motion.div>
    </AnimatePresence>
  );
}
