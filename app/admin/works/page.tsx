import AuthenticatedLayout from "@/layouts/authenticated-layout";
import CreateWorkForm from "./(forms)/create";

function Page() {
  return (
    <AuthenticatedLayout header="Works">
      <h1>Works</h1>

      <CreateWorkForm />
    </AuthenticatedLayout>
  );
}

export default Page;
