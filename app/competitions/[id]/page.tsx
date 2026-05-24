import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Trophy, ChevronRight, Home, MapPin, BarChart2, Activity } from "lucide-react";
import { ALL_LEAGUES } from "@/lib/api-mock";
import { fetchLiveMatches, fetchRecentFixtures } from "@/lib/football-api";
import { StandingsWidget } from "@/components/matches/StandingsWidget";

export const revalidate = 60; // Cache for 60 seconds

export default async function CompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  const league = ALL_LEAGUES.find((l) => l.id === numId);

  if (!league) notFound();

  // Fetch real data
  const [liveData, recentData] = await Promise.all([
    fetchLiveMatches(numId).catch(() => []),
    fetchRecentFixtures(numId).catch(() => [])
  ]);

  const liveMatches = Array.isArray(liveData) ? liveData : [];
  const results = Array.isArray(recentData) ? recentData : [];

  return (
    <div className="min-h-screen">
      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none opacity-[0.04]">
          {league.logo && <Image src={league.logo} alt="" fill sizes="50vw" className="object-contain" />}
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/competitions" className="hover:text-primary transition-colors">Competitions</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{league.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-36 h-36 md:w-48 md:h-48 flex-shrink-0 rounded-3xl p-4 shadow-2xl border border-border/30 bg-card">
              {league.logo ? (
                <Image src={league.logo} alt={league.name} fill sizes="192px" priority className="object-contain p-3" />
              ) : (
                <Trophy className="w-full h-full text-muted-foreground p-4" />
              )}
            </div>

            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Trophy className="w-3 h-3" /> {league.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-muted/30 text-muted-foreground text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> {league.country}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                {league.name}
              </h1>

              <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm md:text-base">
                Welcome to the official hub for the {league.name}. Explore the latest news, live scores, recent results, and current standings for the {league.country} {league.type.toLowerCase()}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN BODY ────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT — Matches */}
          <div className="lg:col-span-8 flex flex-col gap-10">

            {/* Live/Recent Matches */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-black uppercase tracking-tight">Recent & Live Matches</h2>
              </div>
              <div className="flex flex-col gap-4">
                {(liveMatches.length > 0 || results.length > 0) ? (
                  <>
                    {liveMatches.map((match: any) => (
                      <div key={match.fixture.id} className="p-4 rounded-2xl border border-primary/50 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-bl-xl">LIVE {match.fixture.status.elapsed}&apos;</div>
                        <div className="flex items-center justify-center gap-6 w-full sm:w-auto mt-4 sm:mt-0 flex-1">
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <Image src={match.teams.home.logo} alt={match.teams.home.name} width={40} height={40} className="object-contain" />
                            <span className="text-xs font-bold text-center">{match.teams.home.name}</span>
                          </div>
                          <div className="flex flex-col items-center px-4">
                            <span className="text-3xl font-black text-primary">{match.goals.home} - {match.goals.away}</span>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <Image src={match.teams.away.logo} alt={match.teams.away.name} width={40} height={40} className="object-contain" />
                            <span className="text-xs font-bold text-center">{match.teams.away.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {results.map((match: any) => (
                      <div key={match.fixture.id} className="p-4 rounded-2xl border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center justify-center gap-6 w-full sm:w-auto flex-1">
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <Image src={match.teams.home.logo} alt={match.teams.home.name} width={40} height={40} className="object-contain" />
                            <span className="text-xs font-bold text-center">{match.teams.home.name}</span>
                          </div>
                          <div className="flex flex-col items-center px-4">
                            <span className="text-2xl font-black">{match.goals.home} - {match.goals.away}</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase">{match.fixture.status.short}</span>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <Image src={match.teams.away.logo} alt={match.teams.away.name} width={40} height={40} className="object-contain" />
                            <span className="text-xs font-bold text-center">{match.teams.away.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="p-8 text-center border border-border rounded-2xl bg-card">
                    <p className="text-muted-foreground text-sm font-bold">No recent matches found for this competition.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT — Table */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <StandingsWidget leagueId={numId} />

            <Link
              href="/competitions"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all font-bold text-sm mt-4"
            >
              <ChevronRight className="w-4 h-4 rotate-180 text-primary" />
              Back to all Competitions
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
