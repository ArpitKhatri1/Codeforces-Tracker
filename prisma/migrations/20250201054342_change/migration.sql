-- CreateTable
CREATE TABLE "UserRevisionProblems" (
    "userId" INTEGER NOT NULL,
    "problemContestId" INTEGER NOT NULL,
    "problemIndex" TEXT NOT NULL,

    CONSTRAINT "UserRevisionProblems_pkey" PRIMARY KEY ("userId","problemContestId","problemIndex")
);

-- AddForeignKey
ALTER TABLE "UserRevisionProblems" ADD CONSTRAINT "UserRevisionProblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRevisionProblems" ADD CONSTRAINT "UserRevisionProblems_problemContestId_problemIndex_fkey" FOREIGN KEY ("problemContestId", "problemIndex") REFERENCES "Problem"("contestId", "index") ON DELETE RESTRICT ON UPDATE CASCADE;
