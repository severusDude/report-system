"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

function Page() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session) {
    redirect("/");
  }

  redirect("/auth/login");
}

export default Page;
