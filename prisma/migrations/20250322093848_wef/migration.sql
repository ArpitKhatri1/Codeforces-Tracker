-- DropForeignKey
ALTER TABLE "ProblemSnippet" DROP CONSTRAINT "ProblemSnippet_userId_fkey";

-- AddForeignKey
ALTER TABLE "ProblemSnippet" ADD CONSTRAINT "ProblemSnippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
