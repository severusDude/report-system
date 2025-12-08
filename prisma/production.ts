/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";

import { auth } from "@/lib/auth";
import { subjects } from "@/prisma/data";
import { seedModel } from "@/prisma/helper";
import { PrismaClient, Role } from "@/generated/prisma/client";

export async function seedProduction(prisma: PrismaClient) {
  console.log("Seeding production data...");

  const user = {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

  if (!user.name || !user.email || !user.password) {
    throw new Error("Missing required environment variables");
  }

  // Seed users
  console.log("Seeding users...");
  await auth.api.signUpEmail({
    body: {
      email: user.email,
      password: user.password,
      name: user.name,
      role: Role.ADMIN,
    },
  });
  console.log("User seeded successfully");

  // Seed subjects
  console.log("Seeding subjects...");
  await seedModel(prisma, "subject", subjects, "name");
  console.log("Subjects seeded successfully");

  console.log("Production seeding complete");

  return;
}
