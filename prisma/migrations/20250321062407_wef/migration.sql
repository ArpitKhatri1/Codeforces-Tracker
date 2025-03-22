-- CreateTable
CREATE TABLE "ProblemSnippet" (
    "snippetText" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProblemSnippet_problemId_key" ON "ProblemSnippet"("problemId");

-- AddForeignKey
ALTER TABLE "ProblemSnippet" ADD CONSTRAINT "ProblemSnippet_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
