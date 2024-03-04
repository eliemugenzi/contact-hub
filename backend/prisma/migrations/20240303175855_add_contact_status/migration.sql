-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "status" "ContactStatus" NOT NULL DEFAULT 'ACTIVE';
