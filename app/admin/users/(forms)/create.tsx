"use client";

import { Activity, useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { capitalize, cn } from "@/lib/utils";
import { User } from "@/lib/auth";
import { ResponseData } from "@/types";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Role } from "@/generated/prisma/enums";
import { createUser } from "@/actions/users-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(12, "Password must be at most 12 characters")
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  });

const formSchema = z
  .object({
    email: z.email().min(1, "Email is required"),
    name: z
      .string()
      .min(1, "Full name is required")
      .max(70, "Full name is too long"),
    role: z.enum(Role).or(z.null()),
    password: passwordSchema,
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();

  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      role: null,
      password: "",
      password2: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  async function onSubmit(data: z.output<typeof formSchema>) {
    try {
      const result = (await createUser({
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role as Role,
      })) as ResponseData<User | null>;

      if (!result.success) {
        throw new Error(result.message || "Failed to create user");
      }

      toast.success(`User ${data.name} created successfully`);
      form.reset();
      router.push("/admin/users");
    } catch (error) {
      console.error("Failed to create user: ", error);

      toast.error("Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className={cn(
        "p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border max-w-3xl mx-auto",
        className
      )}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        {/* Title */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-primary">Create an account</h1>
          <p className="text-sm text-center text-muted-foreground">
            Fill in the form below to create an account
          </p>
        </div>

        {/* Form */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-name" required>
                Full name
              </FieldLabel>
              <Input
                {...field}
                id="form-name"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex gap-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-email" required>
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="form-email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-xs">
                <FieldLabel htmlFor="role" required>
                  Role{" "}
                </FieldLabel>

                <Select
                  value={field.value ?? ("" as string as Role)}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="User role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Role).map((role) => (
                      <SelectItem key={role} value={role as string as Role}>
                        {capitalize(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-password" required>
                Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="form-password"
                  type={showPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <Activity
                mode={
                  field.value.length > 0 || fieldState.invalid
                    ? "hidden"
                    : "visible"
                }
              >
                <FieldDescription>
                  Must be at least 8 characters
                </FieldDescription>
              </Activity>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password2"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-password2" required>
                Confirm password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="form-password2"
                  type={showPassword2 ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              <FieldDescription>Please confirm the password</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
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
          {isSubmitting && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
