import { parseArgs } from "util";

import "dotenv/config"; // This should always be on top of the file
import { env } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedDevelopment } from "@/prisma/development";

import { seedProduction } from "@/prisma/production";
import { PrismaClient } from "@/generated/prisma/client";

// Create separate Prisma Client instance for seeding
const adapter = new PrismaPg({ connectionString: env("DATABASE_URL") });
const prisma = new PrismaClient({ adapter });

const options = {
  environment: { type: "string" as const },
};

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options });

  switch (environment) {
    case "development":
      await seedDevelopment(prisma);
      break;
    case "production":
      await seedProduction(prisma);
      break;
    default:
      throw new Error(
        "Please specify environment: --environment=development or --environment=production"
      );
  }

  console.log("Seeding complete");

  return;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seeding failed: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
