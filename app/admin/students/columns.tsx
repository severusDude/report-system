"use client";

import z from "zod";
import { Mars, Venus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Gender } from "@/generated/prisma/enums";
import { deleteStudent } from "@/actions/students-actions";
import { ActionCell } from "@/components/ui/data-table/cells/action-cell";
import { createSelectColumn } from "@/components/ui/data-table/select-column";

export const Student = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string().or(z.literal(null)),
  nisn: z.string(),
});

export const columns: ColumnDef<z.infer<typeof Student>>[] = [
  createSelectColumn<z.infer<typeof Student>>(),
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "gender",
    header: () => <div className="text-center">Gender</div>,

    cell: ({ row }) => {
      const isMale = row.original.gender === Gender.MALE;

      return (
        <div className="text-center">
          <Badge
            variant="outline"
            className={cn(
              "rounded-md",
              isMale
                ? "text-blue-500 bg-blue-50 border-blue-500"
                : "text-rose-500 bg-rose-50 border-rose-500"
            )}
          >
            <>
              {isMale ? (
                <Mars className="mr-1 text-blue-500" />
              ) : (
                <Venus className="mr-1" />
              )}
              {isMale ? "Male" : "Female"}
            </>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "nisn",
    header: "NISN",
  },
  {
    id: "action",
    cell: ({ row }) => (
      <ActionCell
        item={row.original}
        itemName={row.original.name}
        itemIdentifier={row.original.nisn}
        editHref={`/admin/students/${row.original.nisn}`}
        onDelete={deleteStudent}
        deleteTitle="Delete student"
        deleteDescription={
          `Are you sure you want to delete ${row.original.name}?` || undefined
        }
      />
    ),
  },
];
