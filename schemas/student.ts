import z from "zod";

import { Gender } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";

// Schema for upserting a student from the form
export const StudentUpsertSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Full name is required")
    .max(70, "Name cannot exceed 70 characters"),
  gender: z.enum(Gender),
  parentId: z.string().min(1, "Parent is required"),
  nisn: z.string().min(1, "NISN is required"),
  nik: z.string().min(1, "NIK is required"),
  citizenship: z.string().min(1, "Citizenship is required"),
  familyCardNumber: z.string().min(1, "Family Card Number is required"),
  birthPlace: z.string().min(1, "Birth Place is required"),
  dateOfBirth: z.date(),
});

// Schema for creating a student
export const StudentCreateInput = StudentUpsertSchema.omit({
  id: true,
}) satisfies z.ZodType<Prisma.StudentUncheckedCreateInput>;

// Schema for updating a student (same as creating a student)
export const StudentUpdateInput =
  StudentCreateInput satisfies z.ZodType<Prisma.StudentUncheckedUpdateInput>;

export const StudentUpsertInput = z.object({
  where: z.object({
    id: z.string(),
  }) satisfies z.ZodType<Prisma.StudentWhereUniqueInput>,

  create: StudentCreateInput,
  update: StudentUpdateInput,
});
