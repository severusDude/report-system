import AuthenticatedLayout from "@/layouts/authenticated-layout";

export default function Page() {
  return (
    <AuthenticatedLayout header="Students">
      <header className="flex w-full justify-between">
        <h1>Students</h1>
      </header>
    </AuthenticatedLayout>
  );
}
