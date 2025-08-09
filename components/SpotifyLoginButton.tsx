"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const SpotifyLoginButton = ({
  label = "Signin with Spotify",
  size = "default",
  className,
  variant = "default",
}: {
  label?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
}) => {
  return (
    <Button
      size={size}
      className={className}
      type="submit"
      variant={variant}
      onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
    >
      {label}
    </Button>
  );
};
export default SpotifyLoginButton;
