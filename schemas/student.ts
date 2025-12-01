import z from "zod";

import { Gender } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";

export const StudentCreateInput = z.object({
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
  dateOfBirth: z.date().min(1, "Date of Birth is required"),
}) satisfies z.ZodType<Prisma.StudentUncheckedCreateInput>;
