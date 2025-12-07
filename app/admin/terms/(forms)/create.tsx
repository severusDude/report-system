"use client";

import { useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { CalendarIcon, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { createTerm } from "@/actions/terms-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TermCreateSchema as formSchema,
  TermCreateInput,
} from "@/schemas/terms";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CreateForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();

  const form = useForm<z.input<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateRange: undefined,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: z.output<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const _parsed = TermCreateInput.parse(data);

      const result = await createTerm(_parsed);

      if (!result.success) {
        throw new Error(result.message || "Failed to create term");
      }

      form.reset();
      toast.success(`Term ${data.name} created successfully`);
      router.push("/admin/terms");
    } catch (error) {
      console.log(error);

      toast.error("Failed to create term");
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
              <FieldLabel htmlFor="name">Name </FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                aria-invalid={fieldState.invalid}
                placeholder="Term name..."
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="dateRange"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-full"
              >
                <FieldLabel htmlFor="dateRange" required>
                  Term range
                </FieldLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-start font-normal active:scale-none",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="size-4" />
                        {field.value ? (
                          <div className="flex items-center gap-x-1">
                            <span>
                              {field.value.from.toLocaleDateString("id-ID", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-muted-foreground">-</span>
                            <span>
                              {field.value.to.toLocaleDateString("id-ID", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        ) : (
                          <span>Select a date</span>
                        )}
                      </Button>
                      {fieldState.isDirty && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-1/2 end-0 -translate-y-1/2 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            form.resetField("dateRange");
                          }}
                        >
                          <X />
                        </Button>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <div className="flex justify-end items-center w-full gap-2">
        <Button
          variant="outline"
          disabled={isSubmitting || !form.formState.isDirty}
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button disabled={isSubmitting || !form.formState.isValid}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default CreateForm;
