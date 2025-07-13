import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserNav } from "./UserNav";
import { redirect } from "next/navigation";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/");

  return (
    <header className="top-0 z-50 w-full border rounded-2xl bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60 min-w-fit">
      <div className="flex h-16 items-center mx-auto p-4">
        <div className="mr-4 flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">Beatcaster</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <UserNav user={session.user} />
        </div>
      </div>
    </header>
  );
}
