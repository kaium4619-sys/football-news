/**
 * API-Football (RapidAPI) fetcher.
 * Never call this directly — always go through the caching API routes.
 */

const API_KEY = process.env.API_FOOTBALL_KEY ?? "";
const API_HOST = process.env.API_FOOTBALL_HOST ?? "api-football-v1.p.rapidapi.com";
const BASE_URL = API_HOST.includes("api-sports.io") ? `https://${API_HOST}` : `https://${API_HOST}/v3`;

const hasKey = Boolean(API_KEY && !API_KEY.startsWith("your-"));

const headers: HeadersInit = {
  Accept: "application/json",
};

if (API_HOST.includes("rapidapi.com")) {
  headers["X-RapidAPI-Key"] = API_KEY;
  headers["X-RapidAPI-Host"] = API_HOST;
} else {
  headers["x-apisports-key"] = API_KEY;
}

async function apiFetch<T = unknown>(path: string): Promise<T | null> {
  if (!hasKey) {
    console.warn("[API-Football] No API key configured — returning null.");
    return null;
  }
  try {
    const res = await fetch(`${BASE_URL}${path}`, { headers, next: { revalidate: 0 } });
    if (!res.ok) {
      console.error(`[API-Football] ${path} → HTTP ${res.status}`);
      return null;
    }
    const json = (await res.json()) as { response: T };
    return json.response ?? null;
  } catch (err) {
    console.error("[API-Football] fetch error:", err);
    return null;
  }
}

// ── Endpoint wrappers ─────────────────────────────────────────────────────────

/** All currently live fixtures (optionally filter by league). */
export async function fetchLiveMatches(leagueId?: number) {
  const qs = leagueId ? `?live=all&league=${leagueId}` : "?live=all";
  return apiFetch<unknown[]>(`/fixtures${qs}`);
}

/** Fixtures for a given league on a specific date (YYYY-MM-DD). */
export async function fetchFixtures(leagueId: number, date: string, season: number) {
  return apiFetch<unknown[]>(`/fixtures?league=${leagueId}&season=${season}&date=${date}`);
}

/** Recent fixtures for a given league. */
export async function fetchRecentFixtures(leagueId: number, season: number = 2024, count: number = 5) {
  return apiFetch<unknown[]>(`/fixtures?league=${leagueId}&season=${season}&last=${count}`);
}

/** Single fixture by ID. */
export async function fetchFixture(fixtureId: number) {
  const data = await apiFetch<unknown[]>(`/fixtures?id=${fixtureId}`);
  return data?.[0] ?? null;
}

/** League standings for a given season. */
export async function fetchStandings(leagueId: number, season: number) {
  return apiFetch<unknown[]>(`/standings?league=${leagueId}&season=${season}`);
}

/** Team info by ID. */
export async function fetchTeam(teamId: number) {
  const data = await apiFetch<{ team: unknown; venue: unknown }[]>(`/teams?id=${teamId}`);
  return data?.[0] ?? null;
}

/** Player info and stats by player ID and season. */
export async function fetchPlayer(playerId: number, season = 2024) {
  const data = await apiFetch<{ player: unknown; statistics: unknown[] }[]>(
    `/players?id=${playerId}&season=${season}`
  );
  return data?.[0] ?? null;
}

/** All available leagues. */
export async function fetchLeagues() {
  return apiFetch<unknown[]>("/leagues");
}

/** Match statistics. */
export async function fetchMatchStatistics(fixtureId: number) {
  return apiFetch<unknown[]>(`/fixtures/statistics?fixture=${fixtureId}`);
}

/** Match events. */
export async function fetchMatchEvents(fixtureId: number) {
  return apiFetch<unknown[]>(`/fixtures/events?fixture=${fixtureId}`);
}

/** Search teams. */
export async function searchTeams(query: string) {
  return apiFetch<unknown[]>(`/teams?search=${encodeURIComponent(query)}`);
}

/** Search leagues. */
export async function searchLeagues(query: string) {
  return apiFetch<unknown[]>(`/leagues?search=${encodeURIComponent(query)}`);
}

/** Transfer data for a given league and season. */
export async function fetchTransfers(leagueId: number, season: number) {
  return apiFetch<unknown[]>(`/transfers?league=${leagueId}&season=${season}`);
}

// ── Normalizers for Supabase storage ─────────────────────────────────────────

export function normaliseMatch(raw: Record<string, unknown>) {
  const fixture = raw.fixture as Record<string, unknown>;
  const league  = raw.league  as Record<string, unknown>;
  const teams   = raw.teams   as { home: Record<string, unknown>; away: Record<string, unknown> };
  const goals   = raw.goals   as { home: number | null; away: number | null };
  const status  = (fixture?.status as Record<string, unknown>)?.short as string;

  return {
    fixture_id: fixture?.id as number,
    league_id:  league?.id  as number,
    home_team:  teams?.home?.name as string,
    away_team:  teams?.away?.name as string,
    home_score: goals?.home ?? null,
    away_score: goals?.away ?? null,
    status:     status ?? "NS",
    start_time: fixture?.date as string,
    venue:      (fixture?.venue as Record<string, unknown>)?.name as string | undefined,
    referee:    fixture?.referee as string | undefined,
    raw_json:   raw,
  };
}

export function normaliseFixture(raw: Record<string, unknown>) {
  const fixture = raw.fixture as Record<string, unknown>;
  const league  = raw.league  as Record<string, unknown>;
  const teams   = raw.teams   as { home: Record<string, unknown>; away: Record<string, unknown> };
  const date    = (fixture?.date as string)?.slice(0, 10) ?? "";

  return {
    fixture_id: fixture?.id  as number,
    league_id:  league?.id   as number,
    home_team:  teams?.home?.name as string,
    away_team:  teams?.away?.name as string,
    match_date: date,
    start_time: fixture?.date as string,
    status:     (fixture?.status as Record<string, unknown>)?.short as string ?? "NS",
    raw_json:   raw,
  };
}

export function formatOutputMatch(raw: Record<string, unknown>) {
  const fixture = raw.fixture as Record<string, unknown> | undefined;
  const league  = raw.league  as Record<string, unknown> | undefined;
  const teams   = raw.teams   as { home: Record<string, unknown>; away: Record<string, unknown> } | undefined;
  const goals   = raw.goals   as { home: number | null; away: number | null } | undefined;

  return {
    fixture_id: fixture?.id ?? null,
    league: league?.name ?? null,
    home_team: teams?.home?.name ?? null,
    away_team: teams?.away?.name ?? null,
    score: {
      home: goals?.home ?? null,
      away: goals?.away ?? null
    },
    status: (fixture?.status as Record<string, unknown>)?.short ?? null,
    date_utc: fixture?.date ?? null,
    timestamp: fixture?.timestamp ?? null
  };
}
