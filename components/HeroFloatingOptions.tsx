"use client";

import { motion } from "motion/react";
import NowPlaying from "./NowPlaying";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";
import { FontEnum } from "@/types/types";
import { Combobox } from "./Combobox";

const HeroFloatingOptions = () => {
  const [show_title, setShowTitle] = useState(true);
  const [show_artist, setShowArtist] = useState(true);
  const [show_album_cover, setShowAlbumCover] = useState(true);
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [font, setFont] = useState<FontEnum>("default");

  const OPTIONS_SIZE = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const fontOptions: FontEnum[] = ["default", "geistMono", "comicSans"];

  const FONT_STYLES = fontOptions.map((font) => ({
    value: font,
    label:
      font.charAt(0).toUpperCase() + font.slice(1).replace(/([A-Z])/g, " $1"),
  }));

  return (
    <div>
      <div className="rounded-2xl absolute lg:top-60 xl:left-30 left-0 top-30 transition-all">
        <NowPlaying
          show_album_cover={show_album_cover}
          show_artist={show_artist}
          show_title={show_title}
          size={size}
          font={font}
        />
      </div>

      <div className="h-[270px] w-full max-w-[450px] rounded-2xl absolute lg:top-30 xl:right-20 right-0 top-80 transition-all sm:inline-block hidden">
        <motion.div
          className="px-[2rem] pt-6 pb-4 bg-background/80 backdrop-blur-md border border-accent rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="text-lg font-semibold">Options</div>
          <div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 justify-between w-full">
                <Label className="flex-auto py-2" htmlFor="title">
                  Show song title
                </Label>
                <Switch
                  id="title"
                  checked={show_title}
                  onCheckedChange={(value) => setShowTitle(Boolean(value))}
                />
              </div>
              <div className="flex items-center space-x-2 justify-between w-full">
                <Label className="flex-auto py-2" htmlFor="Artists">
                  Artists
                </Label>
                <Switch
                  id="Artists"
                  checked={show_artist}
                  onCheckedChange={(value) => setShowArtist(Boolean(value))}
                />
              </div>
              <div className="flex items-center space-x-2 justify-between w-full">
                <Label className="flex-auto py-2" htmlFor="AlbumCover">
                  Album Cover
                </Label>
                <Switch
                  id="AlbumCover"
                  checked={show_album_cover}
                  onCheckedChange={(value) => setShowAlbumCover(Boolean(value))}
                />
              </div>

              <div className="flex gap-8">
                <div className="space-y-2 py-4">
                  <Label>Font Styles</Label>
                  <Combobox
                    options={FONT_STYLES}
                    hideSearch
                    value={font}
                    onValueChange={(value) =>
                      setFont((value as FontEnum) || font)
                    }
                    buttonClassName="lg:w-44"
                  />
                </div>

                <div className="space-y-2 py-4">
                  <Label>Size</Label>
                  <Combobox
                    options={OPTIONS_SIZE}
                    hideSearch
                    value={size}
                    onValueChange={(value) =>
                      setSize((value as "small" | "medium" | "large") || size)
                    }
                    buttonClassName="lg:w-44"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default HeroFloatingOptions;
