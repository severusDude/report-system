import { NISN_LENGTH } from "@/schemas/student";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ nisn: string }>;
}) {
  const { nisn } = await params;

  if (isNaN(Number(nisn)) || nisn.length !== NISN_LENGTH) {
    return notFound();
  }

  return <>this is test {nisn}</>;
}
