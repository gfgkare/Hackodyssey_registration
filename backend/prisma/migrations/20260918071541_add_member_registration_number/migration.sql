/*
  Warnings:

  - You are about to drop the column `registrationCode` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationNumber]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Team_registrationCode_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "registrationCode";

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "registrationNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_registrationNumber_key" ON "TeamMember"("registrationNumber");
