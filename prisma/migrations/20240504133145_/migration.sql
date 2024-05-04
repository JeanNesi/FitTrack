/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `missions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "missions_title_key" ON "missions"("title");
