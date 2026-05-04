import type { NextConfig } from "next";

/**
 * Public URLs are Swedish (`/om-mig`, `/projekt`, `/kontakt`); route folders stay English
 * (`app/about`, `app/projects`, `app/contact`). Rewrites map Swedish → English; redirects
 * send English paths to Swedish so the address bar never stays on English segments.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/om-mig", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      { source: "/projects", destination: "/projekt", permanent: true },
      { source: "/projects/:slug", destination: "/projekt/:slug", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/om-mig", destination: "/about" },
      { source: "/kontakt", destination: "/contact" },
      { source: "/projekt", destination: "/projects" },
      { source: "/projekt/:slug", destination: "/projects/:slug" },
    ];
  },
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
