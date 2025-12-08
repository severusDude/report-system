/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";

import { auth } from "@/lib/auth";
import { subjects, terms } from "@/prisma/data";
import { PrismaClient, Role } from "@/generated/prisma/client";
import { seedModel, seedStudentsEnhanced } from "@/prisma/helper";

export async function seedProduction(prisma: PrismaClient) {
  console.log("Seeding production data...");

  // Seed users
  const _seedUsers = async () => {
    const user = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    if (!user.name || !user.email || !user.password) {
      throw new Error("Missing required environment variables");
    }

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
  };

  // Seed terms
  const _seedTerms = async () => {
    console.log("Seeding terms...");
    await seedModel(prisma, "term", terms, "name");
    console.log("Terms seeded successfully");
  };

  // Seed subjects
  const _seedSubjects = async () => {
    console.log("Seeding subjects...");
    await seedModel(prisma, "subject", subjects, "name");
    console.log("Subjects seeded successfully");
  };

  // Seed students
  const _seedStudents = async () => {
    console.log("Seeding students...");
    await seedStudentsEnhanced(prisma, 10);
    console.log("Students seeded successfully");
  };

  await _seedUsers();
  // await seedTerms();
  await _seedSubjects();
  await _seedStudents();

  console.log("Production seeding complete");

  return;
}
