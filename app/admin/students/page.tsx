import AuthenticatedLayout from "@/layouts/authenticated-layout";
import UpsertForm from "@/app/admin/students/(forms)/upsert";
import studentService from "@/services/students-service";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default async function Page() {
  const students = await studentService.getStudents({});

  return (
    <AuthenticatedLayout header="Students">
      <header className="flex w-full justify-between">
        <h1>Students</h1>
      </header>
      <DataTable columns={columns} data={students.data} />

      {/* <UpsertForm mode="create" /> */}
    </AuthenticatedLayout>
  );
}
