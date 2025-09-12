/*
  Safe migration:
  1) Add new columns as nullable
  2) Backfill from existing photoUrl
  3) Set NOT NULL
  4) Drop old photoUrl
*/

-- 1) Add columns as nullable
ALTER TABLE "public"."registrations"
  ADD COLUMN IF NOT EXISTS "birthCertificatePhotoUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "familyCardPhotoUrl" TEXT;

-- 2) Backfill values from photoUrl (temporary copy)
UPDATE "public"."registrations"
SET
  "familyCardPhotoUrl" = COALESCE("familyCardPhotoUrl", COALESCE("photoUrl", '')),
  "birthCertificatePhotoUrl" = COALESCE("birthCertificatePhotoUrl", COALESCE("photoUrl", ''))
WHERE ("familyCardPhotoUrl" IS NULL OR "birthCertificatePhotoUrl" IS NULL);

-- 3) Enforce NOT NULL
ALTER TABLE "public"."registrations"
  ALTER COLUMN "familyCardPhotoUrl" SET NOT NULL,
  ALTER COLUMN "birthCertificatePhotoUrl" SET NOT NULL;

-- 4) Drop old column
ALTER TABLE "public"."registrations" DROP COLUMN IF EXISTS "photoUrl";
