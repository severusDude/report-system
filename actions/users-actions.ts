"use server";

import { ResponseData } from "@/types";
import { updateTag } from "next/cache";
import { User as AuthUser } from "@/lib/auth";
import userService from "@/services/users-service";
import { Role, User } from "@/generated/prisma/client";

export async function createUser({
  email,
  password,
  name,
  role,
}: {
  email: string;
  password: string;
  name: string;
  role: Role;
}): Promise<ResponseData<AuthUser | null>> {
  try {
    const result = await userService.createUser({
      email,
      password,
      name,
      role,
    });

    if (!result) {
      throw new Error("Failed to create user");
    }

    updateTag("users");

    return {
      success: true,
      message: "User created successfully",
      data: result.data,
    };
  } catch (error) {
    console.log(error);

    let errorMessage = "Failed to create user due to server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
}

export async function searchParents({
  query = "",
}: {
  query: string;
}): Promise<ResponseData<User[]>> {
  const maxQuery = 10;

  const parents = await userService.getUsers({
    take: maxQuery,
    where: { role: Role.PARENT, name: { contains: query } },
    orderBy: { createdAt: "desc" },
  });

  if (parents.length === 0) {
    return {
      success: false,
      message: "No parents found",
      data: [],
    };
  }

  let message = `Showing ${parents.length} parents matching ${query}`;
  if (query === "") {
    message = `Showing ${parents.length} latest parents`;
  }

  return {
    success: true,
    message: message,
    data: parents,
  };
}
