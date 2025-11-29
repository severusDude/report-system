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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const formSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data);

      // TODO: Submit to API
    } catch (error) {
      console.error("Failed to create user: ", error);
    } finally {
      setIsSubmitting(false);
    }
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
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-email">Email address</FieldLabel>
              <Input
                {...field}
                id="form-email"
                type="email"
                placeholder="m@example.com"
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
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-0 right-0 px-3 bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </Field>
          )}
        />

        {/* Actions */}
        <div className="flex flex-col justify-center w-full gap-2 mt-2">
          <Button type="submit" disabled={isSubmitting}>
            <Activity mode={isSubmitting ? "visible" : "hidden"}>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            </Activity>
            {isSubmitting ? "Loading..." : "Login"}
          </Button>

          <p className="mt-4 text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Register
            </Link>
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}

export default LoginForm;
