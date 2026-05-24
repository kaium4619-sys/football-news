import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  User, MapPin, Trophy, Shield, ChevronLeft, ChevronRight, Calendar, BarChart2, Star,
  TrendingUp, Newspaper
} from "lucide-react";
import { FAMOUS_PLAYERS, ALL_TEAMS } from "@/lib/api-mock";
import { TEAM_DETAILS } from "@/lib/team-details";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  return {
    title: `${decodedName} — Profile & News`,
    description: `Latest news, stats and info for ${decodedName}.`,
  };
}

export default async function PlayerPage({ params }: PageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  // Find player from FAMOUS_PLAYERS
  let playerInfo = FAMOUS_PLAYERS.find(p => p.name.toLowerCase() === decodedName.toLowerCase());

  if (!playerInfo) {
    // Search in TEAM_DETAILS
    for (const teamId in TEAM_DETAILS) {
      const p = TEAM_DETAILS[teamId as any].keyPlayers.find(p => p.name.toLowerCase() === decodedName.toLowerCase());
      if (p) {
        const teamBase = ALL_TEAMS.find(t => t.id === Number(teamId));
        playerInfo = {
          id: Math.random() * 100000,
          name: p.name,
          team: teamBase?.name || "Unknown Team",
          country: p.nationality,
          position: p.position,
          image: p.image,
        };
        break;
      }
    }
  }

  if (!playerInfo) {
    notFound();
  }

  // Generate fake stats based on position
  const pos = playerInfo.position.toLowerCase();
  const isGoalkeeper = pos.includes('gk') || pos.includes('goalkeeper');
  const isDefender = pos.includes('def') || pos.includes('cb') || pos.includes('rb') || pos.includes('lb');

  // Pseudo-random deterministic stats based on name length so they don't jump around on re-render
  const seed = playerInfo.name.length;
  const matchesPlayed = (seed * 3) % 15 + 20;

  const stats = [
    { label: "Matches Played", value: matchesPlayed, icon: Calendar },
    {
      label: isGoalkeeper ? "Clean Sheets" : (isDefender ? "Tackles Won" : "Goals"),
      value: isGoalkeeper ? (seed % 10) + 5 : (isDefender ? (seed * 4 % 30) + 20 : (seed * 2 % 20) + 5),
      icon: Star
    },
    {
      label: isGoalkeeper ? "Saves" : (isDefender ? "Interceptions" : "Assists"),
      value: isGoalkeeper ? (seed * 5 % 50) + 30 : (isDefender ? (seed * 3 % 40) + 15 : (seed % 15) + 3),
      icon: Trophy
    },
    { label: "Pass Accuracy", value: ((seed % 15) + 75).toFixed(1) + "%", icon: BarChart2 }
  ];

  const news = [
    {
      title: `${playerInfo.name} delivers masterclass performance in crucial fixture`,
      tag: "Match Report",
      tagClass: "bg-blue-500/20 text-blue-300"
    },
    {
      title: `Manager praises ${playerInfo.name}'s impact on the team this season`,
      tag: "Interview",
      tagClass: "bg-purple-500/20 text-purple-300"
    },
    {
      title: `Tactical Analysis: How ${playerInfo.name} fits into the new system`,
      tag: "Analysis",
      tagClass: "bg-orange-500/20 text-orange-300"
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] bg-card overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50 z-0" />

        <div className="absolute inset-0 z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <Link
            href="/competitions"
            className="absolute top-6 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group z-50 bg-background/50 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-xs">Back</span>
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 relative z-20">
            {/* Player Avatar */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-background shadow-2xl overflow-hidden bg-muted/20 flex-shrink-0 group">
              <Image
                src={playerInfo.image}
                alt={playerInfo.name}
                fill
                sizes="(max-width: 640px) 192px, 256px"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Player Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary mb-4 border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <Star className="w-4 h-4 fill-primary" />
                <span className="text-xs font-black uppercase tracking-widest">{playerInfo.position}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60 drop-shadow-sm">
                {playerInfo.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm sm:text-base font-bold text-muted-foreground">
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-border/50">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="uppercase tracking-wider">{playerInfo.team}</span>
                </div>
                <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-border/50">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="uppercase tracking-wider">{playerInfo.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Season Stats</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-card border border-border rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:border-primary/50 hover:bg-primary/5 transition-all">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-3xl font-black tracking-tighter mb-1">{stat.value}</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Player News */}
            <section className="pt-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Newspaper className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-black uppercase tracking-tight">Latest News</h2>
                </div>
              </div>
              <div className="space-y-4">
                {news.map((item, idx) => (
                  <Link href="#" key={idx} className="block group bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/50 transition-all hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.tagClass}`}>
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Bio Card */}
            <div className="bg-card border border-border rounded-[32px] overflow-hidden">
              <div className="p-6 sm:p-8 bg-gradient-to-br from-card to-muted border-b border-border/50">
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">About {playerInfo.name.split(' ')[0]}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {playerInfo.name} is a professional {playerInfo.position.toLowerCase()} representing {playerInfo.team} and the {playerInfo.country} national team. Known for exceptional skills on the pitch, {playerInfo.name.split(' ')[0]} continues to be a crucial player in modern football.
                </p>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Position</span>
                  <span className="font-black">{playerInfo.position}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Club</span>
                  <span className="font-black">{playerInfo.team}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Nationality</span>
                  <span className="font-black">{playerInfo.country}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Status</span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">Active</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
