/*
  Warnings:

  - The primary key for the `UserRevisionProblems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `UserRevisionProblems` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserRevisionProblems" DROP CONSTRAINT "UserRevisionProblems_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "UserRevisionProblems_userId_key" ON "UserRevisionProblems"("userId");
