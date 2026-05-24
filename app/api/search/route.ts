import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, CacheKey, TTL, checkRateLimit } from "@/lib/redis-cache";
import { searchTeams, searchLeagues } from "@/lib/football-api";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = await checkRateLimit(ip, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const query = req.nextUrl.searchParams.get("q");
  if (!query || query.length < 3) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  const cacheKey = CacheKey.search(query.toLowerCase());

  // 1. Redis cache hit
  const cached = await cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // 2. Call API-Football
  // We'll run both team and league search concurrently
  const [teams, leagues] = await Promise.all([
    searchTeams(query),
    searchLeagues(query)
  ]);

  const result = {
    teams: Array.isArray(teams) ? teams.slice(0, 5) : [],
    leagues: Array.isArray(leagues) ? leagues.slice(0, 5) : []
  };

  await cacheSet(cacheKey, result, TTL.SEARCH);

  return NextResponse.json(result);
}
