import { Attachment } from "@/types/attachment";
import { NextResponse } from "next/server";

type ResponseData<T> = {
  success: boolean;
  message: string;
  data: T;
};

type AttachmentResponse = ResponseData<Attachment[]>;

export async function GET(_request: Request): Promise<NextResponse> {
  try {
    return NextResponse.json<AttachmentResponse>(
      {
        success: true,
        message: "Attachments fetched successfully",
        data: [],
      },
      { status: 200 }
    );
  } catch (_error) {
    return NextResponse.json<AttachmentResponse>(
      { success: false, message: "Error fetching attachments", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  if (request.method !== "POST") {
    return NextResponse.json<AttachmentResponse>(
      {
        success: false,
        message: "Method not allowed",
        data: [],
      },
      { status: 405 }
    );
  }

  try {
    const formData = await request.formData();
    const files: File[] = formData.getAll("files") as File[];

    // Check if files array is valid
    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json<AttachmentResponse>(
        {
          success: false,
          message: "No files provided",
          data: [],
        },
        { status: 400 }
      );
    }

    // Validate each file
    for (const file of files) {
      const validationError = _validateFile(file);
      if (validationError) {
        return NextResponse.json<AttachmentResponse>(
          {
            success: false,
            message: validationError,
            data: [],
          },
          { status: 400 }
        );
      }
    }

    const attachments = files.map((file) => ({
      id: undefined as unknown as string,
      filename: file.name,
      url: URL.createObjectURL(file),
      createdAt: "",
      updatedAt: "",
    }));

    return NextResponse.json<AttachmentResponse>(
      {
        success: true,
        message: "Files uploaded successfully",
        data: attachments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json<AttachmentResponse>(
      {
        success: false,
        message: `Error uploading files\n${error}`,
        data: [],
      },
      { status: 500 }
    );
  }
}

function _validateFile(file: File): string | null {
  const acceptedTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxSizeInBytes = 5 * 1024 * 1024;
  if (!acceptedTypes.includes(file.type)) {
    return `File type not accepted: ${file.type}`;
  }
  if (file.size > maxSizeInBytes) {
    return `File size limit exceeded: ${file.name}`;
  }
  return null;
}
