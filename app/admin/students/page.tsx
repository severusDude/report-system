import studentService from "@/services/students-service";
import AuthenticatedLayout from "@/layouts/authenticated-layout";

import StudentTable from "./table";

export default async function Page() {
  const students = await studentService.getStudents({});

  return (
    <AuthenticatedLayout header="Students">
      <header className="flex w-full justify-between">
        <h1>Students</h1>
      </header>

      <StudentTable data={students.data} name="test" />

      {/* <UpsertForm mode="create" /> */}
    </AuthenticatedLayout>
  );
}
