/*
  Warnings:

  - You are about to drop the column `nickName` on the `registrations` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `registrations` table. All the data in the column will be lost.

*/

-- Step 1: Add nik column with default value first
ALTER TABLE "registrations" ADD COLUMN "nik" TEXT DEFAULT '0000000000000000';

-- Step 2: Update existing records with a placeholder NIK
UPDATE "registrations" SET "nik" = '0000000000000000' WHERE "nik" IS NULL;

-- Step 3: Make nik column NOT NULL
ALTER TABLE "registrations" ALTER COLUMN "nik" SET NOT NULL;
ALTER TABLE "registrations" ALTER COLUMN "nik" DROP DEFAULT;

-- Step 4: Drop the old columns
ALTER TABLE "registrations" DROP COLUMN "nickName",
DROP COLUMN "religion";
