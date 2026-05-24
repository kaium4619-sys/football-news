import Image from "next/image";
import Link from "next/link";
import { Match } from "@/types/football";
import { cn } from "@/lib/utils";
import { ALL_TEAMS } from "@/lib/api-mock";

export function MatchCard({ match, className }: { match: Match; className?: string }) {
  const isLive = match.fixture.status.short === '1H' || match.fixture.status.short === '2H' || match.fixture.status.short === 'HT';

  return (
    <Link href={`/matches/${match.fixture.id}`} className={cn("block w-full overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all group relative", className)}>
      {/* Subtle glow effect for live matches inside the border */}
      {isLive && <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
      
      {/* League Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-b border-border/50 relative z-10">
        <div className="flex items-center gap-2">
          {match.league.logo && (
            <div className="relative w-4 h-4">
              <Image src={match.league.logo} alt={match.league.name} fill sizes="20px" className="object-contain" />
            </div>
          )}
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{match.league.name}</span>
        </div>
        {isLive ? (
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold text-primary">{match.fixture.status.elapsed}&apos;</span>
          </div>
        ) : (
          <span className="text-xs font-medium text-muted-foreground">{match.fixture.status.short}</span>
        )}
      </div>

      {/* Teams and Score */}
      <div className="p-4 flex items-center justify-between relative z-10">
        
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0" title={`${match.teams.home.name}\n${ALL_TEAMS.find(t => t.id === match.teams.home.id)?.country || "Unknown"}`}>
          <div className="w-10 h-10 md:w-12 md:h-12 relative drop-shadow-lg group-hover:scale-105 transition-transform cursor-help">
            <Image src={match.teams.home.logo} alt={match.teams.home.name} fill sizes="40px" className="object-contain" />
          </div>
          <span className="text-xs md:text-sm font-semibold text-center truncate w-full px-1 cursor-help">{match.teams.home.name}</span>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center justify-center px-4 md:px-6">
          <div className="text-2xl md:text-3xl font-black tracking-tighter flex items-center gap-3">
            <span className={cn(match.teams.home.winner ? "text-foreground underline decoration-primary decoration-4 underline-offset-8" : isLive ? "text-foreground" : "text-muted-foreground")}>{match.goals.home ?? '-'}</span>
            <span className="text-muted-foreground/30 text-xl font-normal">-</span>
            <span className={cn(match.teams.away.winner ? "text-foreground underline decoration-primary decoration-4 underline-offset-8" : isLive ? "text-foreground" : "text-muted-foreground")}>{match.goals.away ?? '-'}</span>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0" title={`${match.teams.away.name}\n${ALL_TEAMS.find(t => t.id === match.teams.away.id)?.country || "Unknown"}`}>
          <div className="w-10 h-10 md:w-12 md:h-12 relative drop-shadow-lg group-hover:scale-105 transition-transform cursor-help">
            <Image src={match.teams.away.logo} alt={match.teams.away.name} fill sizes="40px" className="object-contain" />
          </div>
          <span className="text-xs md:text-sm font-semibold text-center truncate w-full px-1 cursor-help">{match.teams.away.name}</span>
        </div>
      </div>
    </Link>
  );
}
