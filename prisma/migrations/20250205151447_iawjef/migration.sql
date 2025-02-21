/*
  Warnings:

  - You are about to drop the column `personalTagsId` on the `PersonalTagsOnProblems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_personalTagsId_fkey";

-- AlterTable
ALTER TABLE "PersonalTagsOnProblems" DROP COLUMN "personalTagsId";
