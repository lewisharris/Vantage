/*
  Warnings:

  - Made the column `access` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Transaction_id_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "access" SET NOT NULL;
