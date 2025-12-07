"use server";

import { APIError } from "better-auth";

import { auth } from "@/lib/auth";
import { ResponseData } from "@/types";
import { headers } from "next/headers";

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
      headers: await headers(),
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
      headers: await headers(),
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

export async function signOut(): Promise<ResponseData<string>> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      message: "User logged out successfully",
      data: "",
    };
  } catch (error) {
    console.error("Error logging out user: ", error);

    return {
      success: false,
      message: "Error logging out user",
      data: "",
    };
  }
}
