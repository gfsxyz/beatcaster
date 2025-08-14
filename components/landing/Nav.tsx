"use client";

import Image from "next/image";
import Link from "next/link";
import SpotifyLoginButton from "../SpotifyLoginButton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll(); //check first load

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={cn(
        "top-8 lg:w-full w-5/6 min-w-fit max-w-7xl z-50 transition-all fixed duration-300 left-1/2 -translate-1/2",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md max-w-3xl rounded-2xl top-12"
          : "bg-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between p-4 mx-auto transition-all",
          isScrolled && "py-3 px-4"
        )}
      >
        <Link href={"/"} className="flex items-center gap-2 text-primary">
          <div
            style={{
              position: "relative",
              width: isScrolled ? "24px" : "32px",
              height: isScrolled ? "24px" : "32px",
            }}
          >
            <Image src={"/svg/logo.svg"} alt="Beatcaster Logo" fill />
          </div>
          <span
            className={cn(
              "font-bold text-xl transition-all opacity-0 sm:opacity-100",
              isScrolled && "text-base"
            )}
          >
            Beatcaster
          </span>
        </Link>
        <div className="space-x-2">
          <SpotifyLoginButton
            label="Get Started"
            size={isScrolled ? "sm" : "default"}
          />
        </div>
      </div>
    </motion.nav>
  );
};
export default Nav;
