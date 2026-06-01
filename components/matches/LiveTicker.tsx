"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

export interface TickerMatch {
  id: string | number;
  homeTeam: { name: string; shortName?: string; crest?: string };
  awayTeam: { name: string; shortName?: string; crest?: string };
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  league?: string;
  isLive?: boolean;
}

interface LiveTickerProps {
  matches: TickerMatch[];
}

const FALLBACK: TickerMatch[] = [
  { id: "f1", homeTeam: { name: "Clube do Remo" }, awayTeam: { name: "São Paulo" }, homeScore: null, awayScore: null, status: "05:30 AM", league: "BSA", isLive: false },
  { id: "f2", homeTeam: { name: "Cruzeiro" }, awayTeam: { name: "Fluminense" }, homeScore: null, awayScore: null, status: "05:30 AM", league: "BSA", isLive: false },
  { id: "f3", homeTeam: { name: "Bragantino" }, awayTeam: { name: "Internacional" }, homeScore: null, awayScore: null, status: "08:00 PM", league: "BSA", isLive: false },
];

export default function LiveTicker({ matches }: LiveTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = matches.length > 0 ? matches : FALLBACK;

  const router = useRouter();

  // Auto-refresh the page data every 15 minutes (900,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Remove old clones
    Array.from(track.children).forEach(child => {
      if (child.hasAttribute("data-clone")) child.remove();
    });

    // 1. Measure the width of the original set
    const originalChildren = Array.from(track.children) as HTMLElement[];
    let originalWidth = 0;
    originalChildren.forEach(c => {
      originalWidth += c.offsetWidth;
    });

    // 2. Clone enough times to safely fill large screens (at least 2 sets total)
    const screenWidth = window.innerWidth;
    const neededSets = Math.max(2, Math.ceil((screenWidth * 2) / (originalWidth || 1)));

    for (let i = 1; i < neededSets; i++) {
      originalChildren.forEach(child => {
        const clone = child.cloneNode(true) as HTMLElement;
        clone.setAttribute("data-clone", "true");
        track.appendChild(clone);
      });
    }

    // 3. Set precise animation parameters
    const PIXELS_PER_SECOND = 60; 
    setTimeout(() => {
      // Re-measure exact width after rendering if needed, but originalWidth is usually fine.
      // We animate exactly the width of ONE set to create a flawless reset
      const duration = originalWidth / PIXELS_PER_SECOND;
      track.style.setProperty("--ticker-translate", `-${originalWidth}px`);
      track.style.setProperty("--ticker-duration", `${duration}s`);
    }, 50);
  }, [items]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --ticker-bg: #0b1120;
          --text-white: #ffffff;
          --text-muted: #8493a8;
          --border-color: rgba(255, 255, 255, 0.05);
          --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .ticker-container-exact {
          position: relative;
          width: 100%;
          height: 48px;
          background-color: var(--ticker-bg);
          overflow: hidden;
          font-family: var(--font-stack);
          display: flex;
          align-items: center;
        }

        .live-badge-exact {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 0 20px;
          background-color: #00e65b;
          z-index: 10;
          box-shadow: 4px 0 15px rgba(0,0,0,0.5);
        }

        .live-text-exact {
          color: #060b14;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .live-icon-exact {
          color: #060b14;
        }

        /* Viewport takes full width so text slides all the way under the badge */
        .ticker-viewport-exact {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }

        /* Right fade mask only */
        .ticker-viewport-exact::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 60px;
          background: linear-gradient(to left, var(--ticker-bg), transparent);
          pointer-events: none;
          z-index: 2;
        }

        .ticker-track-exact {
          display: flex;
          align-items: center;
          height: 100%;
          width: max-content;
          will-change: transform;
          animation: ticker-scroll-exact var(--ticker-duration, 30s) linear infinite;
        }

        .ticker-track-exact:hover {
          animation-play-state: paused;
        }

        @keyframes ticker-scroll-exact {
          0% { transform: translateX(0); }
          100% { transform: translateX(var(--ticker-translate, -50%)); }
        }

        .match-item-exact {
          display: flex;
          align-items: center;
          gap: 16px;
          height: 100%;
          padding: 0 28px;
          border-right: 1px solid var(--border-color);
          flex-shrink: 0;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .match-item-exact:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .league-name-exact {
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .team-exact {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .team-logo-exact {
          width: 16px;
          height: 16px;
          background: #1e293b;
          border-radius: 50%;
          object-fit: contain;
        }

        .team-name-exact {
          color: var(--text-white);
          font-size: 13px;
          font-weight: 800;
        }

        .score-block-exact {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 900;
          font-size: 13px;
          color: var(--text-muted);
          letter-spacing: 2px;
        }

        .status-time-exact {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .status-live-exact {
          font-size: 11px;
          font-weight: 900;
          color: #00e65b;
        }
      `}} />

      <div className="ticker-container-exact">
        <div className="live-badge-exact">
          <Zap size={14} className="live-icon-exact" strokeWidth={3} />
          <span className="live-text-exact">LIVE</span>
        </div>

        <div className="ticker-viewport-exact">
          <div className="ticker-track-exact" ref={trackRef}>
            
            {items.map((m, i) => (
              <Link key={`match-${m.id}-${i}`} href={`/matches/${m.id}`} className="match-item-exact">
                {m.league && <span className="league-name-exact">{m.league.slice(0, 3)}</span>}
                
                {/* Home Team (Logo left, Name right) */}
                <div className="team-exact">
                  {m.homeTeam.crest ? (
                    <img src={m.homeTeam.crest} className="team-logo-exact" alt="" />
                  ) : (
                    <div className="team-logo-exact"></div>
                  )}
                  <span className="team-name-exact">{m.homeTeam.shortName || m.homeTeam.name}</span>
                </div>
                
                <div className="score-block-exact">
                  {m.homeScore != null && m.awayScore != null ? (
                    <span style={{ color: "white" }}>{m.homeScore} - {m.awayScore}</span>
                  ) : (
                    <>- - -</>
                  )}
                </div>
                
                {/* Away Team (Name left, Logo right) */}
                <div className="team-exact">
                  <span className="team-name-exact">{m.awayTeam.shortName || m.awayTeam.name}</span>
                  {m.awayTeam.crest ? (
                    <img src={m.awayTeam.crest} className="team-logo-exact" alt="" />
                  ) : (
                    <div className="team-logo-exact"></div>
                  )}
                </div>
                
                <span className={m.isLive ? "status-live-exact" : "status-time-exact"}>
                  {m.status}
                </span>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
