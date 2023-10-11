/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Company_username_key";

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
