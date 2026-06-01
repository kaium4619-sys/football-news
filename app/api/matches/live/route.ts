import { fetchLiveMatches } from "@/lib/api-football";
import { NextResponse } from "next/server";

export const revalidate = 30;

export async function GET() {
  try {
    const data = await fetchLiveMatches();
    if (data && Array.isArray(data) && data.length > 0) {
      return NextResponse.json(data);
    }
    // Fallback: Strictly return empty array. Zero mock data.
    return NextResponse.json([]);
  } catch (error) {
    console.error("[API-LiveMatches] Error:", error);
    return NextResponse.json([]);
  }
}
