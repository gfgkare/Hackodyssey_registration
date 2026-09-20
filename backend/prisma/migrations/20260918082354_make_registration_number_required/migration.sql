/*
  Warnings:

  - Made the column `registrationNumber` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "registrationNumber" SET NOT NULL;
