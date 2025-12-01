"use server";

import z from "zod";

import { ResponseData } from "@/types";
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

    return {
      success: true,
      message: "Student created successfully",
      data: result.data,
    };
  } catch (error) {
    console.log("Failed to create student: ", error);

    return {
      success: false,
      message: "Failed to create student due to server error",
      data: null,
    };
  }
}
