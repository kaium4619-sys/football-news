import { fetchRecentFixtures } from "@/lib/api-football";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leagueId = searchParams.get("league");
    const season = searchParams.get("season");
    const count = searchParams.get("count");
    const countNum = count ? parseInt(count, 10) : 10;

    if (leagueId) {
      const data = await fetchRecentFixtures(
        parseInt(leagueId, 10),
        season ? parseInt(season, 10) : 2024,
        countNum
      );
      if (data && Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data);
      }
    }

    // Fallback: strictly return empty array. Zero mock data.
    return NextResponse.json([]);
  } catch (error) {
    console.error("[API-Results] Error:", error);
    return NextResponse.json([]);
  }
}
