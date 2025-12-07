"use client";

import z from "zod";
import { columns, Subjects } from "./columns";
import { DataTableWrapper } from "@/components/ui/data-table/data-table-wrapper";

interface SubjectTableProps {
  data: z.infer<typeof Subjects>[];
  name: string;
}

function SubjectTable({ data, name }: SubjectTableProps) {
  return (
    <DataTableWrapper
      columns={columns}
      data={data}
      title={name}
      searchColumn="name"
      searchPlaceholder="Search subjects..."
      createHref="/admin/subjects/new"
      createLabel="Create"
      showExport={false}
    />
  );
}

export default SubjectTable;
