import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// Helper function to get auth token from cookies
export const getAuthToken = () => {
  if (typeof document === 'undefined') return null;
  const authCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth-token='));
  return authCookie ? authCookie.split('=')[1] : null;
};
