import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, CacheKey, TTL, checkRateLimit } from "@/lib/redis-cache";
import { fetchMatchStatistics } from "@/lib/football-api";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = await checkRateLimit(ip, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { id } = await params;
  const fixtureId = parseInt(id, 10);
  if (isNaN(fixtureId)) {
    return NextResponse.json({ error: "Invalid match ID" }, { status: 400 });
  }

  const cacheKey = CacheKey.matchStats(fixtureId);

  // 1. Redis cache hit
  const cached = await cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // 2. Call API-Football
  const apiData = await fetchMatchStatistics(fixtureId);
  if (apiData && Array.isArray(apiData)) {
    await cacheSet(cacheKey, apiData, TTL.FIXTURES);
    return NextResponse.json(apiData);
  }

  return NextResponse.json([]);
}
