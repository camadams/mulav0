"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChartBar, User } from "lucide-react";
import { auth } from "../lib/auth";
import Image from "next/image";

export default async function Navbar() {
  // const { data: session } = useSession();
  const session = await auth();
  // console.log({ session });
  return (
    <nav className="flex justify-between items-center p-2 bg-background border-b">
      <Link href="/" className="text-2xl font-bold flex items-center">
        <ChartBar className="h-6 w-6 text-orange-500" />
        <span className="ml-2 text-xl font-semibold text-gray-900">mula</span>
      </Link>
      {session ? (
        <div className="flex gap-2">
          {/* <Button variant="ghost" className="rounded-full"> */}
          {/* <Image src={session.user?.image || ""} fill alt="hi" /> */}
          {/* <img src={session.user?.image || ""} alt="Profile" /> */}
          {/* <User className="h-6 w-6" /> */}
          {/* </Button> */}
          <Link href="/api/auth/signout?callbackUrl=/">
            <Button>Sign Out</Button>
          </Link>
        </div>
      ) : (
        <Link href="/api/auth/signin?callbackUrl=/dashboard">
          <Button>Sign In</Button>
        </Link>
      )}
    </nav>
  );
}

{
  /* <Button variant="ghost" className="w-10 h-10 rounded-full">
<img src={session.user?.image || ""} alt="Profile" />
<User className="h-6 w-6" />
</Button> 


 <Button variant="ghost" className="w-10 h-10 rounded-full">
Logout
</Button> */
}
