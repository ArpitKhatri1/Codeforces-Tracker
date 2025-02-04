/*
  Warnings:

  - The primary key for the `PersonalTagsOnProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userProblemResultId` on the `PersonalTagsOnProblems` table. All the data in the column will be lost.
  - You are about to drop the `UserProblemResult` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `problemId` to the `PersonalTagsOnProblems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_userProblemResultId_fkey";

-- DropForeignKey
ALTER TABLE "UserProblemResult" DROP CONSTRAINT "UserProblemResult_authorContestId_fkey";

-- DropForeignKey
ALTER TABLE "UserProblemResult" DROP CONSTRAINT "UserProblemResult_problemContestId_problemIndex_fkey";

-- AlterTable
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_pkey",
DROP COLUMN "userProblemResultId",
ADD COLUMN     "problemId" INTEGER NOT NULL,
ADD CONSTRAINT "PersonalTagsOnProblems_pkey" PRIMARY KEY ("personalTagId", "problemId");

-- DropTable
DROP TABLE "UserProblemResult";
