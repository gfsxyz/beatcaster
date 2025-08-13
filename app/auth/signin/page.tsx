"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import ErrorMessage from "../error-messages";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import LoadingPageFallback from "@/components/LoadingPageFallback";

const errorMessages: Record<string, string> = {
  OAuthCallback:
    "There was an issue logging you in with Spotify. Please try again.",
  AccessDenied: "You denied the Spotify access request.",
  OAuthAccountNotLinked: "Account exists with different sign-in method.",
  Default: "Something went wrong. Please try again.",
};

function SignInContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorMessage = error
    ? errorMessages[error] ?? errorMessages.Default
    : null;

  if (errorMessage) return <ErrorMessage />;

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4 bg-foreground relative">
      <div
        className="absolute inset-0 z-0 opacity-20 animate-pulse"
        style={{
          backgroundImage: `
      linear-gradient(to right, #6d4c41 1px, transparent 1px),
      linear-gradient(to bottom, #6d4c41 1px, transparent 1px)
    `,
          backgroundSize: "50px 70px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />

      <h1 className="sr-only">Sign in</h1>

      <div className="bg-background shadow-sm rounded-lg p-8 border flex items-center gap-4 border-accent z-50 relative">
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `
        radial-gradient(circle at 15% 85%, rgb(200, 230, 201, 0.35), transparent 60%),
        radial-gradient(circle at 85% 15%, rgb(13, 121, 67, 0.2), transparent 60%)`,
          }}
        />
        <div className="space-y-16 w-full max-w-80 z-50">
          <div className="flex items-center gap-2">
            <Image
              src="/svg/logo.svg"
              alt="beatcaster logo"
              width={28}
              height={28}
            />
            <span className="font-bold text-primary text-xl">Beatcaster</span>
          </div>

          <h2 className="text-4xl font-bold">
            Display music of the moment to your video
          </h2>

          <div className="space-y-4">
            <Button
              onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
              size={"lg"}
              className="w-full"
            >
              <Image
                src={"/spotify-logo.png"}
                alt="spotify logo"
                width={18}
                height={18}
              />
              Continue with Spotify
            </Button>
            <p className="text-muted-foreground text-sm [&>a]:text-foreground [&>a:hover]:underline">
              By sign in, you agree to our&nbsp;
              <Link href="#">Terms and conditions</Link>&nbsp;and&nbsp;
              <Link href="#">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingPageFallback />}>
      <SignInContent />
    </Suspense>
  );
}
