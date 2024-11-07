import { LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="h-14 border-b sticky top-0 bg-background z-30">
      <div className="h-full flex justify-between items-center px-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/assets/logo.jpeg" alt="logo" width={90} height={50} />
          <h2 className="text-lg font-bold">TaxPage</h2>
        </Link>
        <div className="flex">
          <Button variant="ghost">
            <UserIcon className="w-4 h-4" />
            John Doe
          </Button>
          <form action={logoutAction}>
            <Button variant="ghost">
              <LogOutIcon className="w-4 h-4 text-destructive" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
}
