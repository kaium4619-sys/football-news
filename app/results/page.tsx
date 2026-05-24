import { LiveScoreWidget } from "@/components/matches/LiveScoreWidget";
import { MatchCard } from "@/components/matches/MatchCard";
import { MOCK_RESULTS } from "@/lib/api-mock";
import { CalendarDays, Search, CheckCircle2 } from "lucide-react";

export default function ResultsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-2 flex items-center gap-3">
             <CheckCircle2 className="h-8 w-8 text-primary" /> Recent Results
          </h1>
          <p className="text-muted-foreground">Catch up on all the final scores and match statistics from the past week.</p>
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
          
          {/* Results List */}
          <div className="space-y-12">
            {/* Group results by league */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-6 bg-primary rounded-full"></span>
                <h2 className="text-xl font-black uppercase tracking-tight">Premier League</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_RESULTS.filter(m => m.league.id === 39).map(match => (
                  <MatchCard key={match.fixture.id} match={match} />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-6 bg-primary rounded-full"></span>
                <h2 className="text-xl font-black uppercase tracking-tight">Ligue 1</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_RESULTS.filter(m => m.league.id === 61).map(match => (
                  <MatchCard key={match.fixture.id} match={match} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <LiveScoreWidget />
          <div className="rounded-2xl border border-border bg-card p-6">
             <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Why GoalsStream?</h3>
             <p className="text-xs text-muted-foreground leading-relaxed">
               We provide the fastest result updates, detailed match timelines, and post-match analysis for over 800 leagues.
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
