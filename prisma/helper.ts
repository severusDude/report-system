/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender } from "@/generated/prisma/enums";
import { base, en, Faker, id_ID } from "@faker-js/faker";
import { PrismaClient } from "@/generated/prisma/client";

type ModelName = Uncapitalize<keyof Omit<PrismaClient, `$${string}` | symbol>>;

const faker = new Faker({ locale: [id_ID, en, base] });

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

// Generate unique 10-digit NISN
export function generateNISN(existingNISNs: Set<string>): string {
  let nisn: string;
  do {
    // Indonesian NISN format: 10 digits
    // Starting with 00-03 (common prefixes for birth year range)
    const prefix = faker.helpers.arrayElement(["00", "01", "02", "03"]);
    const remaining = faker.string.numeric(8);
    nisn = prefix + remaining;
  } while (existingNISNs.has(nisn));

  existingNISNs.add(nisn); // Add to set immediately
  return nisn;
}

// Generate Indonesian student name with proper gender
export function generateIndonesianName(gender?: Gender): string {
  if (gender === Gender.MALE) {
    return faker.person.fullName({ sex: "male" });
  } else if (gender === Gender.FEMALE) {
    return faker.person.fullName({ sex: "female" });
  }
  return faker.person.fullName(); // Random gender
}

// Seed students with Indonesian names
export async function seedStudents(prisma: PrismaClient, count: number = 20) {
  console.log(`Seeding ${count} students...`);

  // Get the latest PARENT user
  const parent = await prisma.user.findFirst({
    where: { role: "PARENT" },
    orderBy: { createdAt: "desc" },
  });

  if (!parent) {
    throw new Error("No PARENT user found. Seed users first.");
  }

  console.log(`Using parent: ${parent.name} (${parent.email})`);

  // Get existing NISNs to avoid duplicates
  const existingStudents = await prisma.student.findMany({
    select: { nisn: true },
  });
  const existingNISNs = new Set(existingStudents.map((s) => s.nisn));

  console.log(`Found ${existingNISNs.size} existing NISNs`);

  // Generate student data
  const students = Array.from({ length: count }, () => {
    const gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
    return {
      name: generateIndonesianName(gender),
      nisn: generateNISN(existingNISNs),
      parentId: parent.id,
      gender, // Optional: include gender
    };
  });

  // Seed students
  await seedModel(prisma, "student", students, "nisn");

  console.log(`✓ Seeded students successfully`);
}

// Enhanced version with more realistic data (optional)
export async function seedStudentsEnhanced(
  prisma: PrismaClient,
  count: number = 20
) {
  console.log(`Seeding ${count} students with enhanced data...`);

  const parent = await prisma.user.findFirst({
    where: { role: "PARENT" },
    orderBy: { createdAt: "desc" },
  });

  if (!parent) {
    throw new Error("No PARENT user found. Seed users first.");
  }

  console.log(`Using parent: ${parent.name} (${parent.email})`);

  const existingStudents = await prisma.student.findMany({
    select: { nisn: true },
  });
  const existingNISNs = new Set(existingStudents.map((s) => s.nisn));

  console.log(`Found ${existingNISNs.size} existing NISNs`);

  const students = Array.from({ length: count }, () => {
    const gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
    const firstName = faker.person.firstName(
      gender === Gender.MALE ? "male" : "female"
    );

    return {
      // Required fields
      name: generateIndonesianName(gender),
      nisn: generateNISN(existingNISNs),
      parentId: parent.id,

      // Optional fields for more realistic data
      gender,
      phoneNumber: faker.phone.number({ style: "national" }),
      email: faker.internet.email({ firstName }),
      address: faker.location.streetAddress({ useFullAddress: true }),
      birthPlace: faker.location.city(),
      dateOfBirth: faker.date.birthdate({ min: 6, max: 18, mode: "age" }),
      citizenship: "Indonesia",
    };
  });

  await seedModel(prisma, "student", students, "nisn");

  console.log(`✓ Seeded students with enhanced data successfully`);
}
