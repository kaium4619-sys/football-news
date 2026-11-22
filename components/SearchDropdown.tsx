"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ teams: any[]; leagues: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        setIsLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data);
            setIsLoading(false);
            setIsOpen(true);
          })
          .catch(() => setIsLoading(false));
      } else {
        setResults(null);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative hidden lg:block ml-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search teams, leagues..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results) setIsOpen(true); }}
          className="bg-card border border-border rounded-full pl-10 pr-10 py-1.5 text-xs focus:outline-none focus:border-primary transition-colors w-64"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && results && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl p-4 z-50">
          {results.teams.length === 0 && results.leagues.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center">No results found.</p>
          ) : (
            <div className="space-y-4">
              {results.teams.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-2">Teams</h4>
                  <div className="space-y-2">
                    {results.teams.map((team: any) => (
                      <Link
                        key={team.team.id}
                        href={`/teams/${team.team.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 hover:bg-muted rounded-xl transition-colors"
                      >
                        <Image src={team.team.logo} alt={team.team.name} width={24} height={24} className="object-contain" />
                        <span className="text-xs font-bold">{team.team.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.leagues.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-2">Leagues</h4>
                  <div className="space-y-2">
                    {results.leagues.map((league: any) => (
                      <Link
                        key={league.league.id}
                        href={`/competitions/${league.league.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 hover:bg-muted rounded-xl transition-colors"
                      >
                        <Image src={league.league.logo} alt={league.league.name} width={24} height={24} className="object-contain" />
                        <span className="text-xs font-bold">{league.league.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
