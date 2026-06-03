import { Metadata } from "next";
import React from "react";
import { fetchFootballData } from "@/lib/football-data";
import { MatchCard } from "@/components/matches/MatchCard";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Live Football Scores & Real-Time Updates | Football Pulse",
  description: "Get real-time live scores, match updates, and in-game statistics for ongoing football matches around the globe.",
  alternates: { canonical: "https://www.footballpulse.online/live" },
};

export const revalidate = 30;

function mapStatus(m: any): string {
  if (m.status === "IN_PLAY" && m.minute) return `${m.minute}'`;
  if (m.status === "PAUSED") return "HT";
  if (m.status === "FINISHED") return "FT";
  if (m.status === "TIMED" || m.status === "SCHEDULED") {
    return new Date(m.utcDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return m.status;
}

const groups = (list: any[]) =>
  list.reduce((acc: Record<string, any[]>, m) => {
    const key = m.competition?.name || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

function Section({ title, items, emptyMsg }: { title: string; items: any[]; emptyMsg: string }) {
  const grouped = groups(items);
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="section-header mb-0">
          <h2 className="text-lg font-black uppercase tracking-tight">{title}</h2>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-black">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm py-8 text-center" style={{ color: "var(--muted-foreground)" }}>{emptyMsg}</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([comp, compMatches]: [string, any]) => (
            <div key={comp}>
              <p className="text-xs font-black uppercase tracking-widest mb-3 pb-2"
                style={{ color: "var(--muted-foreground)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {comp}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {compMatches.map((m: any) => {
                  const hs = m.score?.fullTime?.home ?? m.score?.halfTime?.home;
                  const as_ = m.score?.fullTime?.away ?? m.score?.halfTime?.away;
                  return (
                    <MatchCard
                      key={m.id}
                      match={{
                        fixture: { id: m.id, status: { long: m.status, short: mapStatus(m), elapsed: m.minute || 0 } },
                        league: { name: m.competition?.name || "Football", logo: m.competition?.emblem || null },
                        teams: { 
                          home: { id: m.homeTeam?.id, name: m.homeTeam?.shortName || m.homeTeam?.name, logo: m.homeTeam?.crest, winner: m.score?.winner === "HOME_TEAM" }, 
                          away: { id: m.awayTeam?.id, name: m.awayTeam?.shortName || m.awayTeam?.name, logo: m.awayTeam?.crest, winner: m.score?.winner === "AWAY_TEAM" } 
                        },
                        goals: { home: hs, away: as_ }
                      } as any}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function LivePage() {
  let matches: any[] = [];
  try {
    const data = await fetchFootballData("matches");
    matches = data?.matches ?? [];
  } catch { /* noop */ }

  const live = matches.filter((m: any) => m.status === "IN_PLAY" || m.status === "PAUSED");
  const upcoming = matches.filter((m: any) => m.status === "SCHEDULED" || m.status === "TIMED");
  const finished = matches.filter((m: any) => m.status === "FINISHED");

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(204, 255, 0, 0.15)", border: "1px solid rgba(204, 255, 0, 0.3)" }}
        >
          <Zap className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Live Scores</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {live.length > 0 ? `${live.length} matches in progress` : "No live matches right now"}
            {" · "}Updates every 30 seconds
          </p>
        </div>
      </div>

      {/* Sections */}
      <Section title="Live Now" items={live} emptyMsg="No matches currently in progress. Check the upcoming section." />
      <Section title="Upcoming Today" items={upcoming} emptyMsg="No upcoming matches scheduled for today." />
      <Section title="Finished Today" items={finished} emptyMsg="No finished matches today." />
    </div>
  );
}
