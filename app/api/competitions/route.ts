import { NextResponse } from "next/server";
import { fetchFootballDataCompetitions } from "@/lib/football-data";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const competitions = await fetchFootballDataCompetitions();
  return NextResponse.json(competitions || []);
}