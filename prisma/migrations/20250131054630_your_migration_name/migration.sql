/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codeforcesHandle` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('OK', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR', 'SYSTEM_ERROR', 'OTHER');

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ADD COLUMN     "codeforcesHandle" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- CreateTable
CREATE TABLE "PersonalTagsOnProblems" (
    "personalTagId" INTEGER NOT NULL,
    "userProblemResultId" INTEGER NOT NULL,

    CONSTRAINT "PersonalTagsOnProblems_pkey" PRIMARY KEY ("personalTagId","userProblemResultId")
);

-- CreateTable
CREATE TABLE "UserProblemResult" (
    "id" INTEGER NOT NULL,
    "contestId" INTEGER NOT NULL,
    "creationTimeSeconds" INTEGER NOT NULL,
    "problemContestId" INTEGER NOT NULL,
    "problemIndex" TEXT NOT NULL,
    "authorContestId" INTEGER NOT NULL,
    "programmingLanguage" TEXT NOT NULL,
    "verdict" TEXT NOT NULL,
    "testset" TEXT NOT NULL,
    "passedTestCount" INTEGER NOT NULL,
    "timeConsumedMillis" INTEGER NOT NULL,
    "memoryConsumedBytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProblemResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "contestId" INTEGER NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "points" DOUBLE PRECISION,
    "tags" TEXT[],

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("contestId")
);

-- CreateTable
CREATE TABLE "Author" (
    "contestId" INTEGER NOT NULL,
    "participantType" TEXT NOT NULL,
    "ghost" BOOLEAN NOT NULL,
    "room" INTEGER NOT NULL,
    "startTimeSeconds" INTEGER NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("contestId")
);

-- CreateTable
CREATE TABLE "AuthorMember" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "AuthorMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalTags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "PersonalTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProblemResult_contestId_id_key" ON "UserProblemResult"("contestId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_contestId_index_key" ON "Problem"("contestId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorMember_authorId_handle_key" ON "AuthorMember"("authorId", "handle");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_personalTagId_fkey" FOREIGN KEY ("personalTagId") REFERENCES "PersonalTags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTagsOnProblems" ADD CONSTRAINT "PersonalTagsOnProblems_userProblemResultId_fkey" FOREIGN KEY ("userProblemResultId") REFERENCES "UserProblemResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProblemResult" ADD CONSTRAINT "UserProblemResult_problemContestId_problemIndex_fkey" FOREIGN KEY ("problemContestId", "problemIndex") REFERENCES "Problem"("contestId", "index") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProblemResult" ADD CONSTRAINT "UserProblemResult_authorContestId_fkey" FOREIGN KEY ("authorContestId") REFERENCES "Author"("contestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorMember" ADD CONSTRAINT "AuthorMember_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("contestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTags" ADD CONSTRAINT "PersonalTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
