-- DropForeignKey
ALTER TABLE "userAccessLogs" DROP CONSTRAINT "userAccessLogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "userLevels" DROP CONSTRAINT "userLevels_userId_fkey";

-- AddForeignKey
ALTER TABLE "userLevels" ADD CONSTRAINT "userLevels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAccessLogs" ADD CONSTRAINT "userAccessLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
