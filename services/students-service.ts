import z from "zod";

import { prisma } from "@/lib/prisma";
import { ResponseData } from "@/types";
import { Prisma, Student } from "@/generated/prisma/client";
import { StudentUpsertSchema } from "@/schemas/student";

class StudentService {
  async getStudents({
    query = "",
  }: {
    query?: string;
  }): Promise<ResponseData<Student[]>> {
    // If no query is provided, return all students
    if (!query) {
      const result = await prisma.student.findMany();

      return {
        success: true,
        message: "Students fetched successfully",
        data: result,
      };
    }

    const result = await prisma.student.findMany({
      where: { name: { contains: query } },
    });

    return {
      success: true,
      message: "Students fetched successfully",
      data: result,
    };
  }

  async upsertStudent(
    data: z.infer<typeof StudentUpsertSchema>
  ): Promise<ResponseData<Student | null>> {
    const { id, parentId, ...studentData } = data;

    let result: Student;

    if (id) {
      // Updating existing student
      try {
        result = await prisma.student.update({
          where: { id },
          data: studentData as Prisma.StudentUpdateInput,
        });
      } catch (error) {
        console.log(error);

        return {
          success: false,
          message: "Failed to update student: Student not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Student updated successfully",
        data: result,
      };
    } else {
      // Creating new student
      try {
        result = await prisma.student.create({
          data: {
            ...studentData,
            parent: {
              connect: { id: parentId },
            },
          } as Prisma.StudentCreateInput,
        });
      } catch (error) {
        console.log(error);

        return {
          success: false,
          message: "Failed to create student",
          data: null,
        };
      }

      return {
        success: true,
        message: "Student created successfully",
        data: result,
      };
    }
  }
}

const studentService = new StudentService();
export default studentService;
