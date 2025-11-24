import WorkUploadForm from "@/components/forms/work-upload-form";
import AuthenticatedLayout from "@/layouts/authenticated-layout";

function FileUpload() {
  return (
    <AuthenticatedLayout header="File Upload">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">File Upload Page</h1>
        <p>This is the file upload page content.</p>
      </div>

      <WorkUploadForm />
    </AuthenticatedLayout>
  );
}

export default FileUpload;
