"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const SpotifyLoginButton = ({
  label = "Signin with Spotify",
}: {
  label: string;
}) => {
  return (
    <Button
      size={"lg"}
      className="text-lg py-8"
      type="submit"
      onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
    >
      {label}
    </Button>
  );
};
export default SpotifyLoginButton;
