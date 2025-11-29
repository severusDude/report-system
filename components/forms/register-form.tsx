"use client";

import { Activity, useState } from "react";

import z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

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
    password: passwordSchema,
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Submit to API
    try {
      console.log(data);

      // TODO: Submit to API
    } catch (error) {
      console.error("Failed to create user: ", error);
    } finally {
      setIsSubmitting(false);
    }

    return;
  }

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        {/* Title */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-primary">
            Create your account
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Form */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-name">Full name</FieldLabel>
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

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-password">Password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="form-password"
                  type={showPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  className="bg-background"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
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
              <FieldLabel htmlFor="form-password2">Confirm password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id="form-password2"
                  type={showPassword2 ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  className="bg-background"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                >
                  {showPassword2 ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <FieldDescription>Please confirm your password</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Actions */}
      <div className="flex flex-col justify-center w-full gap-2 mt-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          <Activity mode={isSubmitting ? "visible" : "hidden"}>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          </Activity>
          {!isSubmitting ? "Create account" : "Creating..."}
        </Button>

        <p className="mt-4 text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Log in
          </Link>
        </p>

        <div></div>
      </div>
    </form>
  );
}

export default RegisterForm;
