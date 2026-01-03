-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "tempToken" TEXT,
ADD COLUMN     "tempTokenExpiry" TIMESTAMP(3);
