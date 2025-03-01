/*
  Warnings:

  - The primary key for the `PersonalTagsOnProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagId` on the `PersonalTagsOnProblems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_problemId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_tagId_fkey";

-- AlterTable
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_pkey",
DROP COLUMN "tagId",
ADD COLUMN     "tags" TEXT[],
ADD CONSTRAINT "PersonalTagsOnProblems_pkey" PRIMARY KEY ("userId", "problemId");
