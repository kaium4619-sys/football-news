"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MatchCard } from "@/components/matches/MatchCard";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["Live", "Today", "Upcoming", "Finished"] as const;
type Tab = typeof TABS[number];

function buildDateStrip() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i - 2);
    return d;
  });
}

export default function MatchesPage() {
  const [tab, setTab] = useState<Tab>("Today");
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateIndex, setDateIndex] = useState(2); // today = index 2
  const dates = React.useMemo(() => buildDateStrip(), []);

  const fetchMatches = useCallback(async (isPolling = false) => {
    if (!isPolling) setLoading(true);
    try {
      const selected = dates[dateIndex];
      const dateStr = selected.toISOString().split("T")[0];
      const res = await fetch(`/api/matches?date=${dateStr}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setMatches(data.matches ?? []);
      }
    } catch {
      setMatches([]);
    } finally {
      if (!isPolling) setLoading(false);
    }
  }, [dateIndex, dates]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchMatches(false);
    const interval = setInterval(() => fetchMatches(true), 30_000);
    return () => clearInterval(interval);
  }, [fetchMatches]);

  // Filter based on tab
  const filtered = matches.filter((m) => {
    switch (tab) {
      case "Live": return m.status === "IN_PLAY" || m.status === "PAUSED";
      case "Finished": return m.status === "FINISHED";
      case "Upcoming": return m.status === "SCHEDULED" || m.status === "TIMED";
      default: return true;
    }
  });

  // Group by competition
  const grouped = filtered.reduce((acc: Record<string, any[]>, m) => {
    const key = m.competition?.name || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  function mapStatus(m: any) {
    if (m.status === "IN_PLAY" && m.minute) return `${m.minute}'`;
    if (m.status === "PAUSED") return "HT";
    if (m.status === "FINISHED") return "FT";
    if (m.status === "TIMED" || m.status === "SCHEDULED") {
      return new Date(m.utcDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return m.status;
  }

  const liveCount = matches.filter((m) => m.status === "IN_PLAY" || m.status === "PAUSED").length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight">Matches</h1>
      </div>

      {/* Date strip */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDateIndex((i) => Math.max(0, i - 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar flex-1">
          {dates.map((d, i) => {
            const isToday = i === 2;
            const isActive = i === dateIndex;
            return (
              <button
                key={i}
                onClick={() => setDateIndex(i)}
                className={cn(
                  "flex flex-col items-center px-3 py-2 rounded-xl flex-shrink-0 transition-all text-xs font-bold",
                  isActive
                    ? "text-background"
                    : "hover:bg-white/5"
                )}
                style={{
                  background: isActive ? "var(--primary)" : "var(--card)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: isActive ? "var(--background)" : isToday ? "var(--primary)" : "var(--muted-foreground)",
                  minWidth: 56,
                }}
              >
                <span style={{ fontSize: 9 }}>{d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}</span>
                <span style={{ fontSize: 16, fontWeight: 900 }}>{d.getDate()}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setDateIndex((i) => Math.min(dates.length - 1, i + 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => fetchMatches(false)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 ml-1"
          style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
          title="Refresh"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)" }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn("flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200")}
            style={{
              background: tab === t ? "var(--primary)" : "transparent",
              color: tab === t ? "var(--background)" : "var(--muted-foreground)",
            }}
          >
            {t}
            {t === "Live" && liveCount > 0 && (
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full font-black"
                style={{ background: "var(--live)", color: "white" }}
              >
                {liveCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${tab}-${dateIndex}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-40 rounded-2xl" />
              ))}
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">⚽</p>
              <p className="font-bold text-lg">No matches for this filter</p>
              <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>Try a different tab or date</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([comp, compMatches]) => (
                <div key={comp}>
                  <div
                    className="flex items-center gap-3 mb-3 pb-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <h3 className="text-sm font-black uppercase tracking-wide">{comp}</h3>
                    <span className="badge badge-primary">{compMatches.length}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
