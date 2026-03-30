"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type InViewProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number;
  scale?: number;
  blur?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

const InView = ({
  children,
  className,
  delay = 0,
  duration = 0.65,
  distance = 32,
  amount = 0.25,
  scale = 0.98,
  blur = 10,
  initial,
  whileInView,
  transition,
  viewport,
  ...props
}: InViewProps) => {
  const shouldReduceMotion = useReducedMotion();

  const hiddenState = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 0, y: distance, scale, filter: `blur(${blur}px)` };

  const visibleState = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };

  return (
    <motion.div
      className={cn(className)}
      initial={initial ?? hiddenState}
      whileInView={whileInView ?? visibleState}
      viewport={{ once: true, amount, ...viewport }}
      transition={transition ?? { duration, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default InView;
