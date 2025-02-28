/*
  Warnings:

  - The primary key for the `UserRevisionProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserRevisionProblems" DROP CONSTRAINT "UserRevisionProblems_pkey",
ADD CONSTRAINT "UserRevisionProblems_pkey" PRIMARY KEY ("userId", "problemId");
