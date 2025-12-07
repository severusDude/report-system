import { Prisma } from "@/generated/prisma/client";
import { SubjectType } from "@/generated/prisma/enums";
import z from "zod";

export const SubjectCreateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Subject name is required"),
  type: z.enum(SubjectType, { error: "Subject type is required" }),
});

export const SubjectCreateInput = SubjectCreateSchema.omit({
  id: true,
}) satisfies z.ZodType<Prisma.SubjectUncheckedCreateInput>;

export const SubjectUpdateInput =
  SubjectCreateSchema satisfies z.ZodType<Prisma.SubjectUncheckedUpdateInput>;
