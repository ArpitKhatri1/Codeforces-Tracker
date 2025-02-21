/*
  Warnings:

  - The primary key for the `PersonalTagsOnProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagNames` on the `PersonalTagsOnProblems` table. All the data in the column will be lost.
  - Added the required column `tagId` to the `PersonalTagsOnProblems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_pkey",
DROP COLUMN "tagNames",
ADD COLUMN     "tagId" INTEGER NOT NULL,
ADD CONSTRAINT "PersonalTagsOnProblems_pkey" PRIMARY KEY ("userId", "problemId", "tagId");

-- DropEnum
DROP TYPE "Verdict";

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "PersonalTags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
