/*
  Warnings:

  - The values [PENDING,CANCELLED] on the enum `RegistrationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RegistrationStatus_new" AS ENUM ('CONFIRMED');
ALTER TABLE "public"."Team" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Team" ALTER COLUMN "status" TYPE "RegistrationStatus_new" USING ("status"::text::"RegistrationStatus_new");
ALTER TYPE "RegistrationStatus" RENAME TO "RegistrationStatus_old";
ALTER TYPE "RegistrationStatus_new" RENAME TO "RegistrationStatus";
DROP TYPE "public"."RegistrationStatus_old";
ALTER TABLE "Team" ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';
COMMIT;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';
