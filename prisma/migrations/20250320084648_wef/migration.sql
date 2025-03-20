-- DropIndex
DROP INDEX "UserRevisionProblems_userId_key";

-- AlterTable
ALTER TABLE "UserRevisionProblems" ADD CONSTRAINT "UserRevisionProblems_pkey" PRIMARY KEY ("userId", "problemId");
