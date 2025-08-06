"use client";

import { Combobox } from "./Combobox";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { CheckCheck, Copy } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

const GAME_OVERVIEW = [
  { value: "genshin_impact", label: "Genshin Impact", image: "/genshin.png" },
  {
    value: "marve_rivals",
    label: "Marvel Rivals",
    image: "/marvel-rivals.png",
  },
  { value: "valorant", label: "Valorant", image: "/valorant.png" },
];

const OPTIONS_SIZE = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const WIDGET_URL = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/widget`
  : "http://127.0.0.1:3000/widget";
const CLIPBOARD_TIME_RESET = 2000;

const sizeStyles = {
  small: {
    maxWidth: "max-w-xs",
    fontSize: 12,
    imageSize: 32,
    title: "font-bold text-base",
    artist: "text-xs",
  },
  medium: {
    maxWidth: "max-w-md",
    fontSize: 16,
    imageSize: 48,
    title: "font-bold text-lg",
    artist: "text-sm",
  },
  large: {
    maxWidth: "max-w-2xl",
    fontSize: 22,
    imageSize: 72,
    title: "font-bold text-2xl",
    artist: "text-lg",
  },
};

const Overview = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [show_title, setShowTitle] = useState(true);
  const [show_artist, setShowArtist] = useState(true);
  const [show_album_cover, setShowAlbumCover] = useState(true);
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [selectedGameValue, setSelectedGameValue] = useState(
    GAME_OVERVIEW[0].value
  );

  // Get the widget ID from the session
  const widgetId = session?.user?.widgetId;
  const dynamicWidgetUrl = `${WIDGET_URL}/${widgetId}`;

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/widget/${widgetId}/settings`);
      const data = await response.json();
      setShowTitle(data.show_title);
      setShowArtist(data.show_artist);
      setShowAlbumCover(data.show_album_cover);
      setSize(data.size);
      setIsLoading(false);
    };

    if (session) {
      fetchSettings();
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;

    const handler = setTimeout(() => {
      const updateSettings = async () => {
        console.log("🚀 Sending update to API..."); // Tambahkan log untuk debugging
        await fetch(`/api/widget/${widgetId}/settings`, {
          method: "POST",
          body: JSON.stringify({
            show_title,
            show_artist,
            show_album_cover,
            size,
          }),
        });
      };

      updateSettings();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [show_title, show_artist, show_album_cover, size, session]);

  const selectedGameData =
    GAME_OVERVIEW.find((game) => game.value === selectedGameValue) ??
    GAME_OVERVIEW[0];

  const selectedSizeStyle = sizeStyles[size];

  const handleCopy = () => {
    navigator.clipboard.writeText(dynamicWidgetUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), CLIPBOARD_TIME_RESET);
    });
  };

  if (isLoading) {
    return <Skeleton className="w-full h-[56rem] rounded-lg" />;
  }
  return (
    <>
      <div className="space-y-6 mx-auto">
        <h2 className="font-semibold text-lg">Options</h2>
        <div className="flex gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="Title"
                checked={show_title}
                onCheckedChange={(value) => setShowTitle(Boolean(value))}
              />
              <Label htmlFor="Title">Title</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="Artists"
                checked={show_artist}
                onCheckedChange={(value) => setShowArtist(Boolean(value))}
              />
              <Label htmlFor="Artists">Artists</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="AlbumCover"
                checked={show_album_cover}
                onCheckedChange={(value) => setShowAlbumCover(Boolean(value))}
              />
              <Label htmlFor="AlbumCover">Album Cover</Label>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex items-center space-x-2 -mb-2.5">
              <Label>Size: </Label>
              <Combobox
                options={OPTIONS_SIZE}
                hideSearch
                value={size}
                onValueChange={(value) =>
                  setSize(value as "small" | "medium" | "large")
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 w-fit mx-auto">
        <Combobox
          options={GAME_OVERVIEW}
          hideSearch
          defaultValue={GAME_OVERVIEW[0].value}
          onValueChange={setSelectedGameValue}
        />

        <div className="relative w-96 h-96 mx-auto">
          <Image
            alt="game overview"
            width="360"
            height="360"
            className="w-96 h-96 object-cover rounded-lg shadow-sm ring-2 ring-muted-foreground border-2 border-transparent"
            src={selectedGameData.image}
          />
          {/* Music Player Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none">
            <div
              className={`rounded-lg p-4 text-white text-shadow-sm space-y-2 ${selectedSizeStyle.maxWidth}`}
              style={{
                fontSize: selectedSizeStyle.fontSize,
              }}
            >
              {show_album_cover && (
                <div className="flex items-center gap-3">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/id/e/e6/The_Weeknd_-_Blinding_Lights.png"
                    alt="Album Cover"
                    width={selectedSizeStyle.imageSize}
                    height={selectedSizeStyle.imageSize}
                    className="rounded ring-2 ring-white/50 mr-2"
                  />
                  <div className="flex flex-col">
                    {show_title && (
                      <span className={selectedSizeStyle.title}>
                        Song Title
                      </span>
                    )}
                    {show_artist && (
                      <span className={selectedSizeStyle.artist}>
                        Artist Name
                      </span>
                    )}
                  </div>
                </div>
              )}
              {!show_album_cover && (
                <>
                  {show_title && (
                    <div className={selectedSizeStyle.title}>Song Title</div>
                  )}
                  {show_artist && (
                    <div className={selectedSizeStyle.artist}>Artist Name</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Input
            value={dynamicWidgetUrl}
            readOnly
            placeholder="Login to get your widget URL"
          />
          <Button
            size={"sm"}
            onClick={handleCopy}
            className="min-w-[6rem]"
            disabled={!session?.user?.widgetId}
          >
            {isCopied ? (
              <CheckCheck className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </>
  );
};
export default Overview;
