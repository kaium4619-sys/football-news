import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    
    minimumCacheTTL: 3600, // cache remote images for 1 hour
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      // Allow all HTTPS image sources (posts use dynamic URLs from various CDNs)
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
