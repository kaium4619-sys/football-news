import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side client (used in API routes)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ────────────────────────────────────────────────────────────────────

export interface DbMatch {
  fixture_id: number;
  league_id: number;
  home_team: string;
  away_team: string;
  home_score?: number | null;
  away_score?: number | null;
  status: string;
  start_time: string;
  venue?: string;
  referee?: string;
  raw_json?: Record<string, unknown>;
}

export interface DbTeam {
  team_id: number;
  name: string;
  country?: string;
  logo?: string;
  league?: string;
  raw_json?: Record<string, unknown>;
}

export interface DbPlayer {
  player_id: number;
  name: string;
  team_id?: number;
  position?: string;
  nationality?: string;
  photo?: string;
  stats?: Record<string, unknown>;
  raw_json?: Record<string, unknown>;
}

export interface DbFixture {
  fixture_id: number;
  league_id: number;
  home_team: string;
  away_team: string;
  match_date: string;
  start_time: string;
  status: string;
  raw_json?: Record<string, unknown>;
}

// ── Upsert helpers ────────────────────────────────────────────────────────────

export async function upsertMatches(matches: DbMatch[]) {
  if (!matches.length) return;
  const { error } = await supabase
    .from("matches")
    .upsert(matches, { onConflict: "fixture_id" });
  if (error) console.error("[Supabase] upsertMatches:", error.message);
}

export async function upsertTeam(team: DbTeam) {
  const { error } = await supabase
    .from("teams")
    .upsert(team, { onConflict: "team_id" });
  if (error) console.error("[Supabase] upsertTeam:", error.message);
}

export async function upsertPlayer(player: DbPlayer) {
  const { error } = await supabase
    .from("players")
    .upsert(player, { onConflict: "player_id" });
  if (error) console.error("[Supabase] upsertPlayer:", error.message);
}

export async function upsertFixtures(fixtures: DbFixture[]) {
  if (!fixtures.length) return;
  const { error } = await supabase
    .from("fixtures")
    .upsert(fixtures, { onConflict: "fixture_id" });
  if (error) console.error("[Supabase] upsertFixtures:", error.message);
}

export async function upsertStandings(leagueId: number, season: number, data: unknown) {
  const { error } = await supabase
    .from("standings_cache")
    .upsert({ league_id: leagueId, season, data }, { onConflict: "league_id,season" });
  if (error) console.error("[Supabase] upsertStandings:", error.message);
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

export async function getStoredLiveMatches() {
  const { data } = await supabase
    .from("matches")
    .select("raw_json")
    .in("status", ["1H", "2H", "HT", "ET", "BT", "P", "LIVE"])
    .order("start_time", { ascending: true });
  return data?.map((r) => r.raw_json) ?? [];
}

export async function getStoredFixtures(leagueId: number, date: string) {
  const { data } = await supabase
    .from("fixtures")
    .select("raw_json")
    .eq("league_id", leagueId)
    .eq("match_date", date)
    .order("start_time", { ascending: true });
  return data?.map((r) => r.raw_json) ?? [];
}

export async function getStoredStandings(leagueId: number, season: number) {
  const { data } = await supabase
    .from("standings_cache")
    .select("data")
    .eq("league_id", leagueId)
    .eq("season", season)
    .single();
  return data?.data ?? null;
}

export async function getStoredTeam(teamId: number) {
  const { data } = await supabase
    .from("teams")
    .select("raw_json")
    .eq("team_id", teamId)
    .single();
  return data?.raw_json ?? null;
}

export async function getStoredPlayer(playerId: number) {
  const { data } = await supabase
    .from("players")
    .select("raw_json")
    .eq("player_id", playerId)
    .single();
  return data?.raw_json ?? null;
}
