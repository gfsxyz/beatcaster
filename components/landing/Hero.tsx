import FloatingIcon from "../FloatingIcon";
import { Highlighter } from "../magicui/highlighter";
import SpotifyLoginButton from "../SpotifyLoginButton";
import * as motion from "motion/react-client";
import Image from "next/image";
import HeroFloatingOptions from "../HeroFloatingOptions";

const Hero = () => {
  return (
    <>
      <section
        id="hero"
        className="border-b relative 2xl:overflow-visible overflow-hidden"
      >
        <FloatingIcon
          src="/spotify.png"
          ContainerClassName="top-80 -left-[10rem] lg:left-34 opacity-0 lg:opacity-100 transition-all"
          style={{
            transformOrigin: "top center", // pivot from the stem
          }}
          initial={{
            rotate: 0,
            x: 0,
          }}
          animate={{
            opacity: 1,
            rotate: [10, -10, 10, -6, 3, -7, 10], // swing angle
            x: [-5, 5, -5, 3, -1.5, 3.5, -5],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <div className="flex flex-col items-center justify-center gap-8 text-center pt-48 mb-40 z-10 relative">
          <h1 className="text-6xl font-bold text-foreground">
            Connect Your{" "}
            <Highlighter action="box" color="oklch(0.5234 0.1347 144.1672)">
              <div className="text-primary">Beats</div>
            </Highlighter>
            <br />
            to Your Audience
          </h1>
          <p className="text-muted-foreground">
            Seamlessly integrate your current song into your
            <br /> favorite streaming and recording apps with&nbsp;
            <span className="text-primary">Beatcaster</span>.
          </p>
          <SpotifyLoginButton label="Get Started" arrow />
        </div>

        <div
          style={{ width: "400px", height: "600px" }}
          className="absolute top-[5.5rem] lg:-left-20 z-0 opacity-30 lg:opacity-100 filter contrast-150 brightness-50 lg:contrast-100 lg:brightness-100 transition-all -left-64 pointer-events-none select-none"
        >
          <Image
            src="/tree1.png"
            alt="tree"
            fill
            style={{ objectFit: "contain" }}
            sizes="300"
          />
        </div>

        <div
          style={{ width: "400px", height: "600px" }}
          className="absolute top-24 -right-16 z-0 hidden lg:inline-block transition-all pointer-events-none select-none"
        >
          <Image
            src="/tree2.png"
            alt="tree"
            fill
            style={{ objectFit: "contain" }}
            sizes="300"
          />
        </div>
      </section>

      <section
        id="hero-video"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "10px 10px",
        }}
        className="relative"
      >
        <div className="w-full max-w-[56rem] mx-auto h-[502px] border-x lg:px-0 px-4">
          <motion.div
            className="bg-foreground rounded-2xl h-full overflow-hidden pointer-events-none select-none relative"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
              <source src="/videos/hero.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay color */}
            <div className="absolute inset-0 bg-foreground/30 mix-blend-multiply" />
          </motion.div>
        </div>

        <HeroFloatingOptions />
      </section>
    </>
  );
};
export default Hero;
