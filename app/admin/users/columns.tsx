"use client";

import z from "zod";
import { Edit2 } from "lucide-react";

import Link from "next/link";
import { capitalize, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { createSelectColumn } from "@/components/ui/data-table/select-column";

export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

export const columns: ColumnDef<z.infer<typeof User>>[] = [
  createSelectColumn<z.infer<typeof User>>(),
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role as string as Role;

      const isAdmin = role === Role.ADMIN;
      const isTeacher = role === Role.TEACHER;
      const isParent = role === Role.PARENT;

      const className = cn(
        isAdmin &&
          "text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-400",
        isTeacher &&
          "text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-400",
        isParent &&
          "text-yellow-500 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900 border-yellow-500 dark:border-yellow-400"
      );

      return (
        <Badge variant="outline" className={cn("select-none", className)}>
          {capitalize(role)}
        </Badge>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => (
      <div className="flex gap-2 w-0">
        <Button variant="outline" size="icon-sm" asChild>
          <Link href={`/admin/users/${row.original.id}`}>
            <Edit2 className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
  },
];
