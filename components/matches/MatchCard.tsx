import Image from "next/image";
import Link from "next/link";
import { Match } from "@/types/football";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function MatchCard({ match, className }: { match: Match; className?: string }) {
  const isLive = match.fixture.status.short === '1H' || match.fixture.status.short === '2H' || match.fixture.status.short === 'HT';

  return (
    <Link 
      href={`/matches/${match.fixture.id}`} 
      className={cn("block w-full overflow-hidden rounded-[14px] border border-white/5 bg-[#0c1527]/80 backdrop-blur-sm hover:border-primary/50 hover:bg-[#0c1527] transition-all duration-300 group relative p-4 shadow-lg", className)}
    >
      {/* Subtle glow effect for live matches inside the border */}
      {isLive && <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
      
      {/* League Header & Time */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2 max-w-[70%]">
          <span className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest truncate">{match.league.name}</span>
        </div>
        {isLive ? (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-black text-primary">{match.fixture.status.elapsed}&apos;</span>
          </div>
        ) : (
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex-shrink-0">
            {match.fixture.status.short}
          </span>
        )}
      </div>

      {/* Teams and Score */}
      <div className="flex flex-col gap-3 relative z-10">
        
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-[22px] h-[22px] relative flex-shrink-0 drop-shadow-md">
              {match.teams.home.logo ? (
                <Image src={match.teams.home.logo} alt={match.teams.home.name} fill sizes="22px" className="object-contain" />
              ) : (
                <div className="w-full h-full bg-white/10 rounded-full" />
              )}
            </div>
            <span className={cn("text-sm font-bold truncate tracking-tight", match.teams.home.winner ? "text-white" : "text-white/80")}>
              {match.teams.home.name}
            </span>
          </div>
          <div className="text-sm font-black flex-shrink-0 pl-3 font-mono text-white">
            {match.goals.home ?? '-'}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-[22px] h-[22px] relative flex-shrink-0 drop-shadow-md">
              {match.teams.away.logo ? (
                <Image src={match.teams.away.logo} alt={match.teams.away.name} fill sizes="22px" className="object-contain" />
              ) : (
                <div className="w-full h-full bg-white/10 rounded-full" />
              )}
            </div>
            <span className={cn("text-sm font-bold truncate tracking-tight", match.teams.away.winner ? "text-white" : "text-white/80")}>
              {match.teams.away.name}
            </span>
          </div>
          <div className="text-sm font-black flex-shrink-0 pl-3 font-mono text-white">
            {match.goals.away ?? '-'}
          </div>
        </div>
      </div>

      {/* Divider & Footer */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-end relative z-10">
        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1 group-hover:text-primary transition-colors">
          Match Centre <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
