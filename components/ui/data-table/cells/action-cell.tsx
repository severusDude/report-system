"use client";

import { toast } from "sonner";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDeleteConfirmation } from "@/components/delete-confirmation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionCellProps<TData> {
  item: TData;
  itemName: string;
  itemIdentifier: string;
  editHref: string;
  onDelete: (identifier: string) => Promise<void>;
  deleteTitle?: string;
  deleteDescription?: string;
}

export function ActionCell<TData>({
  item,
  itemName,
  itemIdentifier,
  editHref,
  onDelete,
  deleteTitle = "Delete Item",
  deleteDescription,
}: ActionCellProps<TData>) {
  const router = useRouter();

  const deleteConfirmation = useDeleteConfirmation({
    isSilent: false,
    title: deleteTitle,
    description:
      deleteDescription || `Are you sure you want to delete ${itemName}?`,
    action: async (identifier: string) => {
      await onDelete(identifier);
    },
    onSuccess: () => {
      toast.success(`${itemName} deleted successfully`);
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error(`Failed to delete ${itemName}`);
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
              router.push(editHref);
            }}
          >
            <Edit className="mr-1" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              deleteConfirmation.trigger(itemIdentifier);
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
