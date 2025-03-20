-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Problem_id_seq";

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
