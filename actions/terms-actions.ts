"use server";

import z from "zod";

import { ResponseData } from "@/types";
import { updateTag } from "next/cache";
import { Term } from "@/generated/prisma/browser";
import { TermCreateInput } from "@/schemas/terms";
import termService from "@/services/terms-service";

export async function createTerm(
  data: z.infer<typeof TermCreateInput>
): Promise<ResponseData<Term | null>> {
  try {
    const result = await termService.createTerm({ data: data });

    if (!result) {
      throw new Error("Failed to create term");
    }

    updateTag("terms");

    return {
      success: true,
      message: "Term created successfully",
      data: result,
    };
  } catch (error) {
    console.log(error);

    let errorMessage = "Failed to create term due to server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, message: errorMessage, data: null };
  }
}
