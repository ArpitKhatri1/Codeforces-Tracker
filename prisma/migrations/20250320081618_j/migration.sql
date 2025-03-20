/*
  Warnings:

  - You are about to drop the `_PersonalTagsToProblem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `PersonalTags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_PersonalTagsToProblem" DROP CONSTRAINT "_PersonalTagsToProblem_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersonalTagsToProblem" DROP CONSTRAINT "_PersonalTagsToProblem_B_fkey";

-- DropTable
DROP TABLE "_PersonalTagsToProblem";

-- CreateTable
CREATE TABLE "ProblemTags" (
    "problemId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProblemTags_problemId_tagId_key" ON "ProblemTags"("problemId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalTags_id_key" ON "PersonalTags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_id_key" ON "Problem"("id");

-- AddForeignKey
ALTER TABLE "ProblemTags" ADD CONSTRAINT "ProblemTags_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemTags" ADD CONSTRAINT "ProblemTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "PersonalTags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
