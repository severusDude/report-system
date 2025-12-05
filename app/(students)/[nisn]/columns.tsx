"use client";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const Enrollments = z.object({
  id: z.string(),
  name: z.string(),
});

export const columns: ColumnDef<z.infer<typeof Enrollments>>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
