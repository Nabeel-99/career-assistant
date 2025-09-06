-- CreateEnum
CREATE TYPE "PracticeType" AS ENUM ('THEORETICAL', 'PRACTICAL');

-- AlterTable
ALTER TABLE "Practice" ADD COLUMN     "type" "PracticeType" NOT NULL DEFAULT 'THEORETICAL';

-- CreateTable
CREATE TABLE "CodingTask" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "expectedOutput" TEXT,
    "practiceId" INTEGER NOT NULL,

    CONSTRAINT "CodingTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodingTask" ADD CONSTRAINT "CodingTask_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
