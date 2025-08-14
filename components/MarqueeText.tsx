"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const MarqueeText = ({
  text,
  speed = 49, // px per second
  maxTextWidth = 0,
}: {
  text: string;
  speed?: number;
  maxTextWidth?: number;
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState<number>(0);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [text]);

  const extraSpacing = 16; // 16px padding on left side of duplicate span
  const totalTextWdith = textWidth + extraSpacing;
  const duration = totalTextWdith > 0 ? totalTextWdith / speed : 0;

  return (
    <div className="overflow-hidden whitespace-nowrap w-full">
      <motion.div
        className="flex"
        animate={textWidth > maxTextWidth ? { x: [0, -totalTextWdith] } : {}}
        transition={
          textWidth > 0
            ? {
                duration,
                repeat: Infinity,
                ease: "linear",
              }
            : {}
        }
      >
        <span ref={textRef}>{text}</span>
        {textWidth > maxTextWidth && <span>&nbsp;{text}</span>}
      </motion.div>
    </div>
  );
};

export default MarqueeText;
