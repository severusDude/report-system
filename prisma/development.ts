/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import { PrismaClient } from "@/generated/prisma/client";
import { seedModel, seedStudentsEnhanced } from "@/prisma/helper";
import { subjects, users } from "@/prisma/data";

export async function seedDevelopment(prisma: PrismaClient) {
  console.log("Seeding development data...");

  // Seed users
  console.log("Seeding users...");
  for (const user of users) {
    try {
      const userExist = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (userExist) {
        throw new Error(`User with email ${user.email} already exists`);
      }

      await auth.api.signUpEmail({
        body: {
          email: user.email,
          password: user.password,
          name: user.name,
          role: user.role,
        },
      });

      console.log(`User ${user.name} seeded successfully`);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Users seeded successfully");

  // Seed subjects
  console.log("Seeding subjects...");
  await seedModel(prisma, "subject", subjects, "name");
  console.log("Subjects seeded successfully");

  // Seed students
  console.log("Seeding students...");
  await seedStudentsEnhanced(prisma, 30); // Seed 30 students for development
  console.log("Students seeded successfully");

  console.log("Development seeding complete");

  return;
}
