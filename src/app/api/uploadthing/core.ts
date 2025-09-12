import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  // News image uploader
  newsImageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("News image upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
    }),

  // Gallery image uploader
  galleryImageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery image upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
    }),

  // Registration photo uploader
  registrationPhotoUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(
        "Registration photo upload complete for userId:",
        metadata.userId
      );
      console.log("file url", file.ufsUrl);
    }),

  // Registration Family Card (KK) uploader
  registrationFamilyCardUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(
        "Registration family card upload complete for userId:",
        metadata.userId
      );
      console.log("file url", file.ufsUrl);
    }),

  // Registration Birth Certificate (Akta) uploader
  registrationBirthCertificateUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(
        "Registration birth certificate upload complete for userId:",
        metadata.userId
      );
      console.log("file url", file.ufsUrl);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
