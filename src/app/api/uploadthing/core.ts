import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  // News image uploader
  newsImageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("News image upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),

  // Gallery image uploader
  galleryImageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery image upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
