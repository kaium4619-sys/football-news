import { fetchLiveMatches } from "@/lib/football-api";
import { NextResponse } from "next/server";

export const revalidate = 30;

export async function GET() {
  try {
    const data = await fetchLiveMatches();
    if (!data) {
      return NextResponse.json({ error: "Failed to fetch live matches" }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API-LiveMatches] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
