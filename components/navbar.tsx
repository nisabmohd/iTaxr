import { LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { getPersonalDetails } from "@/core/user";

export default async function Navbar() {
  const session = (await getSession())!
  const { firstName, middleName } = await getPersonalDetails(session.id)

  return (
    <nav className="h-14 border-b sticky top-0 bg-background z-30">
      <div className="h-full flex justify-between items-center px-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/assets/logo.jpeg" alt="logo" width={90} height={50} />
        </Link>
        <div className="flex">
          <Button variant="ghost">
            <UserIcon className="w-4 h-4" />
            {`${firstName} ${middleName}`}
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
