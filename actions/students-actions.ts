"use server";

import z from "zod";

import { ResponseData } from "@/types";
import { updateTag } from "next/cache";
import { Student } from "@/generated/prisma/client";
import { StudentUpsertSchema } from "@/schemas/student";
import studentService from "@/services/students-service";

export async function saveStudent(
  data: z.infer<typeof StudentUpsertSchema>
): Promise<ResponseData<Student | null>> {
  try {
    // const result = await studentService.createStudent(data);
    const result = await studentService.upsertStudent(data);

    if (!result.success) {
      throw new Error(result.message || "Failed to create student");
    }

    updateTag("students");

    return {
      success: true,
      message: "Student created successfully",
      data: result.data,
    };
  } catch (error) {
    console.log("Failed to create student: ", error);

    let errorMessage = "Failed to create student due to server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
}

export async function deleteStudent(nisn: string) {
  try {
    const result = await studentService.deleteStudent(nisn);

    if (!result.success) {
      throw new Error(result.message || "Failed to delete student");
    }

    updateTag("students");
  } catch (error) {
    console.log("Failed to delete student due to server error: ", error);
  }
}
