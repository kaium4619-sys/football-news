import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, TTL, checkRateLimit } from "@/lib/redis-cache";
import { fetchRecentFixtures, normaliseFixture } from "@/lib/football-api";
import { upsertFixtures } from "@/lib/supabase-client";

export const runtime = "nodejs";

// Top 5 European leagues + Champions League
const TOP_LEAGUES = [
  { id: 39,  name: "Premier League",    season: 2024 },
  { id: 140, name: "La Liga",           season: 2024 },
  { id: 78,  name: "Bundesliga",        season: 2024 },
  { id: 135, name: "Serie A",           season: 2024 },
  { id: 61,  name: "Ligue 1",           season: 2024 },
  { id: 2,   name: "Champions League",  season: 2024 },
];

const CACHE_KEY = "football:results:recent";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = await checkRateLimit(ip, 60);
  if (!allowed) {
    return NextResponse.json(
      { status: "error", message: "Rate limit exceeded." },
      { status: 429 }
    );
  }

  const count = parseInt(req.nextUrl.searchParams.get("count") ?? "5", 10);

  // ── 1. Redis cache ────────────────────────────────────────────────────────
  const cached = await cacheGet(CACHE_KEY);
  if (cached) {
    return NextResponse.json(cached);
  }

  // ── 2. Fetch from API-Football in parallel ────────────────────────────────
  const results = await Promise.allSettled(
    TOP_LEAGUES.map((l) => fetchRecentFixtures(l.id, l.season, count))
  );

  const allFixtures: unknown[] = [];
  for (const result of results) {
    if (result.status === "fulfilled" && Array.isArray(result.value)) {
      // Filter to only finished matches (FT, AET, PEN)
      const finished = result.value.filter((m: any) => {
        const s = m?.fixture?.status?.short;
        return s === "FT" || s === "AET" || s === "PEN";
      });
      allFixtures.push(...finished);

      // Persist to Supabase (fire-and-forget)
      if (finished.length > 0) {
        const normalised = (finished as Record<string, unknown>[]).map(normaliseFixture);
        upsertFixtures(normalised).catch(console.error);
      }
    }
  }

  if (allFixtures.length > 0) {
    await cacheSet(CACHE_KEY, allFixtures, TTL.FIXTURES);
    return NextResponse.json(allFixtures);
  }

  // ── 3. Empty fallback ─────────────────────────────────────────────────────
  return NextResponse.json([]);
}
