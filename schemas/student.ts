import z from "zod";

import { Gender } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";

export const NISN_LENGTH = 10;
export const NIK_LENGTH = 16;
export const FAMILY_CARD_NUMBER_LENGTH = 16;

// Schema for upserting a student from the form
export const StudentUpsertSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Full name is required")
    .max(70, "Name cannot exceed 70 characters"),
  gender: z.enum(Gender).or(z.literal(null)),
  parentId: z.string().min(1, "Parent is required"),
  nisn: z
    .string()
    .min(1, "NISN is required")
    .regex(/^[0-9]+$/, "NISN must be numeric")
    .length(NISN_LENGTH, `NISN must be ${NISN_LENGTH} characters long`),
  nik: z
    .string()
    .regex(/^[0-9]+$/, "NIK must be numeric")
    .length(NIK_LENGTH, `NIK must be ${NIK_LENGTH} characters long`)
    .or(z.literal("")),
  citizenship: z.string().or(z.literal("")),
  familyCardNumber: z
    .string()
    .regex(/^[0-9]+$/, "Family Card Number must be numeric")
    .length(
      FAMILY_CARD_NUMBER_LENGTH,
      `Family Card Number must be ${FAMILY_CARD_NUMBER_LENGTH} characters long`
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
