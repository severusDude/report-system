/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@/generated/prisma/client";

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
