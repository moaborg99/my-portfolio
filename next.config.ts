import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1mb — too small for featured images via FormData.
      // Featured (~4.5 MB) + several gallery images (2 MB each) + form overhead.
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
