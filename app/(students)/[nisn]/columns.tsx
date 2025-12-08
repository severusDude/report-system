"use client";

import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";
import { Grade, SubjectType } from "@/generated/prisma/enums";

export type EnrollmentTableData = {
  id: string;
  rowNumber: number;
  subject: {
    name: string;
    type: SubjectType;
  };
  attendanceRate: {
    present: number;
    total: number;
    percentage: number;
  };
  teacherName: string;
  grade: Grade;
};

const gradeDisplayMap: Record<Grade, string> = {
  A_PlUS: "A+",
  A: "A",
  B_PLUS: "B+",
  B: "B",
  C_PLUS: "C+",
  C: "C",
  D: "D",
  E: "E",
  UNSET: "—",
};

const gradeBadgeVariant: Record<
  Grade,
  "default" | "secondary" | "destructive" | "outline"
> = {
  A_PlUS: "default",
  A: "default",
  B_PLUS: "secondary",
  B: "secondary",
  C_PLUS: "outline",
  C: "outline",
  D: "destructive",
  E: "destructive",
  UNSET: "outline",
};

const subjectTypeBadgeVariant: Record<SubjectType, "default" | "secondary"> = {
  GENERAL: "default",
  ISLAMIC: "secondary",
};

export const columns: ColumnDef<EnrollmentTableData>[] = [
  {
    accessorKey: "rowNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("rowNumber")}</div>
    ),
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const subject = row.getValue("subject") as EnrollmentTableData["subject"];
      return (
        <div className="flex items-center gap-2">
          <Badge variant={subjectTypeBadgeVariant[subject.type]}>
            {subject.type}
          </Badge>
          <span>{subject.name}</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const subjectA = rowA.getValue(
        "subject"
      ) as EnrollmentTableData["subject"];
      const subjectB = rowB.getValue(
        "subject"
      ) as EnrollmentTableData["subject"];
      return subjectA.name.localeCompare(subjectB.name);
    },
  },
  {
    accessorKey: "attendanceRate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Attendance Rate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const attendance = row.getValue(
        "attendanceRate"
      ) as EnrollmentTableData["attendanceRate"];
      return (
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            {attendance.present}/{attendance.total} (
            {attendance.percentage.toFixed(1)}%)
          </div>
          <Progress value={attendance.percentage} className="h-2" />
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const attendanceA = rowA.getValue(
        "attendanceRate"
      ) as EnrollmentTableData["attendanceRate"];
      const attendanceB = rowB.getValue(
        "attendanceRate"
      ) as EnrollmentTableData["attendanceRate"];
      return attendanceA.percentage - attendanceB.percentage;
    },
  },
  {
    accessorKey: "teacherName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teacher
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("teacherName")}</div>,
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const grade = row.getValue("grade") as Grade;
      return (
        <Badge variant={gradeBadgeVariant[grade]}>
          {gradeDisplayMap[grade]}
        </Badge>
      );
    },
  },
];
