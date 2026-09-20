-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('HOSTELLER', 'DAY_SCHOLAR');

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "accommodationType" "AccommodationType",
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "hostelName" TEXT,
ADD COLUMN     "roomNumber" TEXT,
ADD COLUMN     "wardenContact" TEXT,
ADD COLUMN     "wardenName" TEXT;
