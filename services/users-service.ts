import { prisma } from "@/lib/prisma";
import { ResponseData } from "@/types";
import { unstable_cache } from "next/cache";
import { User } from "@/generated/prisma/client";
import { UserFindManyArgs } from "@/generated/prisma/models";

class UserService {
  getUsers = unstable_cache(
    async ({ ...args }: UserFindManyArgs): Promise<User[]> => {
      return await prisma.user.findMany({ ...args });
    },
    ["users"],
    { tags: ["users"] }
  );

  async deleteUser(id: string): Promise<ResponseData<null>> {
    try {
      await prisma.user.delete({ where: { id } });

      return {
        success: true,
        message: "User deleted successfully",
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to delete user",
        data: null,
      };
    }
  }
}

const userService = new UserService();

export default userService;
