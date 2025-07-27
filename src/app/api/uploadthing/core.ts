import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { validateSession } from "@/lib/auth";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // News image uploader
  newsImageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const cookies = req.headers.get('cookie');
      const tokenMatch = cookies?.match(/auth-token=([^;]+)/);
      const token = tokenMatch ? tokenMatch[1] : null;
      
      if (!token) {
        throw new UploadThingError("No token provided");
      }

      const user = await validateSession(token);
      
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("News image upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { url: file.url };
    }),

  // Gallery image uploader
  galleryImageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const cookies = req.headers.get('cookie');
      const tokenMatch = cookies?.match(/auth-token=([^;]+)/);
      const token = tokenMatch ? tokenMatch[1] : null;
      
      if (!token) {
        throw new UploadThingError("No token provided");
      }

      const user = await validateSession(token);
      
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery image upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
