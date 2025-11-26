/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaPg } from "@prisma/adapter-pg";

import { Role } from "../generated/prisma/enums";
import { PrismaClient } from "../generated/prisma/client";
import {
  StudentCreateManyInput,
  SubjectCreateManyInput,
  UserCreateManyInput,
} from "../generated/prisma/models";

import "dotenv/config";

// Create separate Prisma Client instance for seeding
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const users: UserCreateManyInput[] = [
  {
    email: "teacher@example.com",
    name: "teacher",
    role: Role.TEACHER,
  },
  {
    email: "parent@example.com",
    name: "parent",
    role: Role.PARENT,
  },
];

const subjects: SubjectCreateManyInput[] = [
  {
    name: "Mathematics",
  },
  {
    name: "Science",
  },
  {
    name: "History",
  },
];

const students: StudentCreateManyInput[] = [
  {
    name: "student-1",
    parentId: "",
  },
  {
    name: "student-2",
    parentId: "",
  },
  {
    name: "student-3",
    parentId: "",
  },
];

async function seedModel(
  modelName: string,
  data: unknown[],
  uniqueField?: string
) {
  try {
    // Filters out existing records by its unique field
    const existingRecords = await (prisma as any)[modelName].findMany({
      select: {
        [uniqueField || "id"]: true,
      },
    });

    const filteredData = data.filter((item: any) => {
      return !existingRecords.some(
        (record: any) =>
          record[uniqueField || "id"] === item[uniqueField || "id"]
      );
    });

    // Create records
    await (prisma as any)[modelName].createMany({
      data: filteredData,
    });

    console.log(
      `Seeded ${filteredData.length} [${data.length - filteredData.length}/${
        data.length
      } Skipped] into ${modelName} records`
    );
  } catch (error) {
    console.error(`Error seeding ${modelName} model:`, error);

    throw error;
  }
}

async function main() {
  // Create users
  await seedModel("user", users, "email");

  // Create subjects
  await seedModel("subject", subjects, "name");

  // Create students
  try {
    const parent = await prisma.user.findFirst({
      where: { email: users[1].email },
    });

    if (!parent) {
      throw new Error("Parent user not found");
    }

    const updatedStudents = students.map((student) => ({
      ...student,
      parentId: parent.id,
    }));

    await seedModel("student", updatedStudents, "name");
  } catch (error) {
    console.error("Error finding parent user:", error);
  }

  return;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
