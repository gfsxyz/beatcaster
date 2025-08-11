"use client";

import { motion } from "motion/react";

// Helper component for the marquee effect
const MarqueeText = ({
  children,
  duration,
}: {
  children: React.ReactNode;
  duration: number;
}) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        <span className="inline-block px-2">{children}</span>
        <span className="inline-block px-2">{children}</span>
      </motion.div>
    </div>
  );
};

export default MarqueeText;
