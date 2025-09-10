/*
  Warnings:

  - You are about to drop the column `type` on the `Practice` table. All the data in the column will be lost.
  - You are about to drop the `CodingTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CodingTask" DROP CONSTRAINT "CodingTask_practiceId_fkey";

-- AlterTable
ALTER TABLE "Practice" DROP COLUMN "type";

-- DropTable
DROP TABLE "CodingTask";

-- DropEnum
DROP TYPE "PracticeType";
