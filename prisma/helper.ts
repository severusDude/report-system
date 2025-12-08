/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@/generated/prisma/client";
import { Role, SubjectType } from "@/generated/prisma/enums";
import { SubjectCreateManyInput } from "@/generated/prisma/models";

type ModelName = Uncapitalize<keyof Omit<PrismaClient, `$${string}` | symbol>>;

export async function seedModel<T extends Record<string, any>>(
  prisma: PrismaClient,
  modelName: ModelName,
  data: T[],
  uniqueField: keyof T = "id" as keyof T,
  hardReset: boolean = false
) {
  const model = prisma[modelName] as any;

  try {
    if (hardReset) {
      await model.deleteMany({});
      console.log(`Cleared all ${modelName} records`);
    }

    // Filter out existing records
    const existingRecords = await model.findMany({
      select: {
        [uniqueField]: true,
      },
    });

    const existingValues = new Set(
      existingRecords.map((record: any) => record[uniqueField])
    );

    const filteredData = data.filter(
      (item) => !existingValues.has(item[uniqueField])
    );

    if (filteredData.length === 0) {
      console.log(`No new ${modelName} records to seed (all exist)`);
      return;
    }

    // Create records
    await model.createMany({
      data: filteredData,
      skipDuplicates: true, // Extra safety
    });

    console.log(
      `✓ Seeded ${filteredData.length} ${modelName} records [${
        data.length - filteredData.length
      } skipped]`
    );
  } catch (error) {
    console.error(`Error seeding ${modelName} model:`, error);

    throw error;
  }
}

export const users = [
  {
    email: "admin@example.com",
    name: "admin",
    password: "admin1234",
    role: Role.ADMIN,
  },
  {
    email: "teacher@example.com",
    name: "teacher",
    password: "teacher123",
    role: Role.TEACHER,
  },
  {
    email: "parent@example.com",
    name: "parent",
    password: "parent123",
    role: Role.PARENT,
  },
];

export const subjects: SubjectCreateManyInput[] = [
  {
    name: "Matematika",
    type: SubjectType.GENERAL,
  },
  {
    name: "IPA",
    type: SubjectType.GENERAL,
  },
  {
    name: "Pendidikan Pancasila",
    type: SubjectType.GENERAL,
  },
  {
    name: "Pendidikan Karakter",
    type: SubjectType.GENERAL,
  },
  {
    name: "Bahasa Inggris",
    type: SubjectType.GENERAL,
  },
  {
    name: "Bahasa Indonesia",
    type: SubjectType.GENERAL,
  },
  {
    name: "Bahasa Sunda",
    type: SubjectType.GENERAL,
  },
  {
    name: "Seni Budaya",
    type: SubjectType.GENERAL,
  },
  {
    name: "PJOK",
    type: SubjectType.GENERAL,
  },
  {
    name: "Al-Quran",
    type: SubjectType.ISLAMIC,
  },
  {
    name: "Aqidah",
    type: SubjectType.ISLAMIC,
  },
  {
    name: "Akhlak",
    type: SubjectType.ISLAMIC,
  },
  {
    name: "Fiqih",
    type: SubjectType.ISLAMIC,
  },
  {
    name: "Bahasa Arab",
    type: SubjectType.ISLAMIC,
  },
];
