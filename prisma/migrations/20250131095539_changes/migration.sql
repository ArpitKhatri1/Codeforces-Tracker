/*
  Warnings:

  - Made the column `userId` on table `PersonalTags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PersonalTags" DROP CONSTRAINT "PersonalTags_userId_fkey";

-- AlterTable
ALTER TABLE "PersonalTags" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PersonalTags" ADD CONSTRAINT "PersonalTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
