import Image from "next/image";
import * as motion from "motion/react-client";
import { ClassName } from "@/types/types";
import { cn } from "@/lib/utils";
import { Target, TargetAndTransition, Transition } from "motion/react";

const FloatingIcon = ({
  src,
  sizes = 128,
  alt = "floating icon",
  ContainerClassName,
  ImageClassName,
  initial,
  animate,
  transition,
  style,
}: {
  src: string;
  sizes?: number;
  alt?: string;
  ContainerClassName?: ClassName<HTMLDivElement>;
  ImageClassName?: ClassName<HTMLImageElement>;
  initial?: Target;
  animate?: TargetAndTransition;
  transition?: Transition;
  style?: React.CSSProperties;
}) => {
  return (
    <motion.div
      className={cn("absolute w-24 h-24 z-0", ContainerClassName)}
      initial={{
        ...initial,
      }}
      animate={{ opacity: 1, ...animate }}
      transition={{
        duration: 2,
        ...transition,
      }}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={String(sizes)}
        className={ImageClassName}
      />
    </motion.div>
  );
};
export default FloatingIcon;
