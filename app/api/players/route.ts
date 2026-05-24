import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, CacheKey, TTL, checkRateLimit } from "@/lib/redis-cache";
import { fetchPlayer } from "@/lib/football-api";
import { upsertPlayer, getStoredPlayer } from "@/lib/supabase-client";

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

  const playerIdStr = req.nextUrl.searchParams.get("id");
  if (!playerIdStr) {
    return NextResponse.json({ status: "error", message: "Missing player id" }, { status: 400 });
  }

  const playerId = parseInt(playerIdStr, 10);
  const cacheKey = CacheKey.player(playerId);

  // ── 1. Redis ──────────────────────────────────────────────────────────────
  const cached = await cacheGet(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // ── 2. API-Football ───────────────────────────────────────────────────────
  const apiData = await fetchPlayer(playerId) as any;
  if (apiData && apiData.player) {
    // Normalise + persist to Supabase (fire-and-forget)
    const dbPlayer = {
      player_id: apiData.player.id,
      name: apiData.player.name,
      nationality: apiData.player.nationality,
      photo: apiData.player.photo,
      stats: apiData.statistics?.[0] || {},
      raw_json: apiData,
    };
    upsertPlayer(dbPlayer).catch(console.error);

    await cacheSet(cacheKey, apiData, TTL.PLAYER);
    return NextResponse.json(apiData);
  }

  // ── 3. Supabase ───────────────────────────────────────────────────────────
  const stored = await getStoredPlayer(playerId);
  if (stored) {
    await cacheSet(cacheKey, stored, TTL.PLAYER);
    return NextResponse.json(stored);
  }

  // ── 4. Fallback ───────────────────────────────────────────────────────────
  return NextResponse.json(null, { status: 404 });
}
