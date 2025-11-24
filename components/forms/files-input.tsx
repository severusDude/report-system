"use client";

import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

function FileUploadField() {
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-6 text-center transition-all ease-in-out group",
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-primary cursor-pointer"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        disabled={isDisabled}
        className="absolute inset-0 w-full h-full opacity-0"
      />
      <Upload
        className={cn(
          "size-12 mx-auto mb-4 transition-all ease-in-out text-neutral-800",
          !isDisabled && "group-hover:text-primary"
        )}
      />
      <div className="space-y-2">
        <p className="text-sm">Drag and drop files here or click to upload</p>
        <p className="text-xs text-gray-500">
          Supported formats: .jpg, .png, .pdf
        </p>
      </div>
    </div>
  );
}

export default FileUploadField;
