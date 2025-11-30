"use client";

import { Activity, useEffect, useState } from "react";

import z from "zod";
import { Loader2, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@uidotdev/usehooks";
import { User } from "@/generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchParents } from "@/actions/users-actions";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [parents, setParents] = useState<User[]>([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [query, setQuery] = useState(""); // Search query for parents
  const debounceQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchParents() {
      if (!debounceQuery) {
        return;
      }

      try {
        const data = await searchParents({ query: debounceQuery });
        setParents(data.data);
      } catch (error) {
        console.log("Error fetching parents: ", error);
        setParents([]);
      }
    }

    fetchParents();
  }, [debounceQuery]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data);

      setIsSubmitting(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
                    value={selectedParent}
                    onClick={() => setIsOpen(true)}
                    readOnly
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search for parent"
                      onValueChange={setQuery}
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {parents.map((parent) => (
                          <CommandItem
                            key={parent.id}
                            value={parent.name}
                            onSelect={(currentValue) => {
                              setSelectedParent(
                                currentValue === selectedParent
                                  ? ""
                                  : currentValue
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
              setIsOpen(false);
              setSelectedParent("");
              setQuery("");
              setParents([]);

              form.reset();
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Activity mode={isSubmitting ? "visible" : "hidden"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Activity>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default CreateForm;
