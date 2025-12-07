"use client";

import { SearchIcon } from "lucide-react";

import Link from "next/link";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumn?: string;
  searchPlaceholder?: string;
  createHref?: string;
  createLabel?: string;
  onExport?: () => void;
  showExport?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder = "Search...",
  createHref,
  createLabel = "Create",
  onExport,
  showExport = true,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex w-full items-center justify-between">
      {searchColumn ? (
        <InputGroup className="max-w-xs">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
          />
        </InputGroup>
      ) : (
        <div />
      )}

      <div className="flex space-x-2">
        {showExport && (
          <Button variant="outline" onClick={onExport}>
            Export
          </Button>
        )}
        {createHref && (
          <Button asChild>
            <Link href={createHref}>{createLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
