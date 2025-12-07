"use client";

import { deleteSubject } from "@/actions/subjects-actions";
import { ActionCell } from "@/components/ui/data-table/cells/action-cell";
import { createSelectColumn } from "@/components/ui/data-table/select-column";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const Subjects = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
});

export const columns: ColumnDef<z.infer<typeof Subjects>>[] = [
  createSelectColumn<z.infer<typeof Subjects>>(),
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "action",
    cell: ({ row }) => (
      <ActionCell
        item={row.original}
        itemName={row.original.name}
        itemIdentifier={row.original.id}
        editHref={`/admin/subjects/${row.original.id}`}
        onDelete={deleteSubject}
        deleteTitle="Delete Subject"
        deleteDescription={
          `Are you sure you want to delete ${row.original.name}?` || undefined
        }
      />
    ),
  },
];
