import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization for better performance
  output: "standalone",

  // Configure images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Ensure API routes work correctly
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
