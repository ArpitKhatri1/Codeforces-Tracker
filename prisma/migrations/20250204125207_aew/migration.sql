/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthorMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Problem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `PersonalTagsOnProblems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuthorMember" DROP CONSTRAINT "AuthorMember_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalTagsOnProblems" DROP CONSTRAINT "PersonalTagsOnProblems_personalTagId_fkey";

-- AlterTable
ALTER TABLE "PersonalTagsOnProblems" ADD COLUMN     "personalTagsId" INTEGER,
ADD COLUMN     "tagNames" TEXT[],
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "AuthorMember";

-- DropTable
DROP TABLE "Problem";

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_personalTagsId_fkey" FOREIGN KEY ("personalTagsId") REFERENCES "PersonalTags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
