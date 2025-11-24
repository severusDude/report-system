"use client";

import { useState } from "react";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUploadField from "@/components/forms/files-input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "../ui/button";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
});

function WorkUploadForm() {
  const [files, setFiles] = useState<File[]>([]);

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
    setFiles(newFiles);
  };

  function onSubmit(data: z.infer<typeof formSchema>) {}

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
                autoComplete="title"
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
                autoComplete="description"
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
              <FieldLabel htmlFor="form-create-work-files">Files</FieldLabel>
              <FileUploadField files={files} onChange={handleFilesChange} />
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
          }}
        >
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default WorkUploadForm;
