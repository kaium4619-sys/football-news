import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bypass Vercel's image optimization service (free tier has 1,000/month limit
    // which causes 402 Payment Required errors when exceeded).
    // Images are served directly from their source URLs instead.
    unoptimized: true,
  },
};

export default nextConfig;
