"use client";

import z from "zod";
import { Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const parents = [
  {
    id: "1",
    name: "First Parent",
  },
  {
    id: "2",
    name: "Second Parent",
  },
  {
    id: "3",
    name: "Third Parent",
  },
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  parent: z.string().min(1, "Parent is required"),
});

function CreateForm({ className, ...props }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      parent: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);

      return;
    }
  }

  return (
    <form
      className={(cn("flex flex-col gap-4"), className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        {/* Forms */}

        {/* Form/Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-name">Name</FieldLabel>
              <Input
                {...field}
                id="form-name"
                type="text"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Form/Parent */}
        <Controller
          name="parent"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-parent">Parent</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Actions */}
        <div className="flex w-full justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default CreateForm;
