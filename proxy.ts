import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { Role } from "./generated/prisma/enums";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (pathname.startsWith("/admin")) {
    const userRole = session.user.role;
    if (userRole !== Role.ADMIN && userRole !== Role.TEACHER) {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // runtime: "nodejs",
  matcher: ["/admin/:path*"],
};
