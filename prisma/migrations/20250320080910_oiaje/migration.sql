/*
  Warnings:

  - You are about to drop the `PersonalTagsOnProblems` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `PersonalTags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_problemId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_tagId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_userId_fkey";

-- DropTable
DROP TABLE "PersonalTagsOnProblems";

-- CreateTable
CREATE TABLE "_PersonalTagsToProblem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PersonalTagsToProblem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PersonalTagsToProblem_B_index" ON "_PersonalTagsToProblem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalTags_name_key" ON "PersonalTags"("name");

-- AddForeignKey
ALTER TABLE "_PersonalTagsToProblem" ADD CONSTRAINT "_PersonalTagsToProblem_A_fkey" FOREIGN KEY ("A") REFERENCES "PersonalTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonalTagsToProblem" ADD CONSTRAINT "_PersonalTagsToProblem_B_fkey" FOREIGN KEY ("B") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
