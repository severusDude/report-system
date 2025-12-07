"use client";

import z from "zod";
import { toast } from "sonner";
import { Edit, Mars, MoreHorizontal, Trash2, Venus } from "lucide-react";

import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Gender } from "@/generated/prisma/enums";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteStudent } from "@/actions/students-actions";
import { useDeleteConfirmation } from "@/components/delete-confirmation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Students = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string().or(z.literal(null)),
  nisn: z.string(),
});

function ActionCell({ student }: { student: z.infer<typeof Students> }) {
  const deleteConfirmation = useDeleteConfirmation({
    isSilent: false,
    title: "Delete Student",
    description: `Are you sure you want to delete ${student.name}?`,
    action: async (nisn: string) => {
      await deleteStudent(nisn);
    },
    onSuccess: () => {
      toast.success(`Student ${student.name} deleted successfully`);
    },
    onError: (error: unknown) => {
      console.log(error);

      toast.error("Failed to delete student");
    },
  });

  return (
    <div className="text-center w-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              redirect(`/admin/students/${student.nisn}`);
            }}
          >
            <Edit className="mr-1" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              deleteConfirmation.trigger(student.nisn);
            }}
          >
            <Trash2 className="mr-1" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {deleteConfirmation.dialog}
    </div>
  );
}

export const columns: ColumnDef<z.infer<typeof Students>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="text-center w-0">
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center w-0">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    cell: ({ row }) => <ActionCell student={row.original} />,
  },
];
