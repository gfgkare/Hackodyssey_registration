/*
  Warnings:

  - The values [OTHER] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "AcademicYear" AS ENUM ('FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR');

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "TeamMember" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "public"."Gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "academicYear" "AcademicYear",
ADD COLUMN     "collegeName" TEXT;
