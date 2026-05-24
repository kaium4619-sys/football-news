import Image from "next/image";
import Link from "next/link";
import { Clock, TrendingUp } from "lucide-react";

const NEWS_CATEGORIES = ["All", "Transfers", "Premier League", "Champions League", "La Liga", "Serie A", "International"];

export default function NewsPage() {
  const featuredNews = {
    id: 1,
    title: "Mbappe breaks silence on potential summer move to Real Madrid",
    tag: "Transfers",
    author: "Fabrizio Romano",
    img: "https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=1200&auto=format&fit=crop",
    excerpt: "The French superstar has finally addressed the rumors surrounding his future, hintings at a 'new challenge' starting this July. Madrid fans are already celebrating."
  };

  const otherNews = [
    { id: 2, title: "Guardiola: We must be perfect to retain the Premier League title", tag: "Premier League", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "VAR under fire again after controversial penalty decision in London derby", tag: "Opinion", img: "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=600&auto=format&fit=crop" },
    { id: 4, title: "Top 10 young prospects to watch in the upcoming Euro Championship", tag: "Scouting", img: "https://images.unsplash.com/photo-1551280857-2b9bbe520442?q=80&w=600&auto=format&fit=crop" },
    { id: 5, title: "Klopp praises Liverpool resilience after dramatic comeback win", tag: "Liverpool", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop" },
    { id: 6, title: "Barcelona eye summer move for Bayern midfielder Joshua Kimmich", tag: "La Liga", img: "https://images.unsplash.com/photo-1551952237-954a0e68786c?q=80&w=600&auto=format&fit=crop" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        
        {/* News Header & Categories */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black tracking-tight uppercase">Football News</h1>
            <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4" /> Trending Now
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {NEWS_CATEGORIES.map((cat, i) => (
              <button 
                key={cat} 
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Story */}
        <Link href={`/news/${featuredNews.id}`} className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-border">
          <Image 
            src={featuredNews.img} 
            alt={featuredNews.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-4xl flex flex-col gap-4">
             <div className="flex items-center gap-3">
               <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-black uppercase rounded-lg">{featuredNews.tag}</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{featuredNews.title}</h2>
             <p className="text-white/70 text-lg hidden md:block line-clamp-2">{featuredNews.excerpt}</p>
          </div>
        </Link>

        {/* Main Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherNews.map(news => (
                <Link key={news.id} href={`/news/${news.id}`} className="flex flex-col gap-4 group">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border">
                    <Image src={news.img} alt={news.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-primary text-xs font-bold uppercase">{news.tag}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{news.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
            
            <button className="w-full py-4 border border-border rounded-2xl font-bold text-muted-foreground hover:bg-muted/10 transition-colors mt-4">
              Load More Stories
            </button>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="rounded-2xl border border-border bg-card p-6">
               <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
                 <span className="w-1.5 h-4 bg-primary rounded-full"></span> Top Transfers
               </h3>
               <div className="space-y-6">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex gap-4 items-center">
                     <div className="w-12 h-12 rounded-xl bg-muted/30 flex-shrink-0"></div>
                     <div className="flex flex-col">
                       <span className="font-bold text-sm leading-tight hover:text-primary cursor-pointer">Victor Osimhen to PSG? Negotiations continue</span>
                       <span className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">Transfer Update</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="rounded-2xl bg-primary/10 p-6 border border-primary/20">
               <h3 className="font-bold text-sm text-primary uppercase mb-2">Newsletter</h3>
               <p className="text-xs text-muted-foreground mb-4">Get the latest football news delivered to your inbox daily.</p>
               <div className="flex gap-2">
                 <input type="email" placeholder="Email" className="bg-background border border-border rounded-lg px-3 py-2 text-xs flex-1" />
                 <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold">Join</button>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
