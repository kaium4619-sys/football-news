import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Proxy image URLs that block direct hotlinking (e.g. Google encrypted thumbnails).
 * Routes them through images.weserv.nl which fetches and serves them freely.
 * Safe to call on any URL — non-blocked URLs are returned unchanged.
 */
export function proxyImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  // Google encrypted thumbnails block hotlinking from external sites
  if (url.includes("encrypted-tbn0.gstatic.com") || url.includes("encrypted-tbn")) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=800&q=80`;
  }
  return url;
}
