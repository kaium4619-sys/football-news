"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, User, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ teams: any[], leagues: any[] }>({ teams: [], leagues: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length < 3) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Search Football</h1>
        <p className="text-muted-foreground">Find your favorite teams and leagues from across the globe.</p>

        <form onSubmit={handleSearch} className="relative mt-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a team or league..."
            className="w-full px-6 py-4 rounded-2xl bg-card border border-border focus:border-primary transition-all outline-none pr-16"
          />
          <button
            type="submit"
            disabled={isLoading || query.length < 3}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Teams Results */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-tight">Teams</h2>
          </div>
          <div className="flex flex-col gap-3">
            {results.teams.length > 0 ? (
              results.teams.map((team: any) => (
                <Link
                  key={team.team.id}
                  href={`/teams/${slugify(team.team.name)}`}
                  className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 bg-muted rounded-full overflow-hidden border border-border">
                      <Image src={team.team.logo} alt={team.team.name} fill className="object-cover object-top p-1" />
                    </div>
                    <span className="font-bold group-hover:text-primary transition-colors">{team.team.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))
            ) : (
              <div className="p-8 text-center border border-dashed border-border rounded-3xl text-muted-foreground italic text-sm">
                {isLoading ? "Searching for teams..." : "No teams found."}
              </div>
            )}
          </div>
        </section>

        {/* Leagues Results */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-tight">Leagues</h2>
          </div>
          <div className="flex flex-col gap-3">
            {results.leagues.length > 0 ? (
              results.leagues.map((league: any) => (
                <Link
                  key={league.league.id}
                  href={`/competitions/${slugify(league.league.name)}`}
                  className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 bg-muted rounded-full overflow-hidden border border-border">
                      <Image src={league.league.logo} alt={league.league.name} fill className="object-cover object-top p-1" />
                    </div>
                    <span className="font-bold group-hover:text-primary transition-colors">{league.league.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))
            ) : (
              <div className="p-8 text-center border border-dashed border-border rounded-3xl text-muted-foreground italic text-sm">
                {isLoading ? "Searching for leagues..." : "No leagues found."}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
