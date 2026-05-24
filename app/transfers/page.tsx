import { LiveScoreWidget } from "@/components/matches/LiveScoreWidget";
import { StandingsWidget } from "@/components/matches/StandingsWidget";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(5);

  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1, 5) ?? [];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content Area */}
      <div className="lg:col-span-8 flex flex-col gap-8">

        {/* Featured Hero Story */}
        {featuredPost ? (
          <Link href={`/blog/${featuredPost.slug}`}>
            <section className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[21/9] group block cursor-pointer border border-border">
              {featuredPost.image_url ? (
                <Image
                  src={featuredPost.image_url}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col gap-3">
                {featuredPost.tags?.[0] && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider w-max">
                    <Flame className="w-3.5 h-3.5" /> {featuredPost.tags[0]}
                  </span>
                )}
                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground leading-tight max-w-3xl">
                  {featuredPost.title}
                </h1>
                {featuredPost.meta_description && (
                  <p className="text-muted-foreground line-clamp-2 md:text-lg max-w-2xl">
                    {featuredPost.meta_description}
                  </p>
                )}
              </div>
            </section>
          </Link>
        ) : (
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
            </div>
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
            {otherPosts.length > 0 ? otherPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col gap-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border">
                  {post.image_url ? (
                    <Image src={post.image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
                <div>
                  {post.tags?.[0] && (
                    <span className="text-primary text-xs font-bold uppercase mb-1 block">{post.tags[0]}</span>
                  )}
                  <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                </div>
              </Link>
            )) : (
              <p className="text-muted-foreground col-span-2">No stories yet.</p>
            )}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <aside className="lg:col-span-4 flex flex-col gap-8">
        <div className="sticky top-24 flex flex-col gap-8">
          <LiveScoreWidget />
          <StandingsWidget />
        </div>
      </aside>
    </div>
  );
}