/*
  Warnings:

  - You are about to drop the column `deleted` on the `House` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "deleted",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
