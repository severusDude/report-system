"use client";

import z from "zod";

import { DataTableWrapper } from "@/components/ui/data-table/data-table-wrapper";

import { columns, Student } from "./columns";

interface StudentTableProps {
  data: z.infer<typeof Student>[];
  name: string;
}

function StudentTable({ data, name }: StudentTableProps) {
  return (
    <DataTableWrapper
      columns={columns}
      data={data}
      title={name}
      searchColumn="name"
      searchPlaceholder="Search students..."
      createHref="/admin/students/new"
      createLabel="Create"
      showExport={false}
    />
  );
}

export default StudentTable;
