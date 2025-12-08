"use client";

import z from "zod";

import { DataTableWrapper } from "@/components/ui/data-table/data-table-wrapper";

import { columns, User } from "./columns";

interface UserTableProps {
  data: z.infer<typeof User>[];
  name: string;
}

function UserTable({ data, name }: UserTableProps) {
  return (
    <DataTableWrapper
      columns={columns}
      data={data}
      title={name}
      searchColumn="name"
      searchPlaceholder="Search users..."
      createHref="/admin/users/new"
      createLabel="Create"
      showExport={false}
    />
  );
}

export default UserTable;
