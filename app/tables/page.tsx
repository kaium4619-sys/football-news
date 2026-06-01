"use client";

import { useState } from "react";
import { StandingsWidget } from "@/components/matches/StandingsWidget";
import WorldCup2026GroupTables from "@/components/competitions/WorldCup2026GroupTables";
import { ListOrdered, Trophy, TrendingUp } from "lucide-react";
import Image from "next/image";
import { ALL_LEAGUES } from "@/lib/api-mock";

export default function TablesPage() {
  const [activeLeagueId, setActiveLeagueId] = useState(39);

  const selectedLeague = ALL_LEAGUES.find((l) => l.id === activeLeagueId) || ALL_LEAGUES[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
             <ListOrdered className="h-10 w-10 text-primary" /> League Tables
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
             Stay up to date with the latest standings, points, and form for all major football leagues across Europe and the world.
          </p>
        </div>

        {/* League Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
           {ALL_LEAGUES.map((league) => {
             const isActive = league.id === activeLeagueId;
             return (
               <button 
                 key={league.id} 
                 onClick={() => setActiveLeagueId(league.id)}
                 className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                   isActive ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(204,255,0,0.1)]" : "border-border bg-card hover:border-muted-foreground"
                 }`}
               >
                  <div className="relative w-10 h-10">
                    <Image src={league.logo} alt={league.name} fill sizes="40px" className="object-contain" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-center">{league.name}</span>
               </button>
             );
           })}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Table Area */}
            <div className="lg:col-span-8">
               <div className="bg-card border border-border rounded-[32px] overflow-hidden">
                  <div className="p-8 border-b border-border/50 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12">
                           <Image src={selectedLeague.logo} alt={selectedLeague.name} fill sizes="48px" className="object-contain" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-black uppercase tracking-tight">{selectedLeague.name}</h2>
                        </div>
                     </div>
                     <div className="hidden md:flex items-center gap-3">
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-bold uppercase text-muted-foreground">Region</span>
                           <span className="font-black text-lg">{selectedLeague.country}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-4 md:p-8">
                     {activeLeagueId === 1 ? (
                        <WorldCup2026GroupTables />
                     ) : (
                        <StandingsWidget leagueId={activeLeagueId} />
                     )}
                  </div>
               </div>
            </div>

            {/* Sidebar Info */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
               <div className="rounded-3xl border border-border bg-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                     <Trophy className="h-6 w-6 text-primary" />
                     <h3 className="text-xl font-black uppercase tracking-tighter">Qualification</h3>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-sm font-bold">Champions League / Top Promotion</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-bold">Europa League / Mid Tier Promotion</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm font-bold">Conference League / Lower Promotion</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-bold">Relegation</span>
                     </div>
                  </div>
               </div>

               <div className="rounded-3xl border border-border bg-card p-8 bg-gradient-to-br from-primary/5 to-transparent">
                  <TrendingUp className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-black uppercase mb-2">Real-time Standings</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                     Select any competition from the list above to instantly view the updated team points, matches played, goal differences, and current form guide.
                  </p>
               </div>
            </aside>
         </div>

      </div>
    </div>
  );
}