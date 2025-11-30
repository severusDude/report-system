"use client";

import RegisterForm from "@/components/forms/register-form";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (session) {
    redirect("/");
  }

  return <RegisterForm className="w-full max-w-xs" />;
}
