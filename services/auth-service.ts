"use server";

import { APIError } from "better-auth";

import { auth } from "@/lib/auth";
import { ResponseData } from "@/types";

export async function signUp({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<ResponseData<string>> {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return {
      success: true,
      message: "User created successfully",
      data: "",
    };
  } catch (_error) {
    // console.log(_error);

    return {
      success: false,
      message: "Error creating user",
      data: "",
    };
  }
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ResponseData<string>> {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "User logged in successfully",
      data: "",
    };
  } catch (error) {
    // console.log(error);

    // Check for unauthorized error
    if (error instanceof APIError && error.statusCode === 401) {
      return {
        success: false,
        message: "Invalid email or password",
        data: "",
      };
    }

    return {
      success: false,
      message: "Error logging in user",
      data: "",
    };
  }
}
