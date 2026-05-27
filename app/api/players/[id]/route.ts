import { fetchPlayer } from "@/lib/football-api";
import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const playerId = parseInt(id, 10);
    if (isNaN(playerId)) {
      return NextResponse.json({ error: "Invalid player ID" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const season = searchParams.get("season");

    const data = await fetchPlayer(
      playerId,
      season ? parseInt(season, 10) : 2024
    );

    if (!data) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API-Player] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
