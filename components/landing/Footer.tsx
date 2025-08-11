import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto border text-xs">
      <div className="w-full max-w-6xl border-x mx-auto py-4 px-3">
        <div className="flex justify-between">
          <div>Beatcaster &copy; 2025</div>
          <div className="space-x-4">
            <Link href="#" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
