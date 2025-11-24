import AuthenticatedLayout from "@/layouts/authenticated-layout";
import FileUploadField from "@/components/forms/files-input";

function FileUpload() {
  return (
    <AuthenticatedLayout header="File Upload">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">File Upload Page</h1>
        <p>This is the file upload page content.</p>

        {/* <form>
          <input type="file" />
          <button type="submit">Upload</button>
        </form> */}
        <FileUploadField />
      </div>
    </AuthenticatedLayout>
  );
}

export default FileUpload;
