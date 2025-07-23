"use client";

import { Combobox } from "./Combobox";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { CheckCheck, Copy } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

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

const Overview = () => {
  const { data: session } = useSession();
  const [isCopied, setIsCopied] = useState(false);
  const [isTitleChecked, setIsTitleChecked] = useState(true);
  const [isArtistsChecked, setIsArtistsChecked] = useState(true);
  const [isAlbumCoverChecked, setIsAlbumCoverChecked] = useState(true);
  const [isTimestampChecked, setIsTimestampChecked] = useState(false);
  const [sizeOption, setSizeOption] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [selectedGameValue, setSelectedGameValue] = useState(
    GAME_OVERVIEW[0].value
  );

  const selectedGameData =
    GAME_OVERVIEW.find((game) => game.value === selectedGameValue) ??
    GAME_OVERVIEW[0];

  // Build query params based on state
  const params = new URLSearchParams();
  if (isTitleChecked) params.append("title", "true");
  if (isArtistsChecked) params.append("artist", "true");
  if (isAlbumCoverChecked) params.append("cover", "true");
  if (sizeOption) params.append("size", sizeOption);

  // Get the widget ID from the session
  const widgetId = session?.user?.widgetId;
  const dynamicWidgetUrl = widgetId
    ? `${WIDGET_URL}/${widgetId}?${params.toString()}`
    : "Please login to get your widget URL";

  const handleCopy = () => {
    navigator.clipboard.writeText(dynamicWidgetUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), CLIPBOARD_TIME_RESET);
    });
  };
  return (
    <>
      <div className="space-y-6 mx-auto">
        <h2 className="font-semibold text-lg">Options</h2>
        <div className="flex gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="Title"
                defaultChecked={isTitleChecked}
                onCheckedChange={(value) => setIsTitleChecked(Boolean(value))}
              />
              <Label htmlFor="Title">Title</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="Artists"
                defaultChecked={isArtistsChecked}
                onCheckedChange={(value) => setIsArtistsChecked(Boolean(value))}
              />
              <Label htmlFor="Artists">Artists</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="AlbumCover"
                defaultChecked={isAlbumCoverChecked}
                onCheckedChange={(value) =>
                  setIsAlbumCoverChecked(Boolean(value))
                }
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
                initialValues={sizeOption}
                onValueChange={(value) =>
                  setSizeOption(value as "small" | "medium" | "large")
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
          initialValues={GAME_OVERVIEW[0].value}
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
              className={`rounded-lg p-4 text-white text-shadow-sm space-y-2 ${
                sizeOption === "small"
                  ? "max-w-xs"
                  : sizeOption === "large"
                  ? "max-w-2xl"
                  : "max-w-md"
              }`}
              style={{
                fontSize:
                  sizeOption === "small"
                    ? 12
                    : sizeOption === "large"
                    ? 22
                    : 16,
              }}
            >
              {isAlbumCoverChecked && (
                <div className="flex items-center gap-3">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/id/e/e6/The_Weeknd_-_Blinding_Lights.png"
                    alt="Album Cover"
                    width={
                      sizeOption === "small"
                        ? 32
                        : sizeOption === "large"
                        ? 72
                        : 48
                    }
                    height={
                      sizeOption === "small"
                        ? 32
                        : sizeOption === "large"
                        ? 72
                        : 48
                    }
                    className="rounded ring-2 ring-white/50 mr-2"
                  />
                  <div className="flex flex-col">
                    {isTitleChecked && (
                      <span
                        className={
                          sizeOption === "small"
                            ? "font-bold text-base"
                            : sizeOption === "large"
                            ? "font-bold text-2xl"
                            : "font-bold text-lg"
                        }
                      >
                        Song Title
                      </span>
                    )}
                    {isArtistsChecked && (
                      <span
                        className={
                          sizeOption === "small"
                            ? "text-xs"
                            : sizeOption === "large"
                            ? "text-lg"
                            : "text-sm"
                        }
                      >
                        Artist Name
                      </span>
                    )}
                  </div>
                </div>
              )}
              {!isAlbumCoverChecked && (
                <>
                  {isTitleChecked && (
                    <div
                      className={
                        sizeOption === "small"
                          ? "font-bold text-base"
                          : sizeOption === "large"
                          ? "font-bold text-2xl"
                          : "font-bold text-lg"
                      }
                    >
                      Song Title
                    </div>
                  )}
                  {isArtistsChecked && (
                    <div
                      className={
                        sizeOption === "small"
                          ? "text-xs"
                          : sizeOption === "large"
                          ? "text-lg"
                          : "text-sm"
                      }
                    >
                      Artist Name
                    </div>
                  )}
                </>
              )}
              {isTimestampChecked && (
                <div
                  className={
                    sizeOption === "small"
                      ? "flex items-center gap-2 text-[10px] mt-2"
                      : sizeOption === "large"
                      ? "flex items-center gap-2 text-base mt-2"
                      : "flex items-center gap-2 text-xs mt-2"
                  }
                >
                  <span>01:23</span>
                  <div className="flex-1 h-1 bg-white/30 rounded mx-2">
                    <div
                      className="h-1 bg-white rounded"
                      style={{
                        width:
                          sizeOption === "small"
                            ? "30%"
                            : sizeOption === "large"
                            ? "60%"
                            : "40%",
                      }}
                    />
                  </div>
                  <span>03:45</span>
                </div>
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
