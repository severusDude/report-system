"use client";

import { useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubjectType } from "@/generated/prisma/enums";
import { createSubject } from "@/actions/subjects-actions";
import { SubjectCreateSchema as formSchema } from "@/schemas/subject";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";

export function CreateForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      type: SubjectType.GENERAL,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: z.output<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      const result = await createSubject(data);

      if (!result.success) {
        throw new Error(result.message || "Failed to create subject");
      }

      toast.success(`Subject ${data.name} created successfully`);
      router.push("/admin/subjects");
    } catch (error) {
      console.log(error);

      toast.error("Failed to create subject");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      {...props}
      onSubmit={form.handleSubmit(onSubmit)}
      className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border max-w-3xl mx-auto"
    >
      <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full"
            >
              <FieldLabel htmlFor="name" required>
                Name
              </FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Subject name"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 [&_p]:pb-2 col-span-full"
            >
              <FieldLabel htmlFor="type" required>
                Subject type
              </FieldLabel>

              <ToggleGroup
                variant="outline"
                value={field.value}
                onValueChange={field.onChange}
                type="single"
                className="flex justify-start items-center flex-wrap"
              >
                <ToggleGroupItem value={SubjectType.GENERAL}>
                  General
                </ToggleGroupItem>
                <ToggleGroupItem value={SubjectType.ISLAMIC}>
                  Islamic
                </ToggleGroupItem>
              </ToggleGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-end items-center w-full gap-2">
        <Button
          variant="outline"
          onClick={() => form.reset()}
          disabled={!form.formState.isDirty}
        >
          Reset
        </Button>
        <Button disabled={isSubmitting || !form.formState.isValid}>
          {isSubmitting && <Loader2 className="mr-1 animate-spin" />}
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
