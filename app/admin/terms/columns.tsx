"use client";

import z from "zod";

import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "@/components/ui/data-table/cells/action-cell";
import { createSelectColumn } from "@/components/ui/data-table/select-column";
import { deleteTerm } from "@/actions/terms-actions";

export const Term = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export const columns: ColumnDef<z.infer<typeof Term>>[] = [
  createSelectColumn<z.infer<typeof Term>>(),
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.original.startDate);

      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.original.endDate);

      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    },
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      // return in n days
      const start = new Date(row.original.startDate);
      const end = new Date(row.original.endDate);
      const duration =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      return `${duration} days`;
    },
  },
  {
    id: "action",
    cell: ({ row }) => (
      <ActionCell
        item={row.original}
        itemName={row.original.name}
        itemIdentifier={row.original.id}
        editHref={`/admin/subjects/${row.original.id}`}
        onDelete={deleteTerm}
        deleteTitle="Delete term"
        deleteDescription={
          `Are you sure you want to delete ${row.original.name}?` || undefined
        }
      />
    ),
  },
];
