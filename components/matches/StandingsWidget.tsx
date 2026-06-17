"use client";

import Image from "next/image";
import Link from "next/link";
import { useStandings } from "@/lib/hooks/useStandings";
import { cn } from "@/lib/utils";

export function StandingsWidget({ leagueId = 39 }: { leagueId?: number }) {
  const { standings, isLoading } = useStandings(leagueId);

  // Group standings by their group name (important for World Cup / Champions League)
  const groupedStandings = standings?.reduce((acc, standing) => {
    const groupName = standing.group || "League";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(standing);
    return acc;
  }, {} as Record<string, typeof standings>) || {};

  const groups = Object.entries(groupedStandings);

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

  if (groups.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 flex flex-col items-center justify-center text-center">
        <p className="text-muted-foreground font-semibold text-lg">Verified standings currently unavailable.</p>
        <p className="text-sm text-muted-foreground mt-2">Data verification failed or is currently pending.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map(([groupName, groupStandings]) => (
        <div key={groupName} className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b border-border/50">
            <h2 className="font-bold tracking-tight text-sm uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-primary rounded-full"></span>
              {groupName.replace(/_/g, " ")} Standings
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
                {groupStandings.map((standing) => {
                  // Determine qualification color dynamically based on description
                  let badgeColor = "bg-transparent";
                  if (standing.description) {
                     if (standing.description.toLowerCase().includes("champions league") || standing.description.toLowerCase().includes("advance")) badgeColor = "bg-primary";
                     else if (standing.description.toLowerCase().includes("europa") || standing.description.toLowerCase().includes("promotion")) badgeColor = "bg-blue-400";
                     else if (standing.description.toLowerCase().includes("relegation")) badgeColor = "bg-red-400";
                     else if (standing.description.toLowerCase().includes("conference")) badgeColor = "bg-green-400";
                  }

                  return (
                    <tr key={standing.team.id} className="border-b border-border/20 hover:bg-muted/10 transition-colors group relative">
                      <td className="px-4 py-3 text-left relative">
                        {/* Qualification badge */}
                        <div className={cn("absolute left-0 top-0 bottom-0 w-1", badgeColor)} title={standing.description || undefined}></div>
                        <span className="font-bold text-xs text-foreground">
                          {standing.rank}
                        </span>
                      </td>
                      <td className="px-2 py-3" title={standing.team.name}>
                        <div className="flex items-center gap-2">
                          <div className="relative w-7 h-7 flex-shrink-0">
                            <Image src={standing.team.logo} alt={standing.team.name} fill sizes="28px" className="object-contain" />
                          </div>
                          <span className="font-bold truncate max-w-[100px] md:max-w-none cursor-help">{standing.team.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-center text-muted-foreground">{standing.all.played}</td>
                      <td className="px-2 py-3 text-center text-muted-foreground">
                          <span className={cn(standing.goalsDiff > 0 ? "text-green-400" : (standing.goalsDiff < 0 ? "text-red-400" : ""))}>
                              {standing.goalsDiff > 0 ? `+${standing.goalsDiff}` : standing.goalsDiff}
                          </span>
                      </td>
                      <td className="px-4 py-3 text-center font-black text-foreground">{standing.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Link href="/competitions" className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">View All Competitions</Link>
      </div>
    </div>
  );
}
