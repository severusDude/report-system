import studentService from "@/services/students-service";
import AuthenticatedLayout from "@/layouts/authenticated-layout";

import StudentTable from "./table";

export default async function Page() {
  const students = await studentService.getStudents({});

  return (
    <AuthenticatedLayout header="Students">
      <StudentTable data={students.data} name="Students data" />
    </AuthenticatedLayout>
  );
}
