import { notFound } from "next/navigation";
import { NISN_LENGTH } from "@/schemas/student";
import studentService from "@/services/students-service";

export default async function Page({
  params,
}: {
  params: Promise<{ nisn: string }>;
}) {
  const { nisn } = await params;

  if (isNaN(Number(nisn)) || nisn.length !== NISN_LENGTH) {
    return notFound();
  }

  const result = await studentService.getStudentByNISN({ nisn: nisn });
  if (!result.success) return notFound();

  const student = result.data!;

  return <div className="flex flex-col gap-4 p-12"></div>;
}
