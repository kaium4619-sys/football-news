import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, TTL, checkRateLimit } from "@/lib/redis-cache";
import { fetchFixtures, normaliseFixture } from "@/lib/football-api";
import { upsertFixtures } from "@/lib/supabase-client";

export const runtime = "nodejs";

const TOP_LEAGUES = [
  { id: 39,  season: 2024 }, // Premier League
  { id: 140, season: 2024 }, // La Liga
  { id: 78,  season: 2024 }, // Bundesliga
  { id: 135, season: 2024 }, // Serie A
  { id: 61,  season: 2024 }, // Ligue 1
  { id: 2,   season: 2024 }, // Champions League
  { id: 3,   season: 2024 }, // Europa League
];

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = await checkRateLimit(ip, 60);
  if (!allowed) {
    return NextResponse.json(
      { status: "error", message: "Rate limit exceeded." },
      { status: 429 }
    );
  }

  const date =
    req.nextUrl.searchParams.get("date") ??
    new Date().toISOString().slice(0, 10);

  const cacheKey = `football:fixtures:today:${date}`;

  // ── 1. Redis cache ────────────────────────────────────────────────────────
  const cached = await cacheGet(cacheKey);
  if (cached) return NextResponse.json(cached);

  // ── 2. Fetch all leagues in parallel ─────────────────────────────────────
  const results = await Promise.allSettled(
    TOP_LEAGUES.map((l) => fetchFixtures(l.id, date, l.season))
  );

  const allFixtures: unknown[] = [];
  for (const r of results) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      allFixtures.push(...r.value);

      if (r.value.length > 0) {
        const normalised = (r.value as Record<string, unknown>[]).map(normaliseFixture);
        upsertFixtures(normalised).catch(console.error);
      }
    }
  }

  // Sort by kick-off time
  allFixtures.sort((a: any, b: any) =>
    (a?.fixture?.timestamp ?? 0) - (b?.fixture?.timestamp ?? 0)
  );

  if (allFixtures.length > 0) {
    await cacheSet(cacheKey, allFixtures, TTL.FIXTURES);
    return NextResponse.json(allFixtures);
  }

  return NextResponse.json([]);
}
