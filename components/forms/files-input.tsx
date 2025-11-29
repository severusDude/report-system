"use client";

import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const fileTypes = [".jpg", ".png", ".pdf"];

function FileUploadField({
  files = [],
  onChange = () => {},
  fileType = fileTypes,
}: {
  files?: File[];
  onChange?: (files: File[]) => void;
  fileType?: string[];
}) {
  const [isDisabled, _setIsDisabled] = useState(false);
  const [_isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFileAdded(fileList: FileList) {
    const newFiles = Array.from(fileList);

    // check if the added files is acceptable
    for (const file of newFiles) {
      const extension = `.${file.name.split(".").pop()}`;
      if (!fileType.includes(extension)) {
        toast.error(`File type not supported: ${extension}`);
        return;
      }
    }

    const updatedFiles = [...files, ...newFiles];
    onChange(updatedFiles);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (newFiles.length > 1) {
      toast.success(`Added ${newFiles.length} files`);
    } else {
      const latestFile = newFiles[newFiles.length - 1];
      toast.success(`Added file: ${latestFile.name}`);
    }

    console.log("Current files:", updatedFiles);
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (isDisabled) return;

    if (event.target.files) {
      handleFileAdded(event.target.files);
    }
  }

  // Drag handlers
  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    if (isDisabled) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (isDisabled) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    if (isDisabled) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    if (isDisabled) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (event.dataTransfer.files) {
      handleFileAdded(event.dataTransfer.files);
    }
  }

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-6 text-center transition-all ease-in-out group",
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-primary cursor-pointer"
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        disabled={isDisabled}
        accept={fileType.join(",")}
        onChange={handleFileSelect}
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
