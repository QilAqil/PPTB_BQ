-- Drop publication-related columns
ALTER TABLE "public"."news" DROP COLUMN IF EXISTS "isPublished";
ALTER TABLE "public"."news" DROP COLUMN IF EXISTS "publishedAt";

ALTER TABLE "public"."gallery" DROP COLUMN IF EXISTS "isPublished";
ALTER TABLE "public"."gallery" DROP COLUMN IF EXISTS "publishedAt";

ALTER TABLE "public"."prayers" DROP COLUMN IF EXISTS "isPublished";
ALTER TABLE "public"."prayers" DROP COLUMN IF EXISTS "publishedAt";
