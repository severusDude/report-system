import { Attachment } from "@/types/attachment";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { file } from "zod";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

type ResponseData<T> = {
  success: boolean;
  message: string;
  data: T;
};

type AttachmentResponse = ResponseData<Attachment[]>;

interface CloudUploadResult {
  public_id: string;
  secure_url: string;
  created_at?: string;
}

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

    // Upload files to Cloudinary
    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "attachments",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
    });

    const uploadResults = (await Promise.all(
      uploadPromises
    )) as CloudUploadResult[];

    const attachments = uploadResults.map((result: CloudUploadResult) => ({
      id: result.public_id,
      // filename: result.original_filename || result.public_id,
      filename: file.name,
      url: result.secure_url,
      createdAt: result.created_at ?? new Date().toISOString(),
      updatedAt: result.created_at ?? new Date().toISOString(),
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
