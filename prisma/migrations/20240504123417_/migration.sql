/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `userLevels` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "userLevels" ALTER COLUMN "experiencePointsToNextLevel" SET DEFAULT 1000;

-- CreateIndex
CREATE UNIQUE INDEX "userLevels_userId_key" ON "userLevels"("userId");
