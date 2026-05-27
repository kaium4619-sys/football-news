import { fetchFixtures } from "@/lib/football-api";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leagueId = searchParams.get("league");
    const date = searchParams.get("date");
    const season = searchParams.get("season");

    if (!leagueId || !date) {
      return NextResponse.json({ error: "League ID and date are required" }, { status: 400 });
    }

    const data = await fetchFixtures(
      parseInt(leagueId, 10),
      date,
      season ? parseInt(season, 10) : 2024
    );

    if (!data) {
      return NextResponse.json({ error: "Fixtures not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API-Fixtures] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
