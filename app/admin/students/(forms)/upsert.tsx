"use client";

import { Activity, useEffect, useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { CalendarDays, Loader2, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@uidotdev/usehooks";
import { User } from "@/generated/prisma/client";
import { Gender } from "@/generated/prisma/browser";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchParents } from "@/actions/users-actions";
import { saveStudent } from "@/actions/students-actions";
import { StudentUpsertSchema as formSchema } from "@/schemas/student";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { NumericalInput } from "@/components/ui/numerical-input";

type FormValues = z.input<typeof formSchema>;

interface FormProps extends React.ComponentProps<"form"> {
  mode: "create" | "update";
  initialValues?: FormValues & { id: string; parentName?: string };
  onSuccess?: () => void;
}

function UpsertForm({
  mode,
  initialValues,
  onSuccess,
  className,
  ...props
}: FormProps) {
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      gender: null,
      parentId: "",
      nisn: "",
      nik: "",
      citizenship: "",
      familyCardNumber: "",
      birthPlace: "",
      dateOfBirth: null,
    },
  });

  // Form controls
  const [isSearchParentOpen, setIsSearchParentOpen] = useState(false);
  const [isDobOpen, setIsDobOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parents
  const [parents, setParents] = useState<User[]>([]);
  const [selectedParent, setSelectedParent] = useState(
    initialValues?.parentId ?? ""
  );

  // Search
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

  function handleReset() {
    setIsSearchParentOpen(false);
    setSelectedParent(initialValues?.parentId ?? "");
    setQuery("");
    setParents([]);

    form.reset(initialValues ?? {});
  }

  async function onSubmit(data: z.output<typeof formSchema>) {
    try {
      console.log(data);

      setIsSubmitting(true);

      if (mode === "create") {
        const result = await saveStudent(data);

        if (!result.success) {
          throw new Error(result.message || "Failed to create student");
        }

        handleReset();
        toast.success(`Student ${data.name} created successfully`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);

        return;
      }

      console.error(error);
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
              <FieldLabel htmlFor="form-name" required>
                Name
              </FieldLabel>
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
          name="parentId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-parentId" required>
                Parent
              </FieldLabel>
              <Popover
                open={isSearchParentOpen}
                onOpenChange={setIsSearchParentOpen}
              >
                <PopoverTrigger asChild>
                  <Input
                    {...field}
                    id="form-parentId"
                    type="text"
                    autoComplete="off"
                    placeholder="Select the student's parent"
                    aria-invalid={fieldState.invalid}
                    contentEditable={false}
                    value={selectedParent}
                    onClick={() => setIsSearchParentOpen(true)}
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
                            onSelect={() => {
                              const newName =
                                parent.name === selectedParent
                                  ? ""
                                  : parent.name;
                              setSelectedParent(newName);

                              form.setValue(
                                "parentId",
                                newName ? parent.id : ""
                              );

                              setIsSearchParentOpen(false);
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

        {/* Form/Gender */}
        <Controller
          name="gender"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="form-gender">Gender</FieldLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                value={field.value ? field.value : undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Gender.MALE}>Male</SelectItem>
                  <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Form/Date of Birth */}
        <Controller
          name="dateOfBirth"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-dob">Date of Birth</FieldLabel>
              <Popover open={isDobOpen} onOpenChange={setIsDobOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-between text-gray-500 hover:text-gray-500 font-normal"
                  >
                    {field.value
                      ? field.value.toLocaleDateString("en-GB")
                      : "Select Date"}
                    <CalendarDays />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? field.value : undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.onChange(date);
                      setIsDobOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Form/Birth Place */}
        <Controller
          name="birthPlace"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-birth-place">Birth Place</FieldLabel>
              <Input
                {...field}
                id="form-birth-place"
                type="text"
                placeholder="Birth Place"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Form/NISN */}
        <Controller
          name="nisn"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-nisn" required>
                NISN
              </FieldLabel>
              {/* <Input
                {...field}
                id="form-nisn"
                type="text"
                placeholder="NISN"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                onKeyDown={handleNumericalInput}
                onPaste={handleNumericalPaste}
              /> */}
              <NumericalInput
                {...field}
                id="form-nisn"
                type="text"
                placeholder="NISN"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Form/Family Card Number */}
        <Controller
          name="familyCardNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-family-card-number">
                Family Card Number
              </FieldLabel>
              <NumericalInput
                {...field}
                id="form-family-card-number"
                type="text"
                placeholder="Family Card Number"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Form/NIK */}
        <Controller
          name="nik"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-nik">NIK</FieldLabel>
              <NumericalInput
                {...field}
                id="form-nik"
                type="text"
                placeholder="NIK"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Form/Citizenship */}
        <Controller
          name="citizenship"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-citizenship">Citizenship</FieldLabel>
              <Input
                {...field}
                id="form-citizenship"
                type="text"
                placeholder="Citizenship"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Actions */}
        <div className="flex w-full justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            <Trash2 className="mr-1 h-4 w-4" />
            {mode === "update" ? "Reset" : "Clear"}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !form.formState.isValid}
          >
            <Activity mode={isSubmitting ? "visible" : "hidden"}>
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            </Activity>
            {
              // What the hell with this ternary operators man??
              isSubmitting ? "Saving..." : mode === "update" ? "Update" : "Save"
            }
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export default UpsertForm;
