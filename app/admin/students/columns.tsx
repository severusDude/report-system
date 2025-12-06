"use client";

import z from "zod";

import { ColumnDef } from "@tanstack/react-table";
import { Gender } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";
import { Mars, Venus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Students = z.object({
  id: z.number(),
  name: z.string(),
  gender: z.string(),
  nisn: z.string(),
});

export const columns: ColumnDef<z.infer<typeof Students>>[] = [
  {
    header: "#",
    id: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",

    cell: ({ row }) => {
      const isMale = row.original.gender === Gender.MALE;

      return (
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
      );
    },
  },
  {
    accessorKey: "nisn",
    header: "NISN",
  },
];
