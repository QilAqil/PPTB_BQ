-- CreateTable
CREATE TABLE "public"."prayers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "arabicText" TEXT NOT NULL,
    "latinText" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "authorId" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prayers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."prayers" ADD CONSTRAINT "prayers_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
