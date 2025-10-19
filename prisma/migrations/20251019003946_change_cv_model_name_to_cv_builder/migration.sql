/*
  Warnings:

  - You are about to drop the `CV` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CV" DROP CONSTRAINT "CV_userId_fkey";

-- DropTable
DROP TABLE "public"."CV";

-- CreateTable
CREATE TABLE "CVBuilder" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "content" JSONB NOT NULL,
    "templateId" INTEGER,
    "template" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CVBuilder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CVBuilder" ADD CONSTRAINT "CVBuilder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
