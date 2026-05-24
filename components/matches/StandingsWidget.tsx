"use client";

import Image from "next/image";
import Link from "next/link";
import { useStandings } from "@/lib/hooks/useStandings";
import { cn } from "@/lib/utils";
import { ALL_TEAMS, ALL_LEAGUES } from "@/lib/api-mock";

export function StandingsWidget({ leagueId = 39 }: { leagueId?: number }) {
  const { standings, isLoading } = useStandings(leagueId);
  const league = ALL_LEAGUES.find(l => l.id === leagueId);
  const leagueName = league?.name || "League";

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 animate-pulse">
        <div className="h-6 w-40 bg-muted rounded mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-10 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="bg-muted/30 px-4 py-3 border-b border-border/50">
        <h2 className="font-bold tracking-tight text-sm uppercase flex items-center gap-2">
          <span className="w-1.5 h-4 bg-primary rounded-full"></span>
          {leagueName} Standings
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-[10px] uppercase font-bold border-b border-border/30">
              <th className="px-4 py-2 text-left w-8">#</th>
              <th className="px-2 py-2 text-left">Team</th>
              <th className="px-2 py-2 text-center">P</th>
              <th className="px-2 py-2 text-center">GD</th>
              <th className="px-4 py-2 text-center font-black text-foreground">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing) => (
              <tr key={standing.team.id} className="border-b border-border/20 hover:bg-muted/10 transition-colors group">
                <td className="px-4 py-3 text-left">
                  <span className={cn(
                    "font-bold text-xs",
                    standing.rank <= 4 ? "text-primary" : "text-muted-foreground"
                  )}>
                    {standing.rank}
                  </span>
                </td>
                <td className="px-2 py-3" title={`${standing.team.name}\n${ALL_TEAMS.find(t => t.id === standing.team.id)?.country || "Unknown"}`}>
                  <div className="flex items-center gap-2">
                    <div className="relative w-5 h-5 flex-shrink-0">
                      <Image src={standing.team.logo} alt={standing.team.name} fill sizes="20px" className="object-contain" />
                    </div>
                    <span className="font-bold truncate max-w-[100px] md:max-w-none cursor-help">{standing.team.name}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-center text-muted-foreground">{standing.all.played}</td>
                <td className="px-2 py-3 text-center text-muted-foreground">
                    <span className={cn(standing.goalsDiff > 0 ? "text-green-400" : "text-red-400")}>
                        {standing.goalsDiff > 0 ? `+${standing.goalsDiff}` : standing.goalsDiff}
                    </span>
                </td>
                <td className="px-4 py-3 text-center font-black text-foreground">{standing.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 bg-muted/10 text-[10px] text-muted-foreground flex justify-between items-center">
        <div className="flex gap-2">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> CL</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> EL</span>
        </div>
        <Link href="/competitions" className="text-primary font-bold hover:underline">View All Competitions</Link>
      </div>
    </div>
  );
}
