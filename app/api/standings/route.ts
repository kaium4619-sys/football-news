import { fetchStandings } from "@/lib/api-football";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leagueId = searchParams.get("league");
    const season = searchParams.get("season");

    if (!leagueId) {
      return NextResponse.json({ error: "League ID is required" }, { status: 400 });
    }

    const id = parseInt(leagueId, 10);
    const year = season ? parseInt(season, 10) : 2024;

    const data = await fetchStandings(id, year);
    
    if (data && Array.isArray(data) && data.length > 0) {
      return NextResponse.json(data);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error("[API-Standings] Error:", error);
    return NextResponse.json([]);
  }
}
