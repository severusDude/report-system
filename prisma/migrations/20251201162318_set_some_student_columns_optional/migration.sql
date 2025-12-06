/*
  Warnings:

  - A unique constraint covering the columns `[nisn]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "birthPlace" DROP NOT NULL,
ALTER COLUMN "citizenship" DROP NOT NULL,
ALTER COLUMN "dateOfBirth" DROP NOT NULL,
ALTER COLUMN "familyCardNumber" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "hasSpecialNeeds" DROP NOT NULL,
ALTER COLUMN "nik" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_nisn_key" ON "Student"("nisn");
