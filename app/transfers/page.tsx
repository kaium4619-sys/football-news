import { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Football Transfers | Latest Rumors, News & Done Deals",
  description: "Stay up-to-date with the latest football transfer news, rumors, and confirmed deals across Europe's top leagues.",
  alternates: { canonical: "https://www.footballpulse.online/transfers" },
};
import { ArrowRight, TrendingUp, RefreshCcw } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { MOCK_TRANSFERS } from "@/lib/api-mock";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export default async function TransfersPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .contains("tags", ["topic:transfers"])
    .order("created_at", { ascending: false });

  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1) ?? [];

  return (
    <div className="container py-8 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight flex items-center gap-3">
          <RefreshCcw className="w-10 h-10 text-primary" /> Transfer Centre
        </h1>
        <p className="text-lg mt-2 text-muted-foreground">
          Confirmed deals, live negotiations and the latest gossip from across world football
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Featured Post */}
          {featuredPost && (
            <Link href={`/news/${featuredPost.slug}`} className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-border">
              {featuredPost.image_url ? (
                <Image src={featuredPost.image_url} alt={featuredPost.title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-4xl flex flex-col gap-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-black uppercase rounded-lg w-fit">
                  Latest Transfer News
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{featuredPost.title}</h2>
                {featuredPost.meta_description && (
                  <p className="text-white/70 text-lg hidden md:block line-clamp-2">{featuredPost.meta_description}</p>
                )}
              </div>
            </Link>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherPosts.length > 0 ? (
              otherPosts.map(post => (
                <Link key={post.id} href={`/news/${post.slug}`} className="flex flex-col gap-4 group">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border">
                    {post.image_url ? (
                      <Image src={post.image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-primary text-xs font-bold uppercase">Transfers</span>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                    {post.meta_description && (
                      <p className="text-muted-foreground text-sm line-clamp-2">{post.meta_description}</p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full p-8 text-center border border-border rounded-2xl bg-card">
                <p className="text-muted-foreground text-sm font-bold">No other recent transfer news found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Latest Rumours & Deals
            </h3>
            
            <div className="space-y-6">
              {MOCK_TRANSFERS.map((transfer, idx) => (
                <div key={idx} className="flex flex-col gap-3 p-4 rounded-xl bg-muted/20 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{transfer.player.name}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                      transfer.details.status === "confirmed" ? "bg-green-500/20 text-green-500" :
                      transfer.details.status === "talks" ? "bg-yellow-500/20 text-yellow-500" :
                      "bg-blue-500/20 text-blue-500"
                    }`}>
                      {transfer.details.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-background p-3 rounded-lg border border-border">
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <Image src={transfer.teams.from.logo} alt={transfer.teams.from.name} width={24} height={24} className="object-cover object-top" />
                      <span className="text-[10px] text-muted-foreground font-bold uppercase truncate max-w-full">{transfer.teams.from.name}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <Image src={transfer.teams.to.logo} alt={transfer.teams.to.name} width={24} height={24} className="object-cover object-top" />
                      <span className="text-[10px] text-muted-foreground font-bold uppercase truncate max-w-full">{transfer.teams.to.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                    <span className="font-bold">{transfer.details.fee}</span>
                    <span>{transfer.details.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-center mt-4 text-muted-foreground uppercase font-bold tracking-widest">
              Example Data from Database
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
