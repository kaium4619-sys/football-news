/**
 * Upstash Redis cache layer.
 * Falls back to a server-side in-process Map if Upstash env vars are not set,
 * so the app works out of the box even without Redis configured.
 */

// ── TTL constants (seconds) ──────────────────────────────────────────────────
export const TTL = {
  LIVE: 30,           // live match scores
  FIXTURES: 3600,     // upcoming fixtures   (1 hour)
  STANDINGS: 600,     // league tables       (10 min)
  TEAM: 86400,        // team info           (24 h)
  PLAYER: 86400,      // player info         (24 h)
  SEARCH: 86400,      // search results      (24 h)
  RATE_LIMIT: 60,     // rate-limit window   (1 min)
} as const;

// ── Key builders ─────────────────────────────────────────────────────────────
export const CacheKey = {
  live: (leagueId: number | "all") => `football:live:matches:${leagueId}`,
  fixtures: (league: number, date: string) => `football:fixtures:${league}:${date}`,
  standings: (league: number, season: number) => `football:standings:${league}:${season}`,
  team: (teamId: number) => `football:team:${teamId}`,
  player: (playerId: number) => `football:player:${playerId}`,
  matchStats: (fixtureId: number) => `football:match:stats:${fixtureId}`,
  matchEvents: (fixtureId: number) => `football:match:events:${fixtureId}`,
  search: (query: string) => `football:search:${query}`,
  rateLimit: (userId: string) => `rate:${userId}`,
};

// ── Upstash REST helpers ──────────────────────────────────────────────────────
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const useUpstash = Boolean(
  UPSTASH_URL &&
    UPSTASH_TOKEN &&
    !UPSTASH_URL.startsWith("your-")
);

async function upstashCmd(...args: (string | number)[]): Promise<unknown> {
  const res = await fetch(`${UPSTASH_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  const json = (await res.json()) as { result: unknown };
  return json.result;
}

// ── In-process fallback (dev / no Redis) ─────────────────────────────────────
interface CacheEntry { value: string; expiresAt: number }
const memStore = new Map<string, CacheEntry>();

function memGet(key: string): string | null {
  const entry = memStore.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { memStore.delete(key); return null; }
  return entry.value;
}
function memSet(key: string, value: string, ttlSeconds: number) {
  memStore.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}
function memDel(key: string) { memStore.delete(key); }
function memIncr(key: string, ttlSeconds: number): number {
  const raw = memGet(key);
  const next = (raw ? parseInt(raw, 10) : 0) + 1;
  memSet(key, String(next), ttlSeconds);
  return next;
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function cacheGet<T = unknown>(key: string): Promise<T | null> {
  if (useUpstash) {
    const raw = await upstashCmd("GET", key) as string | null;
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
  }
  const raw = memGet(key);
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds: number): Promise<void> {
  const serialised = JSON.stringify(value);
  if (useUpstash) {
    await upstashCmd("SET", key, serialised, "EX", ttlSeconds);
    return;
  }
  memSet(key, serialised, ttlSeconds);
}

export async function cacheDel(key: string): Promise<void> {
  if (useUpstash) { await upstashCmd("DEL", key); return; }
  memDel(key);
}

/**
 * Simple sliding-window rate limiter.
 * Returns { allowed, count } — call sites decide what to do on denial.
 */
export async function checkRateLimit(
  userId: string,
  maxRequests = 60
): Promise<{ allowed: boolean; count: number }> {
  const key = CacheKey.rateLimit(userId);
  let count: number;
  if (useUpstash) {
    count = (await upstashCmd("INCR", key)) as number;
    if (count === 1) await upstashCmd("EXPIRE", key, TTL.RATE_LIMIT);
  } else {
    count = memIncr(key, TTL.RATE_LIMIT);
  }
  return { allowed: count <= maxRequests, count };
}
