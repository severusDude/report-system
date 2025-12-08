import "dotenv/config";

import { APIError, betterAuth } from "better-auth";

import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma/enums";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: true,
        defaultValue: Role.PARENT,
      },
    },
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        if (user.email === process.env.ADMIN_EMAIL) {
          throw new APIError("BAD_REQUEST", {
            message: "Cannot delete admin user",
          });
        }
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
