import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, CacheKey, TTL, checkRateLimit } from "@/lib/redis-cache";
import { fetchTeam } from "@/lib/football-api";
import { upsertTeam, getStoredTeam } from "@/lib/supabase-client";

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

  const teamIdStr = req.nextUrl.searchParams.get("id");
  if (!teamIdStr) {
    return NextResponse.json({ status: "error", message: "Missing team id" }, { status: 400 });
  }

  const teamId = parseInt(teamIdStr, 10);
  const cacheKey = CacheKey.team(teamId);

  // ── 1. Redis ──────────────────────────────────────────────────────────────
  const cached = await cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // ── 2. API-Football ───────────────────────────────────────────────────────
  const apiData = await fetchTeam(teamId) as any;
  if (apiData && apiData.team) {
    // Normalise + persist to Supabase (fire-and-forget)
    const dbTeam = {
      team_id: apiData.team.id,
      name: apiData.team.name,
      country: apiData.team.country,
      logo: apiData.team.logo,
      raw_json: apiData,
    };
    upsertTeam(dbTeam).catch(console.error);

    await cacheSet(cacheKey, apiData, TTL.TEAM);
    return NextResponse.json(apiData);
  }

  // ── 3. Supabase ───────────────────────────────────────────────────────────
  const stored = await getStoredTeam(teamId);
  if (stored) {
    await cacheSet(cacheKey, stored, TTL.TEAM);
    return NextResponse.json(stored);
  }

  // ── 4. Fallback ───────────────────────────────────────────────────────────
  return NextResponse.json(null, { status: 404 });
}
