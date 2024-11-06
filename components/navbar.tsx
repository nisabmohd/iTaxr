import { CircleDollarSignIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-14 border-b sticky top-0 bg-background z-30">
      <div className="h-full flex justify-between items-center px-5">
        <Link href="/" className="flex items-center gap-2 text-blue-500">
          <CircleDollarSignIcon className="w-6 h-6 text-current" />
          <h2 className="font-bold">TaxPage</h2>
        </Link>
        <div className="flex">
          <Button variant="ghost">
            <UserIcon className="w-4 h-4" />
            John Doe
          </Button>
          <Button variant="ghost">
            <LogOutIcon className="w-4 h-4 text-destructive" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
