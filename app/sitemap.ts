import { MetadataRoute } from 'next';
import { createClient } from "@supabase/supabase-js";
import { fetchFootballDataCompetitions } from "@/lib/football-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.footballpulse.online';
  
  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/news',
    '/transfers',
    '/competitions',
    '/teams',
    '/matches',
    '/live',
    '/live-scores',
    '/league-table',
    '/tables',
    '/results',
    '/search'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  let postRoutes: MetadataRoute.Sitemap = [];
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: posts } = await supabase
      .from("posts")
      .select("slug, created_at, updated_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(1000); // Limiting to 1000 for standard sitemap size

    postRoutes = (posts || []).map((post) => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  // Competitions
  const competitions = await fetchFootballDataCompetitions();
  const compRoutes = (competitions || []).map((comp: any) => ({
    url: `${baseUrl}/competitions/${comp.code || comp.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...compRoutes];
}
