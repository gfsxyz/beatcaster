import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const LandingSignInButton = ({
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
      <Link
        href="/auth/signin"
        className={cn(
          "group relative inline-flex w-auto items-center overflow-hidden rounded-lg border bg-primary p-2 px-6 text-center font-semibold select-none",
          className
        )}
      >
        <span className="flex items-center">
          <span className="h-0 w-0 rounded-full bg-background opacity-0 transition-all duration-300 group-hover:h-2 group-hover:w-2 group-hover:scale-[100.8] group-hover:opacity-100" />
          <span className="inline-block text-background transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {label}
          </span>
        </span>
        <span className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
          <span>{label}</span>
          <ArrowRight className="size-4" />
        </span>
      </Link>
    );
  }

  return (
    <Button size={size} className={className} variant={variant} asChild>
      <Link href="/auth/signin">{label}</Link>
    </Button>
  );
};

export default LandingSignInButton;
