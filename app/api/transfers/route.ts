import { fetchTransfers } from "@/lib/football-api";
import { NextResponse } from "next/server";

export const revalidate = 21600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leagueId = searchParams.get("league");
    const season = searchParams.get("season");

    if (!leagueId) {
      return NextResponse.json({ error: "League ID is required" }, { status: 400 });
    }

    const data = await fetchTransfers(
      parseInt(leagueId, 10),
      season ? parseInt(season, 10) : 2024
    );

    if (!data) {
      return NextResponse.json({ error: "Transfers not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API-Transfers] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
