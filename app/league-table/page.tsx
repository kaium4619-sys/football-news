import { Metadata } from "next";
import React from "react";
import { fetchStandings } from "@/lib/api-football";
import { Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Football League Tables & Standings | Football Pulse",
  description: "Check the latest league tables, team standings, and form guides for the top football leagues worldwide.",
  alternates: { canonical: "https://www.footballpulse.online/league-table" },
};



export const revalidate = 600; // Cache for 10 minutes

export default async function LeagueTablePage({
  searchParams,
}: {
  searchParams: Promise<{ leagueId?: string }>;
}) {
  const { leagueId } = await searchParams;
  const id = leagueId ? parseInt(leagueId, 10) : 39; // Default to Premier League

  const standingsData = await fetchStandings(id, 2024);
  const standings = Array.isArray(standingsData) ? (standingsData as any)[0]?.standings[0] : [];

  const leagueName = standings?.[0]?.league?.name || "League Table";

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-black uppercase tracking-tight">{leagueName}</h1>
      </div>

      {standings && standings.length > 0 ? (
        <div className="rounded-3xl overflow-hidden border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-xs uppercase font-bold border-b border-border/50 bg-muted/20">
                <th className="px-6 py-4 text-left w-12">Pos</th>
                <th className="px-6 py-4 text-left">Team</th>
                <th className="px-4 py-4 text-center">P</th>
                <th className="px-4 py-4 text-center">W</th>
                <th className="px-4 py-4 text-center">D</th>
                <th className="px-4 py-4 text-center">L</th>
                <th className="px-4 py-4 text-center">GD</th>
                <th className="px-6 py-4 text-center font-black text-foreground">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team: any, i: number) => (
                <tr key={team.team.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors group">
                  <td className="px-6 py-4 font-bold text-muted-foreground">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <img src={team.team.logo} alt={team.team.name} className="object-contain w-full h-full" />
                      </div>
                      <span className="font-bold">{team.team.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-muted-foreground">{team.all.played}</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">{team.all.win}</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">{team.all.draw}</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">{team.all.loss}</td>
                  <td className="px-4 py-4 text-center text-muted-foreground">{team.goalsDiff}</td>
                  <td className="px-6 py-4 text-center font-black text-foreground">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-border rounded-3xl bg-card">
          <Trophy className="w-12 h-12 text-muted-foreground" />
          <div>
            <h2 className="text-xl font-bold">No Standings Available</h2>
            <p className="text-muted-foreground">We couldn&apos;t find standings data for the selected league.</p>
          </div>
        </div>
      )}
    </div>
  );
}
