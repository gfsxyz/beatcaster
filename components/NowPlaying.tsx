"use client";

import { FONT_VARIABLES } from "@/lib/font_variables";
import { FontEnum } from "@/types/types";
import { motion } from "motion/react";
import Image from "next/image";
import MarqueeText from "./MarqueeText";

const sizeStyles = {
  small: {
    maxWidth: "max-w-72",
    fontSize: 10,
    imageSize: 32,
    title: "font-semibold text-base text-background",
    artist: "text-xs",
  },
  medium: {
    maxWidth: "max-w-80",
    fontSize: 14,
    imageSize: 48,
    title: "font-semibold text-lg text-background",
    artist: "text-sm",
  },
  large: {
    maxWidth: "max-w-[32rem]",
    fontSize: 16,
    imageSize: 72,
    title: "font-semibold text-2xl text-background",
    artist: "text-lg",
  },
};

export default function NowPlaying({
  show_title = true,
  show_artist = true,
  show_album_cover = true,
  size = "medium",
  font = "default",
}: {
  show_title?: boolean;
  show_artist?: boolean;
  show_album_cover?: boolean;
  size?: keyof typeof sizeStyles;
  font?: FontEnum;
}) {
  const songTitle = "Part Of The Band - Being Funny In A Foreign Language";
  const artists = "The 1975";

  const sizeConfig = sizeStyles[size];

  return (
    <motion.div
      className={`flex items-center text-white overflow-hidden shadow-lg rounded-xl bg-foreground/50 backdrop-blur-md p-4 border  aspect-[69/16] ${sizeConfig.maxWidth}`}
      style={{
        height: sizeConfig.imageSize + 24,
        fontSize: sizeConfig.fontSize,
      }} // small height tweak
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Album Cover */}
      {show_album_cover && (
        <Image
          src="/1975.png"
          alt="Album Cover"
          width={64}
          height={64}
          className={`object-cover rounded-md`}
          style={{ width: sizeConfig.imageSize, height: sizeConfig.imageSize }}
        />
      )}

      {/* Text Section */}
      <div
        className={`flex flex-col justify-center px-3 overflow-hidden`}
        style={{
          width: show_album_cover
            ? `calc(100% - ${sizeConfig.imageSize + 12}px)`
            : "100%",
        }}
      >
        {show_title && (
          <div
            className={`${sizeConfig.title}`}
            style={{ fontFamily: `var(${FONT_VARIABLES[font]})` }}
          >
            <MarqueeText text={songTitle} speed={12} />
          </div>
        )}
        {show_artist && (
          <div
            className={`${sizeConfig.artist}`}
            style={{ fontFamily: `var(${FONT_VARIABLES[font]})` }}
          >
            {artists}
          </div>
        )}
      </div>
    </motion.div>
  );
}
