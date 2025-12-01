import AuthenticatedLayout from "@/layouts/authenticated-layout";
import UpsertForm from "@/app/admin/students/(forms)/upsert";

export default function Page() {
  return (
    <AuthenticatedLayout header="Students">
      <header className="flex w-full justify-between">
        <h1>Students</h1>
      </header>
      <UpsertForm mode="create" />
    </AuthenticatedLayout>
  );
}
