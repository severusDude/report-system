"use client";

import { useState } from "react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Parent {
  id: string;
  name: string;
}

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
] as Parent[];

const formSchema = z.object({
  name: z.string().min(1, "Full name is required").max(70, "Name is too long"),
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

  const [isOpen, setIsOpen] = useState(false);
  const [parentValue, setParentValue] = useState("");

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
                placeholder="Full name, e.g. John Doe"
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
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Input
                    {...field}
                    id="form-parent"
                    type="text"
                    autoComplete="off"
                    placeholder="Select the student's parent"
                    aria-invalid={fieldState.invalid}
                    contentEditable={false}
                    value={parentValue}
                    onClick={() => setIsOpen(true)}
                    readOnly
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search for parent" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {parents.map((parent) => (
                          <CommandItem
                            key={parent.id}
                            value={parent.name}
                            onSelect={(currentValue) => {
                              setParentValue(
                                currentValue === parentValue ? "" : currentValue
                              );
                              setIsOpen(false);
                              form.setValue("parent", parent.name);
                            }}
                          >
                            {parent.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
