import React from "react";
import { fetchFootballData } from "@/lib/football-data";
import { ArrowLeft, Calendar, MapPin, Trophy, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = await fetchFootballData(`matches/${id}`);

  if (!match) return { title: "Match Details" };

  return {
    title: `${match.homeTeam.name} vs ${match.awayTeam.name} — Match Details`,
    description: `Match details, score, and statistics for ${match.homeTeam.name} vs ${match.awayTeam.name}.`,
    alternates: {
      canonical: `https://www.footballpulse.online/matches/${id}`,
    },
    openGraph: {
      title: `${match.homeTeam.name} vs ${match.awayTeam.name} — Match Details`,
      description: `Match details, score, and statistics for ${match.homeTeam.name} vs ${match.awayTeam.name}.`,
      url: `https://www.footballpulse.online/matches/${id}`,
      type: "website",
    },
  };
}

export default async function MatchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = await fetchFootballData(`matches/${id}`);

  if (!match) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">Match Not Found</h1>
        <Link href="/matches" className="text-primary hover:underline">Return to Matches</Link>
      </div>
    );
  }

  const date = new Date(match.utcDate);
  const formattedDate = date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  let status = match.status;
  if (status === "IN_PLAY") status = match.minute ? `${match.minute}'` : "LIVE";
  if (status === "PAUSED") status = "HT";
  if (status === "FINISHED") status = "FT";
  if (status === "TIMED" || status === "SCHEDULED") status = formattedTime;

  return (
    <div className="min-h-screen bg-background pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            "name": `${match.homeTeam.name} vs ${match.awayTeam.name}`,
            "startDate": match.utcDate,
            "sport": "Soccer",
            "homeTeam": {
              "@type": "SportsTeam",
              "name": match.homeTeam.name
            },
            "awayTeam": {
              "@type": "SportsTeam",
              "name": match.awayTeam.name
            },
            "location": match.venue ? {
              "@type": "Place",
              "name": match.venue
            } : undefined
          })
        }}
      />
      {/* Header */}
      <div className="relative pt-20 pb-12 overflow-hidden border-b border-white/10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, var(--card) 100%)" }}>
        <div className="container relative z-10">
          <Link href="/matches" className="inline-flex items-center text-muted-foreground text-sm font-bold mb-8 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Matches
          </Link>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <Trophy className="w-4 h-4 text-gold" />
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{match.competition.name}</span>
            </div>

            <div className="flex items-center justify-center gap-8 md:gap-16 w-full max-w-3xl">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-3xl p-4 flex items-center justify-center border border-white/10 shadow-2xl">
                  {match.homeTeam.crest ? (
                    <Image src={match.homeTeam.crest} alt={match.homeTeam.name} width={128} height={128} className="w-full h-full object-contain drop-shadow-xl" />
                  ) : (
                    <Shield className="w-12 h-12 text-muted-foreground opacity-50" />
                  )}
                </div>
                <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none">{match.homeTeam.shortName || match.homeTeam.name}</h2>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-5xl md:text-7xl font-black tabular-nums tracking-tighter flex items-center gap-4">
                  <span>{match.score?.fullTime?.home ?? match.score?.halfTime?.home ?? "-"}</span>
                  <span className="text-muted-foreground/30">-</span>
                  <span>{match.score?.fullTime?.away ?? match.score?.halfTime?.away ?? "-"}</span>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-black tracking-widest uppercase border border-primary/20">
                  {status}
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-3xl p-4 flex items-center justify-center border border-white/10 shadow-2xl">
                  {match.awayTeam.crest ? (
                    <Image src={match.awayTeam.crest} alt={match.awayTeam.name} width={128} height={128} className="w-full h-full object-contain drop-shadow-xl" />
                  ) : (
                    <Shield className="w-12 h-12 text-muted-foreground opacity-50" />
                  )}
                </div>
                <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none">{match.awayTeam.shortName || match.awayTeam.name}</h2>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-bold text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {formattedDate}</span>
              {match.venue && <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {match.venue}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/10 text-center space-y-4">
              <Trophy className="w-12 h-12 text-primary/40 mx-auto" />
              <h3 className="text-xl font-black uppercase tracking-tight">Match Details & Stats</h3>
              <p className="text-muted-foreground">Comprehensive match statistics and commentary will be available shortly after kickoff.</p>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground border-b border-white/10 pb-4">Match Info</h3>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Competition</span>
                  <span className="font-bold">{match.competition.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Matchday</span>
                  <span className="font-bold">{match.matchday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Referee</span>
                  <span className="font-bold">{match.referees?.[0]?.name || "TBA"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
