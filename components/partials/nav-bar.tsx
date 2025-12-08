"use client";

import Link from "next/link";
import Image from "next/image";
import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";

function PartialNavbar({
  className,
  ...props
}: React.ComponentProps<"header">) {
  const { data: session, isPending, refetch } = authClient.useSession();

  return (
    <header
      {...props}
      className="sticky top-0 z-30 bg-white/30 backdrop-blur-sm"
    >
      <div className="mx-auto relative flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-ibnu-siena.png"
            alt="Ibnu Siena Mulia logo"
            width={160}
            height={40}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-6">
          <Link href="/" className="text-sm font-medium text-[#5BB29D]">
            Home
          </Link>
          <Link href="/overview" className="text-sm font-medium text-zinc-700">
            Overview
          </Link>
          <Link href="/works" className="text-sm font-medium text-zinc-700">
            Works
          </Link>
          <Link href="/report" className="text-sm font-medium text-zinc-700">
            Report
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {!session && !isPending && (
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
          {session && (
            <NavUser
              session={session as Session}
              isSidebar={false}
              props={{ align: "end", side: "bottom" }}
              onNavigate={refetch}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default PartialNavbar;
