import z from "zod";

import { prisma } from "@/lib/prisma";
import { ResponseData } from "@/types";
import { unstable_cache } from "next/cache";
import { StudentUpsertSchema } from "@/schemas/student";
import { Prisma, Student } from "@/generated/prisma/client";
import {
  EnrollmentGetPayload,
  StudentGetPayload,
} from "@/generated/prisma/models";

class StudentService {
  getStudents = unstable_cache(
    async ({
      query = "",
    }: {
      query?: string;
    }): Promise<ResponseData<Student[]>> => {
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
    },
    ["students"],
    { tags: ["students"] }
  );

  async getStudentByNISN({
    nisn,
  }: {
    nisn: string;
  }): Promise<
    ResponseData<StudentGetPayload<{ include: { parent: true } }> | null>
  > {
    try {
      const result = await prisma.student.findUnique({
        where: {
          nisn: nisn,
        },
        include: {
          parent: true,
        },
      });

      if (!result) {
        return {
          success: false,
          message: "Failed to fetch student: Student not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Student fetched successfully",
        data: result,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: "Failed to fetch student: Student not found",
        data: null,
      };
    }
  }

  async upsertStudent(
    data: z.infer<typeof StudentUpsertSchema>
  ): Promise<ResponseData<Student | null>> {
    const { id, parentId, ...studentData } = data;

    let result: Student;

    // Check if nisn is unique
    const existingStudent = await prisma.student.findUnique({
      where: { nisn: studentData.nisn },
    });

    if (existingStudent) {
      return {
        success: false,
        message: "Failed to upsert student: NISN already exists",
        data: null,
      };
    }

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

  async deleteStudent(nisn: string): Promise<ResponseData<boolean>> {
    try {
      await prisma.student.delete({ where: { nisn } });
      return {
        success: true,
        message: "Student deleted successfully",
        data: true,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to delete student",
        data: false,
      };
    }
  }

  async indexStudentEnrollments({ nisn }: { nisn: string }): Promise<
    ResponseData<
      | EnrollmentGetPayload<{
          include: { subject: true };
        }>[]
      | null
    >
  > {
    try {
      const result = await prisma.student.findUnique({
        where: {
          nisn: nisn,
        },
        select: {
          enrollments: {
            include: {
              subject: true,
            },
          },
        },
      });

      if (!result) {
        return {
          success: false,
          message: "Failed to fetch student enrollments: Student not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Student enrollments fetched successfully",
        data: result.enrollments,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: "Server failed to fetch student enrollments",
        data: null,
      };
    }
  }

  async getStudentEnrollment({
    id,
  }: {
    id: string;
  }): Promise<
    ResponseData<EnrollmentGetPayload<{ include: { subject: true } }> | null>
  > {
    try {
      const result = await prisma.enrollment.findUnique({
        where: { id },
        include: {
          subject: true,
        },
      });

      if (!result) {
        return {
          success: false,
          message: "Failed to fetch student enrollment: Enrollment not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Student enrollment fetched successfully",
        data: result,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: "Server failed to fetch student enrollment",
        data: null,
      };
    }
  }
}

const studentService = new StudentService();
export default studentService;
