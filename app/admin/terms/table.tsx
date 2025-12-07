"use client";

import z from "zod";

import { DataTableWrapper } from "@/components/ui/data-table/data-table-wrapper";

import { columns, Term } from "./columns";

interface TermTableProps {
  data: z.infer<typeof Term>[];
  name: string;
}

function TermTable({ data, name }: TermTableProps) {
  return (
    <DataTableWrapper
      columns={columns}
      data={data}
      title={name}
      searchColumn="name"
      searchPlaceholder="Search terms..."
      createHref="/admin/terms/new"
      createLabel="Create"
      showExport={false}
    />
  );
}

export default TermTable;
