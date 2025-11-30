"use server";

import { Role, User } from "@/generated/prisma/client";
import userService from "@/services/users-service";
import { ResponseData } from "@/types";

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
