import Image from "next/image";
import Logo from "@/assets/logo-color.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import SpotifyLoginButton from "../SpotifyLoginButton";

const Nav = () => {
  return (
    <nav>
      <div className="flex items-center justify-between py-4">
        <Link href={"/"} className="flex items-center gap-2 text-primary">
          <Image src={Logo} alt="Beatcaster Logo" width={32} height={32} />
          <span className="font-bold text-xl">Beatcaster</span>
        </Link>
        <div className="space-x-2">
          <SpotifyLoginButton label="Get Started" />
        </div>
      </div>
    </nav>
  );
};
export default Nav;
