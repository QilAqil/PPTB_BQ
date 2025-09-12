/*
  Safe fix for registration columns without resetting DB.
  Steps:
  1) Add new columns as nullable (if not exist)
  2) Backfill from existing photoUrl (if any)
  3) Set NOT NULL constraints
  4) Drop old photoUrl column (if exists)
*/

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting safe column fix for registrations...");

  // Note: Neon Postgres supports IF NOT EXISTS in ALTER TABLE ADD COLUMN
  const addColumnsSql = `
    ALTER TABLE "public"."registrations"
      ADD COLUMN IF NOT EXISTS "birthCertificatePhotoUrl" TEXT,
      ADD COLUMN IF NOT EXISTS "familyCardPhotoUrl" TEXT;
  `;

  const backfillSql = `
    UPDATE "public"."registrations"
    SET
      "familyCardPhotoUrl" = COALESCE("familyCardPhotoUrl", COALESCE("photoUrl", '')),
      "birthCertificatePhotoUrl" = COALESCE("birthCertificatePhotoUrl", COALESCE("photoUrl", ''))
    WHERE ("familyCardPhotoUrl" IS NULL OR "birthCertificatePhotoUrl" IS NULL);
  `;

  const setNotNullSql = `
    ALTER TABLE "public"."registrations"
      ALTER COLUMN "familyCardPhotoUrl" SET NOT NULL,
      ALTER COLUMN "birthCertificatePhotoUrl" SET NOT NULL;
  `;

  const dropOldSql = `
    ALTER TABLE "public"."registrations" DROP COLUMN IF EXISTS "photoUrl";
  `;

  try {
    await prisma.$executeRawUnsafe(addColumnsSql);
    console.log("Added columns (nullable) if not exist.");

    await prisma.$executeRawUnsafe(backfillSql);
    console.log("Backfilled new columns from photoUrl.");

    await prisma.$executeRawUnsafe(setNotNullSql);
    console.log("Applied NOT NULL constraints.");

    await prisma.$executeRawUnsafe(dropOldSql);
    console.log("Dropped old photoUrl column if existed.");

    console.log("✅ Registration columns fixed successfully.");
  } catch (err) {
    console.error("❌ Failed to fix registration columns:", err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
