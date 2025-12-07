/*
  Warnings:

  - Added the required column `birthPlace` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citizenship` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyCardNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nisn` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "birthCertRegNo" TEXT,
ADD COLUMN     "birthPlace" TEXT NOT NULL,
ADD COLUMN     "citizenship" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "familyCardNumber" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "hasSpecialNeeds" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "nisn" TEXT NOT NULL;
