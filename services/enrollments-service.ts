import { prisma } from "@/lib/prisma";
import { ResponseData } from "@/types";
import userService from "@/services/users-service";
import { Enrollment } from "@/generated/prisma/client";

class EnrollmentService {
  async createEnrollment({
    studentId,
    subject,
    attendanceCount = 12, // default to 12 sessions
  }: {
    studentId: string;
    subject: boolean | string[];
    attendanceCount?: number;
  }): Promise<ResponseData<Enrollment[]>> {
    try {
      // Step 1: Resolve subjects based on input
      let subjects;

      if (subject === true) {
        // Get all subjects
        subjects = await prisma.subject.findMany();
      } else if (Array.isArray(subject)) {
        // Get subjects by names
        subjects = await prisma.subject.findMany({
          where: {
            name: {
              in: subject,
            },
          },
        });
      } else {
        return {
          success: false,
          message: "Invalid subject parameter",
          data: [],
        };
      }

      if (subjects.length === 0) {
        return {
          success: false,
          message: "No subjects found",
          data: [],
        };
      }

      // Step 2: Get latest teacher
      const teachers = await userService.getUsers({
        where: { role: "TEACHER" },
        orderBy: { createdAt: "desc" },
        take: 1,
      });

      if (teachers.length === 0) {
        return {
          success: false,
          message: "No teacher found in the system",
          data: [],
        };
      }

      const latestTeacher = teachers[0];

      // Step 3: Get latest term
      const latestTerm = await prisma.term.findFirst({
        orderBy: { createdAt: "desc" },
      });

      if (!latestTerm) {
        return {
          success: false,
          message: "No term found in the system",
          data: [],
        };
      }

      // Step 4: Create enrollments and attendances in transaction
      const createdEnrollments = await prisma.$transaction(async (tx) => {
        const enrollments: Enrollment[] = [];

        for (const subjectItem of subjects) {
          // Create enrollment
          const enrollment = await tx.enrollment.create({
            data: {
              studentId: studentId,
              subjectId: subjectItem.id,
              teacherId: latestTeacher.id,
              termId: latestTerm.id,
              grade: "UNSET",
            },
          });

          enrollments.push(enrollment);

          // Create n attendances for this enrollment
          await tx.attendance.createMany({
            data: Array.from({ length: attendanceCount }, (_, index) => ({
              studentId: studentId,
              enrollmentId: enrollment.id,
              session: index + 1,
              type: "UNSET",
            })),
          });
        }

        return enrollments;
      });

      return {
        success: true,
        message: `Successfully created ${createdEnrollments.length} enrollments with ${attendanceCount} attendance sessions each`,
        data: createdEnrollments,
      };
    } catch (error) {
      console.error("Error creating enrollment:", error);

      return {
        success: false,
        message: "Failed to create enrollments",
        data: [],
      };
    }
  }
}

const enrollmentService = new EnrollmentService();
export default enrollmentService;
