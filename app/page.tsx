import { LiveScoreWidget } from "@/components/matches/LiveScoreWidget";
import { StandingsWidget } from "@/components/matches/StandingsWidget";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content Area: Breaking News & Top Stories */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        
        {/* Featured Hero Story */}
        <section className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[21/9] group block cursor-pointer border border-border">
          <Image 
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop" 
            alt="Breaking News" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider w-max">
              <Flame className="w-3.5 h-3.5" /> Breaking
            </span>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground leading-tight max-w-3xl">
              Champions League Draw: Real Madrid to face Manchester City in Quarter-Finals
            </h1>
            <p className="text-muted-foreground line-clamp-2 md:text-lg max-w-2xl">
              The draw for the UEFA Champions League quarter-finals has been made, setting up a mouth-watering clash between the holders and the 14-time winners.
            </p>
          </div>
        </section>

        {/* Top Stories Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">Top Stories</h2>
            <Link href="/news" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              All News <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { id: 1, title: "Mbappe breaks silence on potential summer move to Real Madrid", tag: "Transfers", img: "https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=600&auto=format&fit=crop" },
               { id: 2, title: "Guardiola: We must be perfect to retain the Premier League title", tag: "Premier League", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop" },
               { id: 3, title: "VAR under fire again after controversial penalty decision in London derby", tag: "Opinion", img: "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=600&auto=format&fit=crop" },
               { id: 4, title: "Top 10 young prospects to watch in the upcoming Euro Championship", tag: "Scouting", img: "https://images.unsplash.com/photo-1551280857-2b9bbe520442?q=80&w=600&auto=format&fit=crop" }
             ].map(news => (
                <Link key={news.id} href={`/news/${news.id}`} className="group flex flex-col gap-3">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border">
                     <Image src={news.img} alt={news.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="text-primary text-xs font-bold uppercase mb-1 block">{news.tag}</span>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">{news.title}</h3>
                  </div>
                </Link>
             ))}
          </div>
        </section>
      </div>

      {/* Sidebar: Live Scores & Standings */}
      <aside className="lg:col-span-4 flex flex-col gap-8">
        <div className="sticky top-24 flex flex-col gap-8">
          <LiveScoreWidget />
          <StandingsWidget />
        </div>
      </aside>
    </div>
  );
}
