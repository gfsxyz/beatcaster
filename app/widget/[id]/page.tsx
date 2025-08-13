"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { use } from "react";
import MarqueeText from "@/components/MarqueeText";
import { WidgetSettings } from "@/types/types";
import { FONT_VARIABLES } from "@/lib/font_variables";
import ProtectedWidgetContainer from "@/components/ProtectedWidgetContainer";

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
    <ProtectedWidgetContainer>
      <AnimatePresence mode="wait">
        <motion.div
          key={data.item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: `var(${FONT_VARIABLES[widgetSettings.font]})`,
            padding: "1rem",
          }}
        >
          <div
            id="widget-container"
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            {widgetSettings.show_album_cover && (
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={data.item.album.images[0]?.url}
                alt="Album Cover"
                width={184}
                height={184}
                id="widget-album-cover"
                style={{ paddingTop: 12 }}
              />
            )}
            <div
              id="content-container"
              style={{
                width: 550,
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "0.75rem",
                textShadow:
                  "0px 1px 1px rgba(0, 0, 0, 0.6), 0px 2px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              {widgetSettings.show_title && (
                <motion.div
                  id="widget-title"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{
                    fontSize: "3.25rem",
                    color: "#ffffff",
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
                  <MarqueeText text={data.item.name} maxTextWidth={550} />
                </motion.div>
              )}
              {widgetSettings.show_artist && (
                <motion.div
                  id="widget-artists"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  style={{
                    fontSize: "2.25rem",
                    color: "#e5e7eb", //gray 200
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
                  <MarqueeText
                    text={data.item.artists.map((a) => a.name).join(", ")}
                    maxTextWidth={550}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </ProtectedWidgetContainer>
  );
}
