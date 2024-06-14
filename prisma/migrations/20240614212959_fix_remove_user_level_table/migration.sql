/*
  Warnings:

  - You are about to drop the `userLevels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userLevels" DROP CONSTRAINT "userLevels_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "experiencePoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "experiencePointsToNextLevel" INTEGER NOT NULL DEFAULT 1000,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "userLevels";
