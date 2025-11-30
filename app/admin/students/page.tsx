import AuthenticatedLayout from "@/layouts/authenticated-layout";
import Form from "@/app/admin/students/(forms)/form";

export default function Page() {
  return (
    <AuthenticatedLayout header="Students">
      <header className="flex w-full justify-between">
        <h1>Students</h1>
      </header>
      <Form mode="create" />
    </AuthenticatedLayout>
  );
}
