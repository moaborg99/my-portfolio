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
      // Match-ish your lib limit (~4.5 MB) plus form field overhead.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
