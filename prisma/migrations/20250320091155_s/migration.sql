/*
  Warnings:

  - You are about to drop the column `contestId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "contestId",
DROP COLUMN "createdAt";
