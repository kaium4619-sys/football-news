import { LiveScoreWidget } from "@/components/matches/LiveScoreWidget";
import { MatchesWidget } from "@/components/matches/MatchesWidget";
import { CalendarDays, Filter, Search } from "lucide-react";

export default function MatchesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase mb-2">Football Fixtures</h1>
          <p className="text-muted-foreground">Stay updated with live scores and upcoming matches from around the world.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search leagues or teams..." 
              className="bg-card border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors w-full md:w-64"
            />
          </div>
          <button className="p-2.5 rounded-full border border-border bg-card hover:border-primary transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-10">
          


          {/* Matches List */}
          <MatchesWidget />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <LiveScoreWidget />
          <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-transparent p-6 border border-primary/20 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-black text-xl mb-2 italic">GOALSTREAM+</h3>
               <p className="text-sm text-muted-foreground mb-4">Get exclusive insights, advanced stats, and ad-free experience.</p>
               <button className="w-full bg-primary text-primary-foreground font-black py-3 rounded-xl hover:scale-[1.02] transition-transform">UPGRADE NOW</button>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-10">
                <Search className="w-24 h-24 rotate-12" />
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
