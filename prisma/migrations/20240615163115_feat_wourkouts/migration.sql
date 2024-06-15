-- CreateEnum
CREATE TYPE "WorkoutsType" AS ENUM ('CARDIO', 'STRENGTH', 'FLEXIBILITY', 'BALANCE', 'ENDURANCE', 'POWER', 'SPEED', 'AGILITY', 'PLYOMETRICS', 'FUNCTIONAL', 'HIIT', 'CIRCUIT', 'TABATA', 'INTERVAL', 'CROSSFIT', 'CALISTHENICS', 'BODYWEIGHT', 'WEIGHTLIFTING', 'BODYBUILDING', 'YOGA', 'PILATES', 'BARRE', 'DANCE', 'MARTIAL_ARTS', 'BOXING', 'KICKBOXING', 'MUAY_THAI', 'JIU_JITSU', 'WRESTLING', 'MMA', 'FITNESS', 'SPORTS', 'REHABILITATION', 'PHYSIOTHERAPY', 'OTHER');

-- CreateTable
CREATE TABLE "userWorkouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "workoutType" "WorkoutsType" NOT NULL DEFAULT 'OTHER',
    "userId" TEXT NOT NULL,
    "initialDateTime" TIMESTAMP(3) NOT NULL,
    "finalDateTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userWorkouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userWorkouts_id_key" ON "userWorkouts"("id");

-- AddForeignKey
ALTER TABLE "userWorkouts" ADD CONSTRAINT "userWorkouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
