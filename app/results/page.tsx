"use client";

import { useResults } from "@/lib/hooks/useResults";
import { LiveScoreWidget } from "@/components/matches/LiveScoreWidget";
import { MatchCard } from "@/components/matches/MatchCard";
import { Match } from "@/types/football";
import Image from "next/image";
import { CheckCircle2, Search } from "lucide-react";

export default function ResultsPage() {
  const { results, isLoading, isError } = useResults(6);

  // Group by Date first, then by League
  const groupedByDate = results.reduce((acc, match) => {
    // Format date as YYYY-MM-DD
    const matchDate = new Date(match.fixture.date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateKey = matchDate.toISOString().split("T")[0];
    let dateLabel = dateKey;
    
    if (dateKey === today.toISOString().split("T")[0]) dateLabel = "Today";
    else if (dateKey === yesterday.toISOString().split("T")[0]) dateLabel = "Yesterday";
    else dateLabel = matchDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

    if (!acc[dateLabel]) acc[dateLabel] = {};
    
    const leagueId = match.league.id;
    if (!acc[dateLabel][leagueId]) {
      acc[dateLabel][leagueId] = { league: match.league, matches: [] };
    }
    acc[dateLabel][leagueId].matches.push(match);
    return acc;
  }, {} as Record<string, Record<number, { league: { id: number; name: string; logo: string; country: string; flag: string | null; season: number; round: string }; matches: Match[] }>>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-2 flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-primary" /> Recent Results
          </h1>
          <p className="text-muted-foreground">
            Catch up on all the final scores and match statistics from recent days.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search results..."
              className="bg-card border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors w-full md:w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-10">

          {/* Loading skeleton */}
          {isLoading && (
            <div className="space-y-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="h-6 w-40 bg-muted rounded" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map((j) => (
                      <div key={j} className="h-32 bg-muted rounded-xl" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div className="text-muted-foreground p-10 text-center bg-card rounded-2xl border border-border font-bold">
              Failed to load results. Please try again later.
            </div>
          )}

          {/* Results grouped by Date then League */}
          {!isLoading && !isError && Object.keys(groupedByDate).length === 0 && (
            <div className="text-muted-foreground p-10 text-center bg-card rounded-2xl border border-border font-bold">
              No recent results available.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="space-y-12">
              {Object.entries(groupedByDate).map(([dateLabel, leagueGroups]) => (
                <div key={dateLabel} className="space-y-8">
                  <div className="sticky top-[64px] z-10 bg-background/95 backdrop-blur py-3 border-b border-border/50">
                     <h2 className="text-2xl font-black uppercase tracking-tight text-primary">
                       {dateLabel}
                     </h2>
                  </div>
                  {Object.values(leagueGroups).map((group) => (
                    <section key={group.league.id}>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-2 h-6 bg-muted-foreground/30 rounded-full" />
                        {group.league.logo && (
                          <div className="relative w-6 h-6">
                            <Image
                              src={group.league.logo}
                              alt={group.league.name}
                              fill
                              sizes="24px"
                              className="object-cover object-top"
                            />
                          </div>
                        )}
                        <h3 className="text-lg font-black uppercase tracking-tight text-foreground/80">
                          {group.league.name}
                        </h3>
                        <span className="text-xs text-muted-foreground font-bold uppercase">
                          {group.league.country}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {group.matches.map((match) => (
                          <MatchCard key={match.fixture.id} match={match} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <LiveScoreWidget />
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4">
              Why Football Pulse?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We provide the fastest result updates, detailed match timelines, and post-match
              analysis for over 800 leagues worldwide — powered by live data.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
