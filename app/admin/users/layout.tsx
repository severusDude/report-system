import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Role } from "@/generated/prisma/enums";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.role !== Role.ADMIN) {
    return notFound();
  }

  return <>{children}</>;
}
