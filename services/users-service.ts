import { prisma } from "@/lib/prisma";
import { ResponseData } from "@/types";
import { unstable_cache } from "next/cache";
import { Role, User } from "@/generated/prisma/client";
import { UserFindManyArgs } from "@/generated/prisma/models";
import { auth, User as AuthUser } from "@/lib/auth";

class UserService {
  getUsers = unstable_cache(
    async ({ ...args }: UserFindManyArgs): Promise<User[]> => {
      return await prisma.user.findMany({ ...args });
    },
    ["users"],
    { tags: ["users"] }
  );

  // async deleteUser(id: string): Promise<ResponseData<null>> {
  //   try {
  //     await auth.api.removeUser();

  //     return {
  //       success: true,
  //       message: "User deleted successfully",
  //       data: null,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       success: false,
  //       message: "Failed to delete user",
  //       data: null,
  //     };
  //   }
  // }

  async createUser({
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
      const result = await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
          role,
        },
      });

      return {
        success: true,
        message: "User created successfully",
        data: result.user,
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
}

const userService = new UserService();

export default userService;
