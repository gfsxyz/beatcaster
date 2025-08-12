"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export function UserNav({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Image
            src={user.image ?? "/default-avatar.png"}
            alt={
              user.name
                ? `${user.name}'s profile picture`
                : "User profile picture"
            }
            fill
            sizes="40"
            className="rounded-full ring-2 border-2 border-transparent ring-primary"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="destructive"
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
