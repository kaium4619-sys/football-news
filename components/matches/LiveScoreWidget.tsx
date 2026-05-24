"use client";

import { useLiveMatches } from "@/lib/hooks/useLiveMatches";
import { MatchCard } from "./MatchCard";

export function LiveScoreWidget() {
  const { matches, isLoading } = useLiveMatches();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-1">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <h2 className="font-bold tracking-tight text-xl uppercase">Live Now</h2>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {matches.map(match => (
          <MatchCard key={match.fixture.id} match={match} />
        ))}
      </div>
    </div>
  );
}
