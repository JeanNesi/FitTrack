/*
  Warnings:

  - You are about to drop the `userWorkouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userWorkouts" DROP CONSTRAINT "userWorkouts_userId_fkey";

-- DropTable
DROP TABLE "userWorkouts";

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "workoutType" "WorkoutsType" NOT NULL DEFAULT 'OTHER',
    "userId" TEXT NOT NULL,
    "initialDateTime" TIMESTAMP(3) NOT NULL,
    "finalDateTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workouts_id_key" ON "workouts"("id");

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
