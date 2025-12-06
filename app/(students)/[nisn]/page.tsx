import z from "zod";

import { notFound } from "next/navigation";
import { NISN_LENGTH } from "@/schemas/student";
import { DataTable } from "@/components/ui/data-table";

import { columns, Enrollments } from "./columns";

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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
