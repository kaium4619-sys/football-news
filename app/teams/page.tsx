import Image from "next/image";
import Link from "next/link";
import { Search, Shield, Globe, Users, TrendingUp } from "lucide-react";
import { ALL_TEAMS, ALL_LEAGUES } from "@/lib/api-mock";

export default function TeamsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black tracking-tight uppercase mb-4">Teams & Countries</h1>
            <p className="text-muted-foreground text-lg">Browse through hundreds of football clubs and international competitions from across the globe.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search team or country..." 
              className="w-full bg-card border border-border rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>


        {/* Featured Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Clubs Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-black uppercase tracking-tight">Popular Clubs</h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/20 px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" /> Trending Clubs
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_TEAMS.filter(t => t.country !== "World").map(team => (
                  <Link key={team.id} href={`/teams/${team.id}`} className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:bg-muted/5 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Image src={team.logo} alt={team.name} fill sizes="48px" className="object-contain" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold truncate text-base">{team.name}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1.5">
                            {team.country}
                          </span>
                        </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-muted/20 text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        View Profile
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* National Teams Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-black uppercase tracking-tight">Famous National Teams</h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/20 px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" /> International
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_TEAMS.filter(t => t.country === "World").map(team => (
                  <Link key={team.id} href={`/teams/${team.id}`} className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:bg-muted/5 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Image src={team.logo} alt={team.name} fill sizes="48px" className="object-contain" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold truncate text-base">{team.name}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1.5">
                            National Team
                          </span>
                        </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-muted/20 text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        View Profile
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            
            <button className="w-full mt-4 py-4 bg-muted/20 border border-border rounded-2xl font-bold text-sm hover:bg-muted/30 transition-colors">
              Explore All 15,000+ Teams Worldwide
            </button>
          </div>

          {/* Sidebar Info */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="rounded-3xl border border-border bg-card p-8 relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                      <Users className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-black uppercase tracking-tighter">Global Database</h3>
                 </div>
                 <div className="space-y-6">
                   <p className="text-sm text-muted-foreground leading-relaxed">
                     Our database spans across 160 countries, providing real-time squad updates, injury reports, and transfer market values.
                   </p>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 text-center">
                         <span className="block text-2xl font-black text-primary">160+</span>
                         <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Countries</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 text-center">
                         <span className="block text-2xl font-black text-primary">2.5k+</span>
                         <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Leagues</span>
                      </div>
                   </div>
                 </div>
               </div>
               <div className="absolute -right-4 -bottom-4 opacity-5">
                  <Shield className="w-40 h-40" />
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
