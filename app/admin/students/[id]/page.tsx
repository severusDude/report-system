import WorkUploadForm from "@/components/forms/work-upload-form";
import AuthenticatedLayout from "@/layouts/authenticated-layout";

function Page() {
  return (
    <AuthenticatedLayout header="Add student work">
      <h1 className="text-2xl font-bold mb-4">File Upload Page</h1>

      <WorkUploadForm />
    </AuthenticatedLayout>
  );
}

export default Page;
