"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { InteractiveHoverButton } from "./magicui/arrow-button";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  if (arrow) {
    return (
      <InteractiveHoverButton
        className={className}
        type="submit"
        onClick={() => router.push("/auth/signin")}
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
      asChild
    >
      <Link href="/auth/signin">{label}</Link>
    </Button>
  );
};
export default SpotifyLoginButton;
