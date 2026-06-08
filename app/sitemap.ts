import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { ALL_LEAGUES, ALL_TEAMS, FAMOUS_PLAYERS } from "@/lib/api-mock";
import { TEAM_DETAILS } from "@/lib/team-details";
import { slugify } from "@/lib/slugify";

// Re-generate the sitemap at most every 12 hours automatically
export const revalidate = 43200;

const BASE_URL = "https://www.footballpulse.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── 1. Static routes ────────────────────────────────────────────────────────
  type SitemapEntry = MetadataRoute.Sitemap[number];
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: BASE_URL,                           priority: 1.0, changeFrequency: "daily"   },
      { url: `${BASE_URL}/news`,                 priority: 0.9, changeFrequency: "hourly"  },
      { url: `${BASE_URL}/competitions`,         priority: 0.9, changeFrequency: "daily"   },
      { url: `${BASE_URL}/teams`,                priority: 0.8, changeFrequency: "weekly"  },
      { url: `${BASE_URL}/matches`,              priority: 0.8, changeFrequency: "hourly"  },
      { url: `${BASE_URL}/live`,                 priority: 0.8, changeFrequency: "always"  },
      { url: `${BASE_URL}/live-scores`,          priority: 0.8, changeFrequency: "always"  },
      { url: `${BASE_URL}/league-table`,         priority: 0.7, changeFrequency: "daily"   },
      { url: `${BASE_URL}/tables`,               priority: 0.7, changeFrequency: "daily"   },
      { url: `${BASE_URL}/results`,              priority: 0.7, changeFrequency: "daily"   },
      { url: `${BASE_URL}/transfers`,            priority: 0.7, changeFrequency: "daily"   },
      { url: `${BASE_URL}/search`,               priority: 0.5, changeFrequency: "weekly"  },
      { url: `${BASE_URL}/about`,                priority: 0.4, changeFrequency: "monthly" },
      { url: `${BASE_URL}/contact`,              priority: 0.4, changeFrequency: "monthly" },
      { url: `${BASE_URL}/privacy-policy`,       priority: 0.3, changeFrequency: "yearly"  },
      { url: `${BASE_URL}/terms`,                priority: 0.3, changeFrequency: "yearly"  },
    ] as SitemapEntry[]
  ).map((r) => ({ ...r, lastModified: now }));

  // ── 2. News posts from Supabase ──────────────────────────────────────────────
  let postRoutes: MetadataRoute.Sitemap = [];

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { data: posts } = await supabase
        .from("posts")
        .select("slug, created_at, updated_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(5000);

      postRoutes = (posts ?? []).map((post) => ({
        url: `${BASE_URL}/news/${post.slug}`,
        lastModified: new Date(post.updated_at ?? post.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    } catch {
      // Supabase unavailable at build time – skip posts
    }
  }

  // ── 3. Competition pages ─────────────────────────────────────────────────────
  const competitionRoutes: MetadataRoute.Sitemap = ALL_LEAGUES.map((comp) => ({
    url: `${BASE_URL}/competitions/${slugify(comp.name)}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // ── 4. Team pages ────────────────────────────────────────────────────────────
  // Only teams that have a full TEAM_DETAILS entry (so the page won't 404)
  const teamIds = new Set(Object.keys(TEAM_DETAILS).map(Number));
  const teamRoutes: MetadataRoute.Sitemap = ALL_TEAMS.filter((t) =>
    teamIds.has(t.id)
  ).map((team) => ({
    url: `${BASE_URL}/teams/${slugify(team.name)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // ── 5. Player pages ──────────────────────────────────────────────────────────
  // FAMOUS_PLAYERS list
  const famousPlayerRoutes: MetadataRoute.Sitemap = FAMOUS_PLAYERS.map((p) => ({
    url: `${BASE_URL}/players/${slugify(p.name)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  // keyPlayers inside TEAM_DETAILS (de-duplicated by slug)
  const seenSlugs = new Set(FAMOUS_PLAYERS.map((p) => slugify(p.name)));
  const teamPlayerRoutes: MetadataRoute.Sitemap = [];

  for (const teamId in TEAM_DETAILS) {
    for (const kp of TEAM_DETAILS[teamId as any].keyPlayers) {
      const slug = slugify(kp.name);
      if (!seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        teamPlayerRoutes.push({
          url: `${BASE_URL}/players/${slug}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        });
      }
    }
  }

  return [
    ...staticRoutes,
    ...postRoutes,
    ...competitionRoutes,
    ...teamRoutes,
    ...famousPlayerRoutes,
    ...teamPlayerRoutes,
  ];
}
