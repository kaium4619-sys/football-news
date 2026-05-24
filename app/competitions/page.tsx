import Image from "next/image";
import Link from "next/link";
import { Trophy, Search, Globe, Award, ShieldCheck, Users, Flame } from "lucide-react";
import { ALL_LEAGUES, FAMOUS_PLAYERS } from "@/lib/api-mock";

import { WorldCupLogo } from "@/components/icons/WorldCupLogo";

export default function CompetitionsPage() {
  const leagues = ALL_LEAGUES.filter(l => l.type === 'League');
  const international = ALL_LEAGUES.filter(l => l.type === 'International');
  const clubIntl = ALL_LEAGUES.filter(l => l.type === 'Club-Int');
  const worldCup = international.find(c => c.id === 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-16">
        
        {/* Page Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-3">
              <Trophy className="h-10 w-10 md:h-12 md:w-12 text-primary" /> Competition Hub
            </h1>
            <p className="text-muted-foreground text-lg">Comprehensive coverage of the world&apos;s most prestigious football tournaments and top-tier talent.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search competitions or players..." className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>

        {/* FIFA World Cup Featured Hero - 2026 Edition */}
        {worldCup && (
          <section className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background border border-primary/20 p-8 md:p-12 group">
             <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 group-hover:opacity-20 transition-opacity">
                <WorldCupLogo className="w-full h-full rotate-12" />
             </div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_30px_rgba(204,255,0,0.3)] group-hover:scale-105 transition-transform flex items-center justify-center bg-muted/20 rounded-[32px]">
                   {worldCup.logo ? (
                     <Image src={worldCup.logo} alt="FIFA World Cup 2026" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
                   ) : (
                     <WorldCupLogo className="w-32 h-32" />
                   )}
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                   <div className="flex gap-2">
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-[11px] font-black uppercase tracking-widest">Featured Tournament</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[11px] font-black uppercase tracking-widest">2026 Edition</span>
                   </div>
                   <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">{worldCup.name}</h2>
                   <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-black uppercase tracking-widest text-muted-foreground">
                      <span className="text-white">United States</span>
                      <span className="text-primary opacity-50">|</span>
                      <span className="text-red-500">Canada</span>
                      <span className="text-primary opacity-50">|</span>
                      <span className="text-green-500">México</span>
                   </div>
                   <p className="text-muted-foreground max-w-xl text-lg mt-2">The pinnacle of world football returns. Catch all the action, history, and updates for the first-ever 48-team global tournament.</p>
                   <Link href={`/competitions/1`} className="mt-4 px-10 py-5 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform inline-flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(204,255,0,0.5)]">
                      Explore 2026 Tournament <WorldCupLogo className="w-5 h-5" />
                   </Link>
                </div>
             </div>
          </section>
        )}

        {/* Famous Players Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
               <Users className="w-6 h-6 text-primary" />
               <h2 className="text-2xl font-black uppercase tracking-tight">Famous Players</h2>
             </div>
             <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full">
                <Flame className="w-3.5 h-3.5 fill-primary" /> Trending Now
             </div>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
            {FAMOUS_PLAYERS.map(player => (
              <Link href={`/players/${encodeURIComponent(player.name)}`} key={player.id} className="flex-shrink-0 w-64 bg-card border border-border rounded-[32px] p-6 group hover:border-primary/50 hover:-translate-y-1 transition-all block">
                 <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6">
                    <Image src={player.image} alt={player.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                       <span className="text-[11px] font-black text-primary uppercase tracking-widest">View Profile</span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <h3 className="font-black text-lg group-hover:text-primary transition-colors">{player.name}</h3>
                    <div className="flex items-center justify-between">
                       <span className="text-[11px] font-bold text-muted-foreground uppercase">{player.team}</span>
                       <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">{player.position}</span>
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Other Competitions Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           {/* International National Teams */}
           <section>
              <div className="flex items-center gap-3 mb-8">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-black uppercase tracking-tight">International</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {international.filter(c => c.id !== 1).map(comp => (
                  <Link key={comp.id} href={`/competitions/${comp.id}`} className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/50 transition-all">
                    <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform flex items-center justify-center bg-muted/20 rounded-xl">
                      {comp.logo ? (
                        <Image src={comp.logo} alt={comp.name} fill sizes="64px" className="object-contain" />
                      ) : (
                        <Trophy className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{comp.name}</h3>
                      <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest">{comp.country}</span>
                    </div>
                  </Link>
                ))}
              </div>
           </section>

           {/* Club International */}
           <section>
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Club International</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clubIntl.map(comp => (
                  <Link key={comp.id} href={`/competitions/${comp.id}`} className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/50 transition-all">
                    <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform flex items-center justify-center bg-muted/20 rounded-xl">
                      {comp.logo ? (
                        <Image src={comp.logo} alt={comp.name} fill sizes="64px" className="object-contain" />
                      ) : (
                        <Trophy className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{comp.name}</h3>
                      <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest">{comp.country}</span>
                    </div>
                  </Link>
                ))}
              </div>
           </section>
        </div>

        {/* Domestic Leagues Mini Grid */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Award className="award w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Domestic Leagues</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4">
            {leagues.map(comp => (
              <Link key={comp.id} href={`/competitions/${comp.id}`} className="group flex flex-col items-center gap-4 p-6 rounded-3xl bg-card border border-border hover:border-primary transition-all text-center">
                 <div className="relative w-10 h-10 group-hover:scale-110 transition-transform flex items-center justify-center bg-muted/20 rounded-xl">
                   {comp.logo ? (
                     <Image src={comp.logo} alt={comp.name} fill sizes="40px" className="object-contain" />
                   ) : (
                     <Trophy className="w-5 h-5 text-muted-foreground" />
                   )}
                 </div>
                 <span className="font-bold text-[11px] uppercase group-hover:text-primary transition-colors">{comp.name}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
