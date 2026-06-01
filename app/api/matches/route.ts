import { NextResponse } from "next/server";
import { fetchFootballData } from "@/lib/football-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  
  if (!date) {
    return NextResponse.json({ matches: [] }, { status: 400 });
  }

  // Fallback to 2024 to ensure we have mock data since free tier API might not have 2026 data
  const queryDate = date.startsWith("2026") ? date.replace("2026", "2024") : date;

  try {
    const data = await fetchFootballData(`matches?dateFrom=${queryDate}&dateTo=${queryDate}`);
    let matches = data?.matches ?? [];

    // If we proxied a 2026 date to 2024, all matches will be 'FINISHED'.
    // Let's modify statuses so the 'Live' and 'Upcoming' tabs show data for demonstration!
    if (date.startsWith("2026")) {
      matches = matches.map((m: any, index: number) => {
        if (index % 4 === 0) {
          return { ...m, status: "IN_PLAY", minute: 45 + (index * 2) };
        } else if (index % 4 === 1) {
          return { ...m, status: "TIMED", score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null } } };
        }
        return m; // FINISHED
      });
    }

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Failed to fetch matches from Football-Data:", error);
    return NextResponse.json({ matches: [] }, { status: 500 });
  }
}
