import { NISN_LENGTH } from "@/schemas/student";
import { notFound } from "next/navigation";
import z from "zod";
import { columns, Enrollments } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const data: z.infer<typeof Enrollments>[] = [
  {
    id: "1",
    name: "Math",
  },
  {
    id: "2",
    name: "English",
  },
  {
    id: "3",
    name: "Science",
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ nisn: string }>;
}) {
  const { nisn } = await params;

  if (isNaN(Number(nisn)) || nisn.length !== NISN_LENGTH) {
    return notFound();
  }

  return (
    <div>
      this is test {nisn}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
