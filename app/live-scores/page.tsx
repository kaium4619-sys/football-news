import { Metadata } from "next";
import React from "react";
import { fetchLiveMatches } from "@/lib/api-football";
import { MatchCard } from "@/components/matches/MatchCard";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Live Scores Hub | Fast Football Updates | Football Pulse",
  description: "Track live football scores instantly. Get real-time updates for all ongoing matches in the Premier League, La Liga, and more.",
  alternates: { canonical: "https://www.footballpulse.online/live-scores" },
};

export const revalidate = 30; // Cache for 30 seconds

export default async function LiveScoresPage() {
  const matches = await fetchLiveMatches();

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight">Live Scores</h1>
      </div>

      {Array.isArray(matches) && matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match: any) => (
            <MatchCard key={match.fixture.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-border rounded-3xl bg-card">
          <Activity className="w-12 h-12 text-muted-foreground" />
          <div>
            <h2 className="text-xl font-bold">No Live Matches</h2>
            <p className="text-muted-foreground">There are currently no live football matches to display.</p>
          </div>
        </div>
      )}
    </div>
  );
}
