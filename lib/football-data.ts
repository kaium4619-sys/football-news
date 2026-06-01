import { Standing } from "@/types/football";

const FOOTBALL_DATA_ORG_KEY = process.env.FOOTBALL_DATA_ORG_KEY ?? "";
const BASE_URL = "https://api.football-data.org/v4";

// Map API-Sports League IDs to Football-Data.org Competition Codes
const LEAGUE_MAP: Record<number, string> = {
  39: "PL",  // Premier League
  140: "PD", // La Liga
  78: "BL1", // Bundesliga
  135: "SA", // Serie A
  61: "FL1", // Ligue 1
  94: "PPL", // Primeira Liga
  2: "CL",   // Champions League
  3: "EL",   // Europa League
  4: "EC",   // Euro Championship
  1: "WC",   // World Cup
};

export async function fetchFootballData(endpoint: string) {
  if (!FOOTBALL_DATA_ORG_KEY) return null;
  try {
    const res = await fetch(`${BASE_URL}/${endpoint.replace(/^\//, "")}`, {
      headers: { "X-Auth-Token": FOOTBALL_DATA_ORG_KEY },
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchFootballDataStandings(leagueId: number, season?: number): Promise<Standing[] | null> {
  const code = LEAGUE_MAP[leagueId];
  if (!code) return null; // Fallback to our mock data for unsupported leagues

  if (!FOOTBALL_DATA_ORG_KEY) {
    console.warn("[Football-Data] Missing API Key");
    return null;
  }

  const url = season 
    ? `${BASE_URL}/competitions/${code}/standings?season=${season}`
    : `${BASE_URL}/competitions/${code}/standings`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Auth-Token": FOOTBALL_DATA_ORG_KEY
      },
      next: { revalidate: 300 } // Cache for 5 mins
    });

    if (!res.ok) {
      console.warn(`[Football-Data] Failed to fetch standings for ${code}: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return transformStandings(data);
  } catch (error) {
    console.error(`[Football-Data] Error fetching standings for ${code}:`, error);
    return null;
  }
}

// Transform the football-data.org response into our universal `Standing` type
function transformStandings(data: any): Standing[] {
  if (!data || !data.standings || !Array.isArray(data.standings)) return [];

  let result: Standing[] = [];

  for (const group of data.standings) {
    // Check if it's a valid table
    if (group.type !== "TOTAL" || !Array.isArray(group.table)) continue;

    const groupName = group.group ? group.group.replace("_", " ") : data.competition.name;

    const groupStandings = group.table.map((row: any) => ({
      rank: row.position,
      team: {
        id: row.team.id,
        name: row.team.shortName || row.team.name,
        logo: row.team.crest || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
      },
      points: row.points,
      goalsDiff: row.goalDifference,
      group: groupName,
      form: row.form ? row.form.replace(/,/g, "") : "", // e.g., "W,D,L" -> "WDL"
      status: "same",
      description: null,
      all: {
        played: row.playedGames,
        win: row.won,
        draw: row.draw,
        lose: row.lost,
        goals: {
          for: row.goalsFor,
          against: row.goalsAgainst,
        }
      },
      update: new Date().toISOString()
    }));

    result = result.concat(groupStandings);
  }

  return result;
}

export async function fetchFootballDataCompetitions() {
  if (!FOOTBALL_DATA_ORG_KEY) {
    console.warn("[Football-Data] Missing API Key");
    return [];
  }
  try {
    const res = await fetch(`${BASE_URL}/competitions`, {
      headers: { "X-Auth-Token": FOOTBALL_DATA_ORG_KEY },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.competitions || [];
  } catch (err) {
    console.error("[Football-Data] Error fetching competitions:", err);
    return [];
  }
}
