/*
  Warnings:

  - A unique constraint covering the columns `[registrationCode]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "registrationCode" TEXT,
ADD COLUMN     "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Team_registrationCode_key" ON "Team"("registrationCode");
