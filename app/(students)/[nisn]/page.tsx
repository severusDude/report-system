import { Pencil } from "lucide-react";

import { notFound } from "next/navigation";
import { getImageProps } from "next/image";
import { NISN_LENGTH } from "@/schemas/student";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import studentService from "@/services/students-service";
import { Card, CardContent } from "@/components/ui/card";
import { AttendanceType } from "@/generated/prisma/enums";
import enrollmentService from "@/services/enrollments-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { columns, EnrollmentTableData } from "./columns";
import { updateTag } from "next/cache";
import { ActionButton } from "@/components/action-button";

export default async function Page({
  params,
}: {
  params: Promise<{ nisn: string }>;
}) {
  const { nisn } = await params;

  if (isNaN(Number(nisn)) || nisn.length !== NISN_LENGTH) {
    return notFound();
  }

  // Fetch student
  const result = await studentService.getStudentByNISN({ nisn: nisn });
  if (!result.success) return notFound();

  const student = result.data!;

  // Fetch enrollment
  const enrollmentResult = await studentService.getStudentEnrollment({ nisn });

  // Helper function to split name into first and last
  const getFirstName = (fullName: string) => fullName.split(" ")[0];
  const getLastName = (fullName: string) =>
    fullName.split(" ").slice(1).join(" ") || "-";

  const { props: avatarProps } = getImageProps({
    src: student.imageUrl || "/user.svg",
    alt: student.name,
    width: 40,
    height: 40,
  });

  async function initEnrollments() {
    "use server";

    await enrollmentService.createEnrollment({
      studentId: student.id,
      subject: true,
      attendanceCount: 16,
    });

    updateTag("enrollments");
  }

  // Transform data for the table
  const tableData: EnrollmentTableData[] =
    enrollmentResult.data?.map((enrollment, index) => {
      const presentCount = enrollment.attendances.filter(
        (a) => a.type === AttendanceType.PRESENT
      ).length;
      const totalCount = enrollment.attendances.length;
      const percentage = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;

      return {
        id: enrollment.id,
        rowNumber: index + 1,
        subject: {
          name: enrollment.subject.name,
          type: enrollment.subject.type,
        },
        attendanceRate: {
          present: presentCount,
          total: totalCount,
          percentage: percentage,
        },
        teacherName: enrollment.teacher.name,
        grade: enrollment.grade,
      };
    }) ?? [];

  return (
    <div className="max-w-screen w-screen p-8 overflow-x-hidden">
      {/* Page Title */}
      <h1 className="text-2xl font-bold w-fit mb-2">{student.name} Profile</h1>
      <div className="flex items-start justify-start gap-4">
        <div className="flex flex-col gap-4 min-w-fit flex-1">
          {/* Profile Header Card */}
          <Card>
            <CardContent className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 outline">
                  <AvatarImage {...avatarProps} />
                  <AvatarFallback className="bg-purple-500 text-white text-2xl">
                    {getFirstName(student.name).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{student.name}</h2>
                  <p className="text-sm text-gray-400">
                    {student.email || "-"}
                  </p>
                  <p className="text-sm text-gray-500">{student.nisn}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </CardContent>
          </Card>

          {/* Personal Information Card */}
          <Card>
            <CardContent className="px-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {/* First Name */}
                <div>
                  <label className="text-sm text-gray-500">First Name</label>
                  <p className="mt-1 font-medium">
                    {getFirstName(student.name)}
                  </p>
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-sm text-gray-500">Last Name</label>
                  <p className="mt-1 font-medium">
                    {getLastName(student.name)}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-gray-500">Email address</label>
                  <p className="mt-1 font-medium">
                    {student.email || student.parent.email}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="mt-1 font-medium">
                    {student.phoneNumber || "-"}
                  </p>
                </div>

                {/* Bio - Full width */}
                <div className="col-span-2">
                  <label className="text-sm text-gray-500">Bio</label>
                  <p className="mt-1 font-medium">{student.bio || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Card */}
          <Card>
            <CardContent className="px-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Address</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {/* Country */}
                <div>
                  <label className="text-sm text-gray-500">Country</label>
                  <p className="mt-1 font-medium">
                    {student.citizenship || "-"}
                  </p>
                </div>

                {/* NIK */}
                <div>
                  <label className="text-sm text-gray-500">
                    Nomor Induk Kependudukan
                  </label>
                  <p className="mt-1 font-medium">{student.nik || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex w-[80vw] flex-1">
          <ActionButton action={initEnrollments} />
          <DataTable columns={columns} data={tableData} />
        </div>
      </div>
    </div>
  );
}
