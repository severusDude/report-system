import z from "zod";

import { Gender } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";

const nisnLength = 10;
const nikLength = 16;
const familyCardNumberLength = 16;

// Schema for upserting a student from the form
export const StudentUpsertSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Full name is required")
    .max(70, "Name cannot exceed 70 characters"),
  gender: z.enum([Gender.MALE, Gender.FEMALE]).or(z.literal(null)),
  parentId: z.string().min(1, "Parent is required"),
  nisn: z
    .string()
    .min(1, "NISN is required")
    .length(nisnLength, `NISN must be ${nisnLength} characters long`),
  nik: z
    .string()
    .length(nikLength, `NIK must be ${nikLength} characters long`)
    .or(z.literal("")),
  citizenship: z.string().min(1, "Citizenship is required").or(z.literal("")),
  familyCardNumber: z
    .string()
    .length(
      familyCardNumberLength,
      `Family Card Number must be ${familyCardNumberLength} characters long`
    )
    .or(z.literal("")),
  birthPlace: z.string().or(z.literal("")),
  dateOfBirth: z.date().or(z.literal(null)),
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
