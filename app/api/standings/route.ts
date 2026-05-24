import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, CacheKey, TTL, checkRateLimit } from "@/lib/redis-cache";
import { fetchStandings } from "@/lib/football-api";
import { upsertStandings, getStoredStandings } from "@/lib/supabase-client";
import { getMockStandingsForLeague } from "@/lib/api-mock";

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
  const season   = parseInt(req.nextUrl.searchParams.get("season") ?? "2024", 10);
  const cacheKey = CacheKey.standings(leagueId, season);

  // ── 1. Redis ──────────────────────────────────────────────────────────────
  const cached = await cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // ── 2. API-Football ───────────────────────────────────────────────────────
  const apiData = await fetchStandings(leagueId, season);
  if (apiData && Array.isArray(apiData)) {
    if (apiData.length > 0) {
      upsertStandings(leagueId, season, apiData).catch(console.error);
    }
    await cacheSet(cacheKey, apiData, TTL.STANDINGS);
    return NextResponse.json(apiData);
  }

  // ── 3. Supabase ───────────────────────────────────────────────────────────
  const stored = await getStoredStandings(leagueId, season);
  if (stored) {
    await cacheSet(cacheKey, stored, TTL.STANDINGS);
    return NextResponse.json(stored);
  }

  // ── 4. Fallback (No Real Data) ────────────────────────────────────────────
  return NextResponse.json([]);
}
