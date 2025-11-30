"use client";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoginForm from "@/components/forms/login-form";

export default function Page() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (session) {
    redirect("/");
  }

  return <LoginForm className="w-full max-w-xs" />;
}
