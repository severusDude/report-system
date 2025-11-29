import AuthenticatedLayout from "@/layouts/authenticated-layout";

function Page() {
  return (
    <AuthenticatedLayout header="Student Overview">
      <h1>Student Overview</h1>
    </AuthenticatedLayout>
  );
}

export default Page;
