import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, CacheKey, TTL, checkRateLimit } from "@/lib/redis-cache";
import { fetchLiveMatches, normaliseMatch, formatOutputMatch } from "@/lib/football-api";
import { upsertMatches, getStoredLiveMatches } from "@/lib/supabase-client";
import { MOCK_LIVE_MATCHES } from "@/lib/api-mock";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  // ── Rate limiting ─────────────────────────────────────────────────────────
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = await checkRateLimit(ip, 60);
  if (!allowed) {
    return NextResponse.json(
      { status: "error", message: "Rate limit exceeded. Max 60 req/min." },
      { status: 429 }
    );
  }

  const leagueId = req.nextUrl.searchParams.get("league");
  const league = leagueId ? parseInt(leagueId, 10) : ("all" as const);
  const cacheKey = CacheKey.live(league);

  // ── 1. Redis cache hit ────────────────────────────────────────────────────
  const cached = await cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // ── 2. Call API-Football ──────────────────────────────────────────────────
  const apiData = await fetchLiveMatches(typeof league === "number" ? league : undefined);

  if (apiData && Array.isArray(apiData)) {
    if (apiData.length > 0) {
      // Normalise + persist to Supabase (fire-and-forget)
      const normalised = (apiData as Record<string, unknown>[]).map(normaliseMatch);
      upsertMatches(normalised).catch(console.error);
    }

    await cacheSet(cacheKey, apiData, TTL.LIVE);
    return NextResponse.json(apiData);
  }

  // ── 3. Supabase fallback ──────────────────────────────────────────────────
  // Note: stored matches don't have the full raw structure, so we might need a better fallback
  // For now return empty array if API fails
  return NextResponse.json([]);
}
