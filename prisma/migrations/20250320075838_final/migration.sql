/*
  Warnings:

  - The primary key for the `PersonalTagsOnProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tags` on the `PersonalTagsOnProblems` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `PersonalTags` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `PersonalTags` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tagId` to the `PersonalTagsOnProblems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PersonalTags" DROP CONSTRAINT "PersonalTags_userId_fkey";

-- AlterTable
ALTER TABLE "PersonalTags" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_pkey",
DROP COLUMN "tags",
ADD COLUMN     "tagId" INTEGER NOT NULL,
ADD CONSTRAINT "PersonalTagsOnProblems_pkey" PRIMARY KEY ("userId", "problemId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalTags_userId_name_key" ON "PersonalTags"("userId", "name");

-- AddForeignKey
ALTER TABLE "PersonalTags" ADD CONSTRAINT "PersonalTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "PersonalTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
