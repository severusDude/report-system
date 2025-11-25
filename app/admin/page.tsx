import AuthenticatedLayout from "@/layouts/authenticated-layout";

export default function Page() {
  return (
    <AuthenticatedLayout header="Dashboard">
      <h1>Dashboard</h1>
    </AuthenticatedLayout>
  );
}
