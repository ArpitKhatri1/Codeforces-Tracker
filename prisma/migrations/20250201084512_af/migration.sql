/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserProblemResult` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserProblemResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProblemResult" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
