-- DropForeignKey
ALTER TABLE "ProblemTags" DROP CONSTRAINT "ProblemTags_tagId_fkey";

-- AddForeignKey
ALTER TABLE "ProblemTags" ADD CONSTRAINT "ProblemTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "PersonalTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
