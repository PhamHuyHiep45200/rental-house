/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `House` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
