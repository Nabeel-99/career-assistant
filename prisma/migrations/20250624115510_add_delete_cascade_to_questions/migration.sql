-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_practiceId_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
