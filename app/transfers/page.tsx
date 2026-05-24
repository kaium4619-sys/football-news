import { ArrowRightLeft, Search, TrendingUp, DollarSign, Info } from "lucide-react";
import Image from "next/image";

const MOCK_TRANSFERS = [
  {
    id: 1,
    player: "Kylian Mbappé",
    from: { name: "Paris Saint Germain", logo: "https://media.api-sports.io/football/teams/85.png" },
    to: { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
    value: "€180M",
    type: "Confirmed",
  },
  {
    id: 2,
    player: "Victor Osimhen",
    from: { name: "Napoli", logo: "https://media.api-sports.io/football/teams/492.png" },
    to: { name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" },
    value: "€120M",
    type: "Rumour",
  },
  {
    id: 3,
    player: "Bruno Guimarães",
    from: { name: "Newcastle", logo: "https://media.api-sports.io/football/teams/34.png" },
    to: { name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" },
    value: "€100M",
    type: "Rumour",
  },
  {
    id: 4,
    player: "Florian Wirtz",
    from: { name: "Bayer Leverkusen", logo: "https://media.api-sports.io/football/teams/168.png" },
    to: { name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" },
    value: "€110M",
    type: "Interest",
  }
];

export default function TransfersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 flex items-center gap-3">
              <ArrowRightLeft className="h-10 w-10 text-primary" /> Transfer Center
            </h1>
            <p className="text-muted-foreground text-lg">Latest confirmed deals, trending rumours, and market value updates from the world of football.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search player or club..." className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Main Feed */}
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                 <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase">Latest News</div>
                 <div className="h-px flex-1 bg-border/50"></div>
              </div>

              <div className="bg-card border border-border rounded-3xl p-12 text-center text-muted-foreground font-bold">
                 No recent transfer data available at this time.
              </div>
           </div>

           {/* Sidebar */}
           <aside className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-card border border-border rounded-[32px] p-8">
                 <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-black uppercase tracking-tighter">Most Valuable</h2>
                 </div>
                 <div className="space-y-6">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <span className="text-muted-foreground font-black italic">0{i}</span>
                            <span className="font-bold text-sm">Player Name</span>
                         </div>
                         <span className="text-xs font-black text-primary">€150M</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-[32px] p-8">
                 <DollarSign className="h-8 w-8 text-primary mb-4" />
                 <h3 className="text-xl font-black uppercase mb-2">Market Watch</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Premier League spending has reached record highs this season, totaling over €2.4 Billion.
                 </p>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <Info className="w-3.5 h-3.5" /> Read Analysis
                 </div>
              </div>
           </aside>
        </div>

      </div>
    </div>
  );
}
