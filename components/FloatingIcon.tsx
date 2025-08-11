import Image from "next/image";
import * as motion from "motion/react-client";
import { ClassName } from "@/types/types";
import { cn } from "@/lib/utils";

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
  initial?: {};
  animate?: {};
  transition?: {};
  style?: {};
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
