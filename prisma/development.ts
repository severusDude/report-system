/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import { seedModel } from "@/prisma/helper";
import { subjects, users } from "@/prisma/data";
import { PrismaClient } from "@/generated/prisma/client";

export async function seedDevelopment(prisma: PrismaClient) {
  console.log("Seeding development data...");

  // Seed users
  console.log("Seeding users...");
  for (const user of users) {
    await auth.api.signUpEmail({
      body: {
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
      },
    });
  }
  console.log("User seeded successfully");

  // Seed subjects
  console.log("Seeding subjects...");
  await seedModel(prisma, "subject", subjects, "name");
  console.log("Subjects seeded successfully");

  console.log("Development seeding complete");

  return;
}
