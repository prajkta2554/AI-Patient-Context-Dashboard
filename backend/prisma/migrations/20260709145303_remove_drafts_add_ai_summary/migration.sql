/*
  Warnings:

  - You are about to drop the `Draft` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN "aiSummary" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Draft";
PRAGMA foreign_keys=on;
