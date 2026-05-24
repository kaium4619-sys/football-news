import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Shield, MapPin, Calendar, Users, Trophy, Newspaper,
  Globe, TrendingUp, ChevronRight, Star, BarChart2, Home
} from "lucide-react";
import { ALL_TEAMS } from "@/lib/api-mock";
import { TEAM_DETAILS, getTeamDetail } from "@/lib/team-details";

interface PageProps {
  params: Promise<{ id: string }>;
}

// generateStaticParams removed in dev for performance — pages build on demand

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  const base = ALL_TEAMS.find((t) => t.id === numId);
  if (!base) return { title: "Team Not Found" };
  return {
    title: `${base.name} — GoalStream`,
    description: `Latest news, squad, stats and info for ${base.name}.`,
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  const base = ALL_TEAMS.find((t) => t.id === numId);
  if (!base) notFound();

  const team = getTeamDetail(numId, base);

  const tagColors: Record<string, string> = {
    "Premier League": "bg-purple-500/20 text-purple-300",
    "La Liga": "bg-orange-500/20 text-orange-300",
    "Bundesliga": "bg-red-500/20 text-red-300",
    "Serie A": "bg-blue-500/20 text-blue-300",
    "Ligue 1": "bg-cyan-500/20 text-cyan-300",
    "Champions League": "bg-yellow-500/20 text-yellow-300",
    "World Cup": "bg-green-500/20 text-green-300",
    "Transfer": "bg-emerald-500/20 text-emerald-300",
    "Club News": "bg-slate-500/20 text-slate-300",
    "Awards": "bg-amber-500/20 text-amber-300",
    "International": "bg-indigo-500/20 text-indigo-300",
    "Analysis": "bg-pink-500/20 text-pink-300",
    "MLS": "bg-red-500/20 text-red-300",
    "Saudi Pro League": "bg-green-600/20 text-green-400",
    "Argentine Football": "bg-sky-500/20 text-sky-300",
    "Copa Libertadores": "bg-yellow-600/20 text-yellow-400",
    "Superclásico": "bg-rose-500/20 text-rose-300",
    "Primeira Liga": "bg-red-600/20 text-red-400",
    "Europa League": "bg-orange-600/20 text-orange-400",
    "Match Report": "bg-violet-500/20 text-violet-300",
    "Stats": "bg-teal-500/20 text-teal-300",
    "Records": "bg-amber-600/20 text-amber-400",
    "Injury": "bg-red-700/20 text-red-400",
    "CONMEBOL": "bg-blue-600/20 text-blue-400",
    "Profile": "bg-fuchsia-500/20 text-fuchsia-300",
  };

  const getConfederation = (name: string) => {
    if (["Argentina", "Brazil", "Uruguay", "Colombia", "Ecuador", "Paraguay"].includes(name)) return "CONMEBOL";
    if (["France", "England", "Germany", "Spain", "Portugal", "Italy", "Netherlands", "Belgium", "Croatia", "Denmark", "Sweden", "Turkey", "Norway", "Austria", "Scotland", "Switzerland"].includes(name)) return "UEFA";
    if (["Morocco", "Nigeria", "Egypt", "Senegal", "Algeria", "Ivory Coast", "Ghana", "Cape Verde"].includes(name)) return "CAF";
    if (["Japan", "South Korea", "Saudi Arabia", "Iran", "Uzbekistan", "Jordan"].includes(name)) return "AFC";
    if (["USA", "Mexico", "Canada", "Panama", "Haiti", "Cura\u00e7ao"].includes(name)) return "CONCACAF";
    if (["Australia", "New Zealand"].includes(name)) return "OFC";
    return "FIFA";
  };

  const infoRows: { label: string; value: string }[] = team.isNational
    ? [
        { label: "Full Name", value: team.name + " National Team" },
        { label: "Founded", value: String(team.founded) },
        { label: "Confederation", value: getConfederation(team.name) },
        { label: "Head Coach", value: team.manager },
        { label: "Home Ground", value: team.stadium },
        { label: "Base City", value: team.stadiumCity },
        ...(team.stadiumCapacity > 0 ? [{ label: "Stadium Cap.", value: team.stadiumCapacity.toLocaleString() }] : []),
      ]
    : [
        { label: "Full Name", value: team.name },
        { label: "Founded", value: String(team.founded) },
        { label: "Country", value: team.country },
        { label: "Stadium", value: team.stadium },
        { label: "City", value: team.stadiumCity },
        ...(team.stadiumCapacity > 0 ? [{ label: "Capacity", value: team.stadiumCapacity.toLocaleString() }] : []),
        { label: "Manager", value: team.manager },
        ...(team.league ? [{ label: "League", value: team.league }] : []),
      ];

  return (
    <div className="min-h-screen">
      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${team.primaryColor}22 0%, var(--background) 60%)`,
          borderBottom: `1px solid ${team.primaryColor}33`,
        }}
      >
        {/* subtle background crest watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none opacity-[0.04]">
          <Image src={team.logo} alt="" fill sizes="50vw" className="object-contain" />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/teams" className="hover:text-primary transition-colors">Teams</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">{team.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* logo */}
            <div
              className="relative w-36 h-36 md:w-48 md:h-48 flex-shrink-0 rounded-3xl p-4 shadow-2xl border border-border/30"
              style={{ background: `${team.primaryColor}18` }}
            >
              <Image src={team.logo} alt={team.name} fill sizes="192px" priority className="object-contain p-3" />
            </div>

            {/* headline info */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {team.isNational ? (
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <Globe className="w-3 h-3" /> National Team
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <Shield className="w-3 h-3" /> {team.league ?? "Club"}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-muted/30 text-muted-foreground text-[11px] font-black uppercase tracking-widest">
                  {team.isNational ? team.name : team.country}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                {team.name}
              </h1>

              <div className="flex flex-wrap gap-5 justify-center md:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  Founded {team.founded}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  {team.isNational ? "Home: " : ""}{team.stadium}, {team.stadiumCity}
                  {team.stadiumCapacity > 0 && (
                    <span className="text-muted-foreground/60 text-xs ml-1">
                      ({team.stadiumCapacity.toLocaleString()} seats)
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  {team.isNational ? "Head Coach" : "Manager"}: <strong className="text-foreground ml-1">{team.manager}</strong>
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm md:text-base">
                {team.description}
              </p>

              {team.website && (
                <a
                  href={team.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-center md:self-start px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105"
                  style={{ background: team.primaryColor, color: team.secondaryColor }}
                >
                  Official Website ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN BODY ────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT — News + Key Players */}
          <div className="lg:col-span-8 flex flex-col gap-10">

            {/* Quick Stats Bar */}
            {team.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {team.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-card p-5 flex flex-col items-center text-center gap-1 hover:border-primary/40 transition-colors"
                  >
                    <BarChart2 className="w-4 h-4 text-primary mb-1" />
                    <span className="text-2xl font-black text-foreground">{s.value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recent News */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Newspaper className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-black uppercase tracking-tight">Latest News</h2>
              </div>
              <div className="flex flex-col gap-4">
                {team.recentNews.map((news, i) => {
                  const tagClass = tagColors[news.tag] ?? "bg-muted/30 text-muted-foreground";
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-muted/5 transition-all cursor-pointer group"
                    >
                      <div
                        className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center mt-0.5"
                        style={{ background: `${team.primaryColor}22` }}
                      >
                        <TrendingUp className="w-4 h-4" style={{ color: team.primaryColor }} />
                      </div>
                      <div className="flex flex-col gap-2 min-w-0">
                        <h3 className="font-bold text-base group-hover:text-primary transition-colors leading-snug">
                          {news.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${tagClass}`}>
                            {news.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Key Players */}
            {team.keyPlayers.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-black uppercase tracking-tight">Key Players</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {team.keyPlayers.map((player) => (
                    <Link
                      href={`/players/${encodeURIComponent(player.name)}`}
                      key={player.name}
                      className="rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/40 hover:-translate-y-1 transition-all block"
                    >
                      <div className="relative w-full aspect-square bg-muted/20">
                        <Image
                          src={player.image}
                          alt={player.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="font-black text-base leading-tight">{player.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{player.nationality}</span>
                            <span
                              className="text-[10px] font-black px-2 py-0.5 rounded uppercase"
                              style={{ background: team.primaryColor, color: team.secondaryColor }}
                            >
                              {player.position}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT — Trophies + Info sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">

            {/* Trophy Cabinet */}
            {team.trophies.length > 0 && (
              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3 className="font-black text-lg uppercase tracking-tight">Trophy Cabinet</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {team.trophies.map((t) => (
                    <div key={t.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                      <span className="text-sm font-semibold text-muted-foreground">{t.name}</span>
                      <span
                        className="text-sm font-black px-3 py-1 rounded-full"
                        style={{ background: `${team.primaryColor}25`, color: team.primaryColor }}
                      >
                        ×{t.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Club/National Team Info Card */}
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-5">
                {team.isNational ? (
                  <Globe className="w-5 h-5 text-primary" />
                ) : (
                  <Shield className="w-5 h-5 text-primary" />
                )}
                <h3 className="font-black text-lg uppercase tracking-tight">
                  {team.isNational ? "National Team Info" : "Club Info"}
                </h3>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                {infoRows.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 py-2 border-b border-border/20 last:border-0">
                    <span className="text-muted-foreground font-semibold text-xs uppercase tracking-widest whitespace-nowrap">{row.label}</span>
                    <span className="font-bold text-right leading-snug">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Teams */}
            <Link
              href="/teams"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all font-bold text-sm"
            >
              <ChevronRight className="w-4 h-4 rotate-180 text-primary" />
              Back to all Teams
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
