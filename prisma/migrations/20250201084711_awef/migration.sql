/*
  Warnings:

  - Added the required column `problemId` to the `UserRevisionProblems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRevisionProblems" ADD COLUMN     "problemId" INTEGER NOT NULL;
