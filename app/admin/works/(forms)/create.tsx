"use client";

import { Activity, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import {
  File as FileIcon,
  Image as ImageIcon,
  Loader2,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";

import { ResponseData } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Attachment } from "@/types/attachment";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { createStudentWork } from "@/services/work-service";
import FileUploadField from "@/components/forms/files-input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

type AddedFile = {
  file: File;
  status: "success" | "failed";
};

function formatFileSize(size: number): string {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(0)} KB`;
  } else {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  }
}

function FileList({
  addedFiles,
  onRemove,
  onRetry,
}: {
  addedFiles: AddedFile[];
  onRemove: (index: number) => void;
  onRetry: (index: number) => void;
}) {
  return (
    <Activity mode={addedFiles.length > 0 ? "visible" : "hidden"}>
      <div className="flex flex-col gap-2">
        {addedFiles.map((added, index) => {
          const { file, status } = added;
          const sizeStr = formatFileSize(file.size);

          return (
            <Card key={file.name}>
              <CardContent>
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="flex items-center gap-2">
                    {/* File icon */}
                    {file.type.endsWith("pdf") ? (
                      <FileIcon className="w-8 h-8 text-muted-foreground" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}

                    {/* File info */}
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-md">{file.name}</span>
                      <p className="text-sm text-muted-foreground">
                        {sizeStr} |{" "}
                        {status === "success"
                          ? "Ready for upload"
                          : "Failed to upload"}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-2 text-muted-foreground">
                    {status === "success" ? (
                      <Button size="icon" onClick={() => onRemove(index)}>
                        <Trash2
                          className="w-8 h-8"
                          onClick={() => onRemove(index)}
                        />
                      </Button>
                    ) : (
                      <>
                        <Button size="icon" onClick={() => onRetry(index)}>
                          <RotateCcw className="w-8 h-8" />
                        </Button>
                        <Button size="icon" onClick={() => onRemove(index)}>
                          <X className="w-8 h-8" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Activity>
  );
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
});

function CreateWorkForm() {
  const [addedFiles, setAddedFiles] = useState<AddedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      files: [],
    },
  });

  const handleFilesChange = (newFiles: File[]) => {
    // const compressedFiles = await Promise.all(
    //   newFiles.map(async (file) => {
    //     // Compression logic
    //     return file;
    //   })
    // );
    const processed: AddedFile[] = newFiles.map((file) => {
      const status: "success" | "failed" = "success";
      return { file, status };
    });

    const newSuccessFiles = processed
      .filter((file) => file.status === "success")
      .map((file) => file.file);

    const currentFormFiles = form.getValues("files");
    const updatedFormFiles = [...currentFormFiles, ...newSuccessFiles];

    form.setValue("files", updatedFormFiles, { shouldValidate: true });
    setAddedFiles((prev) => [...prev, ...processed]);

    // form.setValue("files", newFiles, { shouldValidate: true });
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");

    data.files.forEach((file) => {
      formData.append("files", file);
    });

    // Submit to API
    try {
      const response = await fetch("/api/attachments", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as ResponseData<Attachment[]>;

      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      // Update database
      const responseWork = await createStudentWork({
        studentId: "cmievzvgp0005fkez1f57m0rj", // TODO: Get from session
        title: data.title,
        description: data.description,
        attachments: result.data,
      });

      if (!responseWork.success) {
        throw new Error(responseWork.message || "Failed to create work");
      }

      toast.success(responseWork.message || "Work created successfully");
      form.reset();
      form.setValue("files", []);
    } catch (error) {
      console.error("Upload error: ", error);

      let errorMessage = "Failed to upload files";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  function onRemove(index: number) {
    const removed = addedFiles[index];
    setAddedFiles(addedFiles.filter((_, i) => i !== index));

    // Remove processed images from form
    if (removed.status === "success") {
      const currentFormFiles = form.getValues("files");
      const updatedFormFiles = currentFormFiles.filter(
        (file) => file !== removed.file
      );

      form.setValue("files", updatedFormFiles, { shouldValidate: true });
    }
  }

  function onRetry(index: number) {
    const item = addedFiles[index];
    if (item.status === "failed" && !item.file.type.endsWith("/pdf")) {
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-work-title">
                Work Title
              </FieldLabel>
              <Input
                {...field}
                id="form-create-work-title"
                aria-invalid={fieldState.invalid}
                placeholder="Student's work title"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-work-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="form-create-work-description"
                aria-invalid={fieldState.invalid}
                placeholder="Work description"
                autoComplete="off"
                className="resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="files"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-create-work-files">
                Attachments
              </FieldLabel>
              <FileUploadField
                files={field.value || []}
                onChange={handleFilesChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Added files */}
        <FileList
          addedFiles={addedFiles}
          onRemove={onRemove}
          onRetry={onRetry}
        />
      </FieldGroup>
      <div className="flex justify-end w-full gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
            form.setValue("files", []);
          }}
        >
          Reset
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Activity mode={isSubmitting ? "visible" : "hidden"}>
            <Loader2 className="mr-2 animate-spin" />
          </Activity>
          {isSubmitting ? "Uploading..." : "Submit Work"}
        </Button>
      </div>
    </form>
  );
}

export default CreateWorkForm;
