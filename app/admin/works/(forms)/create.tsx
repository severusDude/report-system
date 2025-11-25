"use client";

import { useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUploadField from "@/components/forms/files-input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
});

function WorkUploadForm() {
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
    form.setValue("files", newFiles, { shouldValidate: true });
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      toast.success("Files uploaded successfully");
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
      </FieldGroup>
      <div className="pt-2 flex gap-2 w-full justify-end">
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
          {isSubmitting ? "Uploading..." : "Submit Work"}
        </Button>
      </div>
    </form>
  );
}

export default WorkUploadForm;
