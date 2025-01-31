-- DropForeignKey
ALTER TABLE "PersonalTags" DROP CONSTRAINT "PersonalTags_userId_fkey";

-- AlterTable
ALTER TABLE "PersonalTags" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PersonalTags" ADD CONSTRAINT "PersonalTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
