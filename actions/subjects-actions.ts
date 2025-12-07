"use server";

import z from "zod";

import { ResponseData } from "@/types";
import { updateTag } from "next/cache";
import { Subject } from "@/generated/prisma/browser";
import { SubjectCreateInput } from "@/schemas/subject";
import subjectService from "@/services/subjects-service";

export async function createSubject(
  data: z.infer<typeof SubjectCreateInput>
): Promise<ResponseData<Subject | null>> {
  try {
    const result = await subjectService.createSubject({ data: data });

    if (!result) {
      throw new Error("Failed to create subject");
    }

    updateTag("subjects");

    return {
      success: true,
      message: "Subject created successfully",
      data: result,
    };
  } catch (error) {
    console.log(error);

    return { success: false, message: "Failed to create subject", data: null };
  }
}
