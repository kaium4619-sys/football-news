import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const NEWS_CATEGORIES = ["All", "Transfers", "Premier League", "Champions League", "La Liga", "Serie A", "International"];

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1) ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">

        {/* Header */}
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

        {/* Featured Post */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-border">
            {featuredPost.image_url ? (
              <Image src={featuredPost.image_url} alt={featuredPost.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-4xl flex flex-col gap-4">
              {featuredPost.tags?.[0] && (
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-black uppercase rounded-lg w-fit">
                  {featuredPost.tags[0]}
                </span>
              )}
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{featuredPost.title}</h2>
              {featuredPost.meta_description && (
                <p className="text-white/70 text-lg hidden md:block line-clamp-2">{featuredPost.meta_description}</p>
              )}
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col gap-8">
            {otherPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="flex flex-col gap-4 group">
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border">
                      {post.image_url ? (
                        <Image src={post.image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {post.tags?.[0] && (
                        <span className="text-primary text-xs font-bold uppercase">{post.tags[0]}</span>
                      )}
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                      {post.meta_description && (
                        <p className="text-muted-foreground text-sm line-clamp-2">{post.meta_description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No posts yet.</p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-primary rounded-full"></span> Latest Posts
              </h3>
              <div className="space-y-6">
                {posts?.slice(0, 3).map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-4 items-center group">
                    <div className="w-12 h-12 rounded-xl bg-muted/30 flex-shrink-0 overflow-hidden relative">
                      {post.image_url && <Image src={post.image_url} alt={post.title} fill className="object-cover" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{post.title}</span>
                      {post.tags?.[0] && <span className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">{post.tags[0]}</span>}
                    </div>
                  </Link>
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