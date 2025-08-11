"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { InteractiveHoverButton } from "./magicui/arrow-button";

const SpotifyLoginButton = ({
  label = "Signin with Spotify",
  size = "default",
  className,
  variant = "default",
  arrow = false,
}: {
  label?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  arrow?: boolean;
}) => {
  if (arrow) {
    return (
      <InteractiveHoverButton
        className={className}
        type="submit"
        onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
      >
        {label}
      </InteractiveHoverButton>
    );
  }
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
