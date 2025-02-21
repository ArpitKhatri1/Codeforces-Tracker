/*
  Warnings:

  - The primary key for the `PersonalTagsOnProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_pkey",
ALTER COLUMN "personalTagId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PersonalTagsOnProblems_pkey" PRIMARY KEY ("personalTagId", "problemId");
