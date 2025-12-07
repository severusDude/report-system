import z from "zod";

import { Prisma } from "@/generated/prisma/client";

export const TermCreateSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, "Term name is required"),
    dateRange: z
      .object({
        from: z.date(),
        to: z.date(),
      })
      .optional(),
  })
  .refine(
    (data) =>
      data.dateRange?.from !== undefined && data.dateRange?.to !== undefined,
    {
      message: "Both start and end dates are required",
      path: ["dateRange"],
    }
  );

export const TermCreateInput = TermCreateSchema.omit({
  id: true,
}).transform((data) => {
  const startDate = data.dateRange!.from;
  const endDate = data.dateRange!.to;

  return {
    name: data.name,
    startDate: startDate,
    endDate: endDate,
  };
}) satisfies z.ZodType<Prisma.TermUncheckedCreateInput>;

export const TermUpdateInput =
  TermCreateSchema satisfies z.ZodType<Prisma.TermUncheckedUpdateInput>;
