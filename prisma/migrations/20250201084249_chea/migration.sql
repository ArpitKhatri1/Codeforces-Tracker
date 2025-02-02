/*
  Warnings:

  - The primary key for the `UserRevisionProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `problemIndex` on the `UserRevisionProblems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRevisionProblems" DROP CONSTRAINT "UserRevisionProblems_problemContestId_problemIndex_fkey";

-- AlterTable
ALTER TABLE "UserRevisionProblems" DROP CONSTRAINT "UserRevisionProblems_pkey",
DROP COLUMN "problemIndex",
ADD CONSTRAINT "UserRevisionProblems_pkey" PRIMARY KEY ("userId", "problemContestId");

-- AddForeignKey
ALTER TABLE "UserRevisionProblems" ADD CONSTRAINT "UserRevisionProblems_problemContestId_fkey" FOREIGN KEY ("problemContestId") REFERENCES "UserProblemResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
