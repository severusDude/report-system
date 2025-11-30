import { prisma } from "@/lib/prisma";
import { User } from "@/generated/prisma/client";
import { UserFindManyArgs } from "@/generated/prisma/models";

class UserService {
  async getUsers({ ...args }: UserFindManyArgs): Promise<User[]> {
    return await prisma.user.findMany({ ...args });
  }
}

const userService = new UserService();

export default userService;
