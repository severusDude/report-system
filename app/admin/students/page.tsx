import AuthenticatedLayout from "@/layouts/authenticated-layout";
import CreateForm from "@/app/admin/students/(forms)/create";

export default function Page() {
  return (
    <AuthenticatedLayout header="Students">
      <header className="flex w-full justify-between">
        <h1>Students</h1>
      </header>
      <CreateForm />
    </AuthenticatedLayout>
  );
}
