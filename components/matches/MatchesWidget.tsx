"use client";

import { useLiveMatches } from "@/lib/hooks/useLiveMatches";
import { MatchCard } from "@/components/matches/MatchCard";
import { Match } from "@/types/football";

export function MatchesWidget() {
  const { matches, isError, isLoading } = useLiveMatches();

  if (isLoading) {
    return (
      <div className="space-y-4">
         <div className="h-6 w-32 bg-muted rounded animate-pulse mb-6"></div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted rounded-xl animate-pulse"></div>
            ))}
         </div>
      </div>
    );
  }

  if (isError || !matches || !Array.isArray(matches)) {
    return <div className="text-muted-foreground p-8 text-center bg-card rounded-2xl border border-border">Failed to load live matches. Please try again later.</div>;
  }

  if (matches.length === 0) {
    return <div className="text-muted-foreground p-8 text-center bg-card rounded-2xl border border-border font-bold">No matches are currently live.</div>;
  }

  // Group by league
  const grouped = matches.reduce((acc, match) => {
    const id = match.league.id;
    if (!acc[id]) acc[id] = { league: match.league, matches: [] };
    acc[id].matches.push(match);
    return acc;
  }, {} as Record<number, { league: any, matches: Match[] }>);

  return (
    <div className="space-y-8">
      {Object.values(grouped).map((group) => (
        <section key={group.league.id}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-6 bg-primary rounded-full animate-pulse"></span>
            <h2 className="text-xl font-black uppercase tracking-tight">{group.league.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.matches.map(match => (
              <MatchCard key={match.fixture.id} match={match} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
