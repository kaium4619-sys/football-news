import { fetchMatchEvents } from "@/lib/api-football";
import { NextResponse } from "next/server";

export const revalidate = 30;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fixtureId = parseInt(id, 10);
    if (isNaN(fixtureId)) {
      return NextResponse.json({ error: "Invalid fixture ID" }, { status: 400 });
    }

    const data = await fetchMatchEvents(fixtureId);
    if (!data) {
      return NextResponse.json({ error: "Match events not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API-MatchEvents] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
