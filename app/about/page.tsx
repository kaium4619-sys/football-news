import { Activity, ShieldCheck, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Hero Section */}
        <div className="text-center flex flex-col gap-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter">About GoalStream</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            GoalStream is the world&apos;s leading platform for real-time football intelligence, 
            providing fans with unparalleled access to match data, breaking news, and advanced analytics.
          </p>
        </div>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-card border border-border p-8 rounded-3xl">
             <Zap className="h-10 w-10 text-primary mb-6" />
             <h3 className="text-2xl font-bold uppercase mb-4">Real-Time Data</h3>
             <p className="text-muted-foreground leading-relaxed">
               Our infrastructure is built for speed, delivering live scores and match events with sub-second latency from over 800 global leagues.
             </p>
          </div>
          
          <div className="bg-card border border-border p-8 rounded-3xl">
             <ShieldCheck className="h-10 w-10 text-primary mb-6" />
             <h3 className="text-2xl font-bold uppercase mb-4">Editorial Integrity</h3>
             <p className="text-muted-foreground leading-relaxed">
               We partner with the world&apos;s most reliable sports journalists to bring you breaking news that is verified, accurate, and unbiased.
             </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-3xl">
             <Globe className="h-10 w-10 text-primary mb-6" />
             <h3 className="text-2xl font-bold uppercase mb-4">Global Coverage</h3>
             <p className="text-muted-foreground leading-relaxed">
               From the Premier League to the grassroots, we cover football at every level, ensuring every fan has a home at GoalStream.
             </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-3xl">
             <Activity className="h-10 w-10 text-primary mb-6" />
             <h3 className="text-2xl font-bold uppercase mb-4">Advanced Metrics</h3>
             <p className="text-muted-foreground leading-relaxed">
               We go beyond the scoreline, providing xG, heatmaps, and player performance indices to help you understand the game deeper.
             </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-primary/5 border border-primary/20 p-12 rounded-[40px] text-center mt-8">
           <h2 className="text-3xl font-black uppercase mb-6">Our Mission</h2>
           <p className="text-lg text-foreground/80 leading-relaxed italic">
             &quot;To empower football fans globally by providing the most comprehensive, 
             accurate, and engaging platform for the beautiful game.&quot;
           </p>
        </div>

      </div>
    </div>
  );
}
