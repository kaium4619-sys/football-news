import { Metadata } from "next";
import { StandingsWidget } from "@/components/matches/StandingsWidget";
import LiveTicker, { type TickerMatch } from "@/components/matches/LiveTicker";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Football Pulse | Live Scores, News, Transfers & Stats",
  description: "Get the latest football news, live scores, transfer rumors, league tables, and match statistics from the Premier League, La Liga, Champions League, and more.",
  alternates: { canonical: "https://www.footballpulse.online/" },
};
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { fetchFootballData } from "@/lib/football-data";
import { getPrimaryCategory } from "@/lib/tag-utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function toTickerMatch(m: any): TickerMatch {
  const isLive = m.status === "IN_PLAY" || m.status === "PAUSED";
  let status = m.status;
  if (m.status === "IN_PLAY" && m.minute) status = `LIVE ${m.minute}'`;
  else if (m.status === "PAUSED") status = "HT";
  else if (m.status === "FINISHED") status = "FT";
  else {
    try { status = new Date(m.utcDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); } catch { }
  }
  return {
    id: m.id,
    homeTeam: { name: m.homeTeam?.name ?? "", shortName: m.homeTeam?.shortName, crest: m.homeTeam?.crest },
    awayTeam: { name: m.awayTeam?.name ?? "", shortName: m.awayTeam?.shortName, crest: m.awayTeam?.crest },
    homeScore: m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? null,
    awayScore: m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? null,
    status,
    league: m.competition?.name,
    isLive,
  };
}

export const revalidate = 900; // 15 minutes

export default async function Home() {
  const today = new Date().toISOString().split("T")[0];
  const queryDate = today.startsWith("2026") ? today.replace("2026", "2024") : today;

  const [{ data: posts }, matchData] = await Promise.all([
    supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    fetchFootballData(`matches?dateFrom=${queryDate}&dateTo=${queryDate}`).catch(() => null),
  ]);

  const tickerMatches: TickerMatch[] = (matchData?.matches ?? []).slice(0, 14).map(toTickerMatch);
  const recentMatches: TickerMatch[] = (matchData?.matches ?? [])
    .filter((m: any) => m.status === "FINISHED")
    .slice(0, 5)
    .map(toTickerMatch);

  const allPosts = posts ?? [];
  const transferPosts = allPosts.filter(p => (p.tags || []).includes("topic:transfers"));

  const featuredPost = allPosts[0];
  const topStories = allPosts.slice(1, 5);

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Live Ticker — seamless JS-cloned marquee */}
      <LiveTicker matches={tickerMatches} />

      <div className="container mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area: Breaking News & Top Stories */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          {/* Featured Hero Story */}
          {featuredPost && (
            <section className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[21/9] group block cursor-pointer border border-border">
              <Link href={`/news/${featuredPost.slug}`} className="absolute inset-0 z-10">
                <div className="relative w-full h-full">
                  {featuredPost.image_url ? (
                    <Image
                      src={featuredPost.image_url}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                      priority
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider w-max">
                      <Flame className="w-3.5 h-3.5" /> Breaking
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground leading-tight max-w-3xl">
                      {featuredPost.title}
                    </h1>
                    <p className="text-muted-foreground line-clamp-2 md:text-lg max-w-2xl">
                      {featuredPost.meta_description || "Read more about the latest football news and updates."}
                    </p>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Top Stories Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">Top Stories</h2>
              <Link href="/news" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                All News <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topStories.length > 0 ? (
                topStories.map(post => (
                  <Link key={post.id} href={`/news/${post.slug}`} className="group flex flex-col gap-3">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border">
                      {post.image_url ? (
                        <Image src={post.image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <div>
                      <span className="text-primary text-xs font-bold uppercase mb-1 block">
                        {post.tags?.length > 0 ? getPrimaryCategory(post.tags) : "News"}
                      </span>
                      <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground">No top stories available at the moment.</p>
              )}
            </div>
          </section>

          {/* Latest Transfers Mini-Widget */}
          {transferPosts.length > 0 && (
            <section className="mt-8 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-primary rounded-full"></span> Latest Transfers
                </h2>
                <Link href="/transfers" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                  Transfer Centre <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {transferPosts.slice(0, 3).map(post => (
                  <Link key={post.id} href={`/news/${post.slug}`} className="group flex flex-col gap-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                      {post.image_url ? (
                        <Image src={post.image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Transfer</div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Standings */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="sticky top-24 flex flex-col gap-8">
            <StandingsWidget />
          </div>
        </aside>
      </div>
    </div>
  );
}
