import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, CacheKey, TTL, checkRateLimit } from "@/lib/redis-cache";
import { fetchFixtures, normaliseFixture, formatOutputMatch } from "@/lib/football-api";
import { upsertFixtures, getStoredFixtures } from "@/lib/supabase-client";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = await checkRateLimit(ip, 60);
  if (!allowed) {
    return NextResponse.json(
      { status: "error", message: "Rate limit exceeded." },
      { status: 429 }
    );
  }

  const leagueId = parseInt(req.nextUrl.searchParams.get("league") ?? "39", 10);
  const date = req.nextUrl.searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
  const season = parseInt(req.nextUrl.searchParams.get("season") ?? "2024", 10);
  const cacheKey = CacheKey.fixtures(leagueId, date);

  // ── 1. Redis ──────────────────────────────────────────────────────────────
  const cached = await cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // ── 2. API-Football ───────────────────────────────────────────────────────
  const apiData = await fetchFixtures(leagueId, date, season);
  if (apiData && Array.isArray(apiData)) {
    if (apiData.length > 0) {
      // Normalise + persist to Supabase (fire-and-forget)
      const normalised = (apiData as Record<string, unknown>[]).map(normaliseFixture);
      upsertFixtures(normalised).catch(console.error);
    }

    await cacheSet(cacheKey, apiData, TTL.FIXTURES);
    return NextResponse.json(apiData);
  }

  // ── 3. Fallback ───────────────────────────────────────────────────────────
  return NextResponse.json([]);
}
