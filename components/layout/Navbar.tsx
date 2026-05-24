"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Trophy, Home, Newspaper, Calendar, Shield, Activity, ChevronDown, ListOrdered, CheckCircle2, ArrowRightLeft, Globe, Award, Star, Users } from "lucide-react";
import { ALL_LEAGUES, ALL_TEAMS, FAMOUS_PLAYERS } from "@/lib/api-mock";
import { SearchDropdown } from "@/components/SearchDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo.png" alt="The Football Pulse Logo" width={40} height={40} className="object-contain rounded-full overflow-hidden" />
          <span className="font-bold text-xl tracking-tight text-foreground">The Football Pulse</span>
        </Link>
        
        <nav className="hidden xl:flex items-center gap-4 font-medium text-xs h-full">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <Link href="/news" className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
            <Newspaper className="h-3.5 w-3.5" /> News
          </Link>
          <Link href="/matches" className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
            <Calendar className="h-3.5 w-3.5" /> Matches
          </Link>
          <Link href="/results" className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
            <CheckCircle2 className="h-3.5 w-3.5" /> Results
          </Link>
          <Link href="/tables" className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
            <ListOrdered className="h-3.5 w-3.5" /> Tables
          </Link>
          <Link href="/transfers" className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
            <ArrowRightLeft className="h-3.5 w-3.5" /> Transfers
          </Link>
          
          {/* Competitions Dropdown - 4 Columns Mega Menu including Famous Players */}
          <div className="group relative h-full flex items-center cursor-pointer">
            <div className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap font-bold text-primary">
              <Trophy className="h-3.5 w-3.5" /> Competitions <ChevronDown className="h-3 w-3" />
            </div>
            <div className="absolute top-full right-[-200px] hidden group-hover:block w-[1000px] bg-card border border-border rounded-2xl shadow-2xl p-8 animate-in fade-in slide-in-from-top-2 duration-200 z-[100] mt-[-1px]">
               <div className="grid grid-cols-[1fr_1fr_1fr_1.4fr] gap-4">
                  {/* Domestic Leagues */}
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest border-b border-border/50 pb-2 mb-2">
                        <Award className="w-3 h-3" /> Major Leagues
                     </div>
                     <div className="space-y-1">
                        {ALL_LEAGUES.filter(l => l.type === 'League').map(league => (
                          <Link key={league.id} href={`/competitions/${league.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-all group/item">
                             <div className="relative w-6 h-6 flex-shrink-0 bg-muted/20 rounded-lg p-1 group-hover/item:scale-110 transition-transform flex items-center justify-center">
                               {league.logo ? (
                                 <Image src={league.logo} alt={league.name} fill sizes="32px" className="object-contain" />
                               ) : (
                                 <Trophy className="w-4 h-4 text-muted-foreground" />
                               )}
                             </div>
                             <span className="text-[11px] font-black group-hover/item:text-primary transition-colors uppercase leading-tight">{league.name}</span>
                          </Link>
                        ))}
                     </div>
                  </div>

                  {/* International National Teams */}
                  <div className="space-y-4 border-l border-border/50 pl-4">
                     <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest border-b border-border/50 pb-2 mb-2">
                        <Globe className="w-3 h-3" /> International
                     </div>
                     <div className="space-y-1">
                        {ALL_LEAGUES.filter(l => l.type === 'International').map(comp => (
                          <Link key={comp.id} href={`/competitions/${comp.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-all group/item">
                             <div className="relative w-6 h-6 flex-shrink-0 bg-muted/20 rounded-lg p-1 group-hover/item:scale-110 transition-transform flex items-center justify-center">
                               {comp.logo ? (
                                 <Image src={comp.logo} alt={comp.name} fill sizes="32px" className="object-contain" />
                               ) : (
                                 <Trophy className="w-4 h-4 text-muted-foreground" />
                               )}
                             </div>
                             <span className="text-[11px] font-black group-hover/item:text-primary transition-colors uppercase leading-tight">{comp.name}</span>
                          </Link>
                        ))}
                     </div>
                  </div>

                  {/* Club International */}
                  <div className="space-y-4 border-l border-border/50 pl-4">
                     <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest border-b border-border/50 pb-2 mb-2">
                        <Star className="w-3 h-3" /> Club Int&apos;l
                     </div>
                     <div className="space-y-1">
                        {ALL_LEAGUES.filter(l => l.type === 'Club-Int').map(comp => (
                          <Link key={comp.id} href={`/competitions/${comp.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-all group/item">
                             <div className="relative w-6 h-6 flex-shrink-0 bg-muted/20 rounded-lg p-1 group-hover/item:scale-110 transition-transform flex items-center justify-center">
                               {comp.logo ? (
                                 <Image src={comp.logo} alt={comp.name} fill sizes="32px" className="object-contain" />
                               ) : (
                                 <Trophy className="w-4 h-4 text-muted-foreground" />
                               )}
                             </div>
                             <span className="text-[11px] font-black group-hover/item:text-primary transition-colors uppercase leading-tight">{comp.name}</span>
                          </Link>
                        ))}
                     </div>
                  </div>

                  {/* Famous Players Section - Enhanced with Faces */}
                  <div className="space-y-4 border-l border-border/50 pl-4">
                     <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest border-b border-border/50 pb-2 mb-2">
                        <Users className="w-3 h-3" /> Famous Players
                     </div>
                     <div className="space-y-1">
                        {FAMOUS_PLAYERS.slice(0, 7).map(player => (
                          <Link key={player.id} href={`/players/${encodeURIComponent(player.name)}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-all group/item">
                             <div className="relative w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden border-2 border-border/50 group-hover/item:border-primary/50 transition-all shadow-sm">
                               <Image src={player.image} alt={player.name} fill sizes="40px" className="object-cover" />
                             </div>
                             <div className="flex flex-col min-w-0 flex-1">
                               <span className="text-[11px] font-black group-hover/item:text-primary transition-colors uppercase tracking-tight leading-tight">{player.name}</span>
                               <span className="text-[8px] text-muted-foreground font-bold uppercase">{player.team}</span>
                             </div>
                          </Link>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="mt-8 pt-4 border-t border-border/50">
                  <Link href="/competitions" className="flex items-center justify-center gap-2 text-[10px] text-primary font-black uppercase tracking-widest hover:underline bg-primary/5 py-4 rounded-2xl">
                    View All Global Competitions & Legends
                  </Link>
               </div>
            </div>
          </div>

          {/* Teams Dropdown */}
          <div className="group relative h-full flex items-center cursor-pointer">
            <div className="hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap">
              <Shield className="h-3.5 w-3.5" /> Teams <ChevronDown className="h-3 w-3" />
            </div>
            <div className="absolute top-full right-0 hidden group-hover:block w-[500px] bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200 z-[100] mt-[-1px]">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 border-b border-border/50 pb-2">Top Clubs</h4>
                    <div className="grid grid-cols-1 gap-y-1">
                       {ALL_TEAMS.filter(t => t.country !== "World").slice(0, 8).map(team => (
                         <Link key={team.id} href={`/teams/${team.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-all group/item">
                            <div className="relative w-8 h-8 flex-shrink-0 bg-muted/20 rounded-lg p-1 group-hover/item:scale-110 transition-transform">
                              <Image src={team.logo} alt={team.name} fill sizes="32px" className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold truncate group-hover/item:text-primary transition-colors">{team.name}</span>
                              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">{team.country}</span>
                            </div>
                         </Link>
                       ))}
                    </div>
                  </div>
                  <div className="flex-1 border-l border-border/50 pl-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 border-b border-border/50 pb-2">National Teams</h4>
                    <div className="grid grid-cols-1 gap-y-1">
                       {ALL_TEAMS.filter(t => t.country === "World").slice(0, 8).map(team => (
                         <Link key={team.id} href={`/teams/${team.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-all group/item">
                            <div className="relative w-8 h-8 flex-shrink-0 bg-muted/20 rounded-lg p-1 group-hover/item:scale-110 transition-transform">
                              <Image src={team.logo} alt={team.name} fill sizes="32px" className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold truncate group-hover/item:text-primary transition-colors">{team.name}</span>
                              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">National Team</span>
                            </div>
                         </Link>
                       ))}
                    </div>
                  </div>
                </div>
                <Link href="/teams" className="block mt-4 text-center text-[10px] font-black text-primary uppercase tracking-widest hover:underline pt-2 border-t border-border/30">View All Teams & Nations</Link>
            </div>
          </div>
          <div className="hidden xl:flex items-center">
            <SearchDropdown />
            <ThemeToggle />
          </div>
        </nav>

        {/* Fallback for medium screens */}
        <nav className="hidden md:flex xl:hidden items-center gap-3 font-medium text-[10px] h-full uppercase tracking-tighter">
           <Link href="/matches" className="hover:text-primary transition-colors">Matches</Link>
           <Link href="/results" className="hover:text-primary transition-colors">Results</Link>
           <Link href="/tables" className="hover:text-primary transition-colors">Tables</Link>
           <Link href="/transfers" className="hover:text-primary transition-colors">Transfers</Link>
           <Link href="/competitions" className="hover:text-primary transition-colors text-primary font-bold">Comps</Link>
        </nav>

        {/* Mobile top right icons: Search, Theme, Hamburger */}
        <div className="flex xl:hidden items-center gap-1">
          <SearchDropdown />
          <ThemeToggle />
          <button 
            className="p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-border bg-background/95 backdrop-blur absolute top-16 left-0 right-0 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg font-bold">
              <Home className="h-5 w-5" /> Home
            </Link>
            <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg font-bold">
              <Newspaper className="h-5 w-5" /> News
            </Link>
            <Link href="/competitions" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg font-bold text-primary">
              <Trophy className="h-5 w-5" /> Competitions
            </Link>
            <Link href="/teams" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg font-bold">
              <Shield className="h-5 w-5" /> Teams
            </Link>
            <Link href="/matches" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg font-bold">
              <Calendar className="h-5 w-5" /> Matches
            </Link>
            <Link href="/results" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg font-bold">
              <CheckCircle2 className="h-5 w-5" /> Results
            </Link>
            <Link href="/tables" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg font-bold">
              <ListOrdered className="h-5 w-5" /> Tables
            </Link>
            <Link href="/transfers" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg font-bold">
              <ArrowRightLeft className="h-5 w-5" /> Transfers
            </Link>
          </div>
        </div>
      )}
    </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur h-16 flex items-center justify-around px-1 pb-safe">
        <Link href="/" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary flex-1 h-full transition-colors">
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </Link>
        <Link href="/matches" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary flex-1 h-full transition-colors">
          <Calendar className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Matches</span>
        </Link>
        <Link href="/results" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary flex-1 h-full transition-colors">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Results</span>
        </Link>
        <Link href="/tables" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary flex-1 h-full transition-colors">
          <ListOrdered className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Tables</span>
        </Link>
        <Link href="/transfers" className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary flex-1 h-full transition-colors">
          <ArrowRightLeft className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Transfers</span>
        </Link>
      </nav>
    </>
  );
}
