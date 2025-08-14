"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import { Highlighter } from "@/components/magicui/highlighter";

export default function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "Something went wrong. Please try again later.";

  if (error === "AccessDenied") {
    errorMessage =
      "You denied the request to access your Spotify account. We can't log you in without your permission.";
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage =
      "An account with this email already exists. Please log in with the correct provider.";
  } else if (error === "OAuthCallback") {
    errorMessage =
      "There was an issue logging you in with Spotify. Please try again later.";
  }

  return (
    <main className="p-4 text-center space-y-12 mt-32">
      <div className="space-y-2">
        <h1 className="font-semibold text-2xl">Authentication Error</h1>

        <div className="mx-auto max-w-96 text-center text-sm text-foreground bg-muted rounded-lg p-4">
          {errorMessage}
        </div>
      </div>
      <div className="text-9xl">🙏</div>
      <p className="max-w-[46rem] mx-auto text-muted-foreground">
        If you&apos;re seeing this, it means Spotify still hasn&apos;t granted
        us production API access. We&apos;re currently using a&nbsp;&nbsp;
        <Highlighter>limited</Highlighter> &nbsp;&nbsp;API with a max of 25
        users. Let us know if you&apos;d like to be&nbsp;&nbsp;
        <Highlighter color="oklch(0.8952 0.0504 146.0366)">
          whitelisted!
        </Highlighter>
        &nbsp;&nbsp; 👋
      </p>

      <div className="flex gap-3 items-center justify-center">
        <Button asChild variant={"outline"} size={"sm"}>
          <Link href={"/"}>
            <ArrowLeft />
            Home
          </Link>
        </Button>
        <Button asChild className="bg-black hover:bg-black/80" size={"sm"}>
          <a href={"https://x.com/gfsxyz"}>
            <Image
              src={"/svg/x-logo.svg"}
              width={12}
              height={12}
              alt="x logo"
            />
            X / Twitter
          </a>
        </Button>
        <Button asChild size={"sm"}>
          <a href="mailto:gustifaizals@gmail.com">
            <Mail />
            Email us
          </a>
        </Button>
      </div>
    </main>
  );
}
