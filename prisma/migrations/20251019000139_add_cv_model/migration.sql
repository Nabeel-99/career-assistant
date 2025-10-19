/*
  Warnings:

  - You are about to drop the column `templateId` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Resume" DROP CONSTRAINT "Resume_templateId_fkey";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "templateId";

-- DropTable
DROP TABLE "public"."Template";

-- CreateTable
CREATE TABLE "CV" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "content" JSONB NOT NULL,
    "templateId" INTEGER,
    "template" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CV_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
