import AuthenticatedLayout from "@/components/authenticated-layout";

function FileUpload() {
  return (
    <AuthenticatedLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">File Upload Page</h1>
        <p>This is the file upload page content.</p>
      </div>
    </AuthenticatedLayout>
  );
}

export default FileUpload;
