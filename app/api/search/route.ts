import { NextRequest, NextResponse } from "next/server";
import { searchTeams, searchLeagues } from "@/lib/api-football";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 3) {
    return NextResponse.json({ teams: [], leagues: [] });
  }

  try {
    const [teams, leagues] = await Promise.all([
      searchTeams(query),
      searchLeagues(query),
    ]);

    return NextResponse.json({
      teams: teams || [],
      leagues: leagues || [],
    });
  } catch (error) {
    console.error("[SEARCH_API_ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
