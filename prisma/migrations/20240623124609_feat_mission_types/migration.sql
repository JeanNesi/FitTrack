/*
  Warnings:

  - Added the required column `type` to the `missions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MissonType" AS ENUM ('TIME', 'REPETITION', 'WORKOUT_TYPE', 'WORKOUT', 'DAILY', 'WEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "missions" ADD COLUMN     "type" "MissonType" NOT NULL;

-- AlterTable
ALTER TABLE "userMissions" ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0;
