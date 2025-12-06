import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid w-screen min-h-screen overflow-hidden max-w-screen lg:grid-cols-2">
      <div className="flex items-center justify-center flex-1 w-full min-h-screen p-6">
        {children}
      </div>

      <div className="relative items-center justify-center hidden border-l bg-muted lg:flex"></div>
    </div>
  );
}
