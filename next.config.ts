import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    minimumCacheTTL: 3600, // cache remote images for 1 hour
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/webp"],
    remotePatterns: [
      { protocol: 'https', hostname: 'media.api-sports.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'thumbs.dreamstime.com' },
      { protocol: 'https', hostname: 'images.weserv.nl' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'a.espncdn.com' },
      { protocol: 'https', hostname: 'crests.football-data.org' },
      { protocol: 'https', hostname: 'static-cdn.toi-media.com' },
      { protocol: 'https', hostname: 'images.teamtalk.com' },
      { protocol: 'https', hostname: '**.twimg.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
    ]
  },
};

export default nextConfig;
