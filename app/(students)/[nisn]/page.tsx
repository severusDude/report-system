import { Pencil } from "lucide-react";

import { notFound } from "next/navigation";
import { getImageProps } from "next/image";
import { NISN_LENGTH } from "@/schemas/student";
import { Button } from "@/components/ui/button";
import studentService from "@/services/students-service";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Page({
  params,
}: {
  params: Promise<{ nisn: string }>;
}) {
  const { nisn } = await params;

  if (isNaN(Number(nisn)) || nisn.length !== NISN_LENGTH) {
    return notFound();
  }

  const result = await studentService.getStudentByNISN({ nisn: nisn });
  if (!result.success) return notFound();

  const student = result.data!;

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

  return (
    <div className="flex flex-col gap-6 p-12 max-w-4xl">
      {/* Page Title */}
      <h1 className="text-2xl font-bold">{student.name} Profile</h1>

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
              <p className="text-sm text-gray-400">{student.email || "-"}</p>
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
              <p className="mt-1 font-medium">{getFirstName(student.name)}</p>
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm text-gray-500">Last Name</label>
              <p className="mt-1 font-medium">{getLastName(student.name)}</p>
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
              <p className="mt-1 font-medium">{student.phoneNumber || "-"}</p>
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
              <p className="mt-1 font-medium">{student.citizenship || "-"}</p>
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
  );
}
