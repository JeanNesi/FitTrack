/*
  Warnings:

  - Added the required column `goal` to the `missions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "missions" ADD COLUMN     "goal" INTEGER NOT NULL;
