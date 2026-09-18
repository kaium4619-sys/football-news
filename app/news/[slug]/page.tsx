import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { formatTag, getTagLink, getPrimaryCategory } from "@/lib/tag-utils";
import { proxyImageUrl } from "@/lib/utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 0; // always fetch fresh data

function cleanContent(html: string): string {
  return html
    .replace(/<div[^>]*style="[^"]*text-align:center[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/style="[^"]*"/gi, '')
    .replace(/style='[^']*'/gi, '')
    .replace(/<div[^>]*>\s*<\/div>/gi, '')
    .replace(/<p[^>]*>\s*<\/p>/gi, '')
    .replace(/^#\s+.+$/gm, "")
    // Convert relative hrefs (not starting with /, http, #, mailto) to absolute paths
    .replace(/href="(?!\/|https?:|mailto:|#)([^"]+)"/gi, 'href="/$1"')
    .trim();
}

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(100); // pre-render top 100 posts

  return posts?.map((post) => ({ slug: post.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const draft = await draftMode();

  let query = supabase
    .from("posts")
    .select("*")
    .eq("slug", slug);

  if (!draft.isEnabled) {
    query = query.eq("published", true);
  }

  const { data: post } = await query.single();

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.meta_description || post.title,
    alternates: {
      canonical: `https://www.footballpulse.online/news/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.meta_description || post.title,
      url: `https://www.footballpulse.online/news/${post.slug}`,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: ["Football Pulse"],
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description || post.title,
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const draft = await draftMode();

  let query = supabase
    .from("posts")
    .select("*")
    .eq("slug", slug);

  if (!draft.isEnabled) {
    query = query.eq("published", true);
  }

  const { data: post } = await query.single();

  if (!post) return notFound();

  let relatedPosts = [];
  if (post.tags && post.tags.length > 0) {
    // Find related posts that share at least one tag
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .neq("id", post.id)
      .contains("tags", [post.tags[0]]) // simple match on first tag
      .order("created_at", { ascending: false })
      .limit(4);

    if (data) {
      relatedPosts = data;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": post.title,
            "image": post.image_url ? [post.image_url] : [],
            "datePublished": post.created_at,
            "dateModified": post.updated_at || post.created_at,
            "author": [{
              "@type": "Organization",
              "name": "Football Pulse",
              "url": "https://www.footballpulse.online"
            }],
            "publisher": {
              "@type": "Organization",
              "name": "Football Pulse",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.footballpulse.online/logo.png"
              }
            }
          })
        }}
      />
      <Link href="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to News
      </Link>

      {draft.isEnabled && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-3 rounded-lg mb-8 flex justify-between items-center">
          <span className="font-medium text-sm">Draft Mode is active. You are viewing unpublished content.</span>
          <a href={`/api/disable-draft?slug=${post.slug}`} className="text-xs bg-amber-500/20 hover:bg-amber-500/30 px-3 py-1.5 rounded-md transition-colors font-bold">
            Disable Draft Mode
          </a>
        </div>
      )}

      <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">{post.title}</h1>

      {post.meta_description && (
        <p className="text-muted-foreground text-lg border-l-4 border-primary pl-4 mb-6">{post.meta_description}</p>
      )}

      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8">
        <Clock className="w-4 h-4" />
        {new Date(post.created_at).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric"
        })}
      </div>

      {post.image_url && (
        <div className="w-full rounded-2xl overflow-hidden mb-8 border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={proxyImageUrl(post.image_url)}
            alt={post.title}
            className="w-full h-auto block"
          />
        </div>
      )}
      <hr className="border-border mb-8" />


      <style>{`
       .blog-content h1 {
          font-size: 1.75rem;
          font-weight: 900;
          color: hsl(var(--foreground));
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        /* Override all inline color styles from content */
        .blog-content [style*="color:#1a1a1a"],
        .blog-content [style*="color: #1a1a1a"] {
          color: hsl(var(--foreground)) !important;
        }

        .blog-content [style*="color:#334155"],
        .blog-content [style*="color:#555"],
        .blog-content [style*="color:#1e293b"] {
          color: hsl(var(--muted-foreground)) !important;
        }

        .blog-content [style*="background:#ffffff"],
        .blog-content [style*="background: #ffffff"] {
          background: hsl(var(--card)) !important;
        }

        .blog-content [style*="border:1px solid #e2e8f0"] {
          border-color: hsl(var(--border)) !important;
        }

        /* Generic div styling — must NOT apply to table-related wrappers */
        .blog-content > div:not(.table-scroll-wrapper),
        .blog-content p + div:not(.table-scroll-wrapper) {
          background: linear-gradient(135deg, hsl(var(--card)) 0%, rgba(0,230,118,0.03) 100%);
          border: 1px solid hsl(var(--border));
          border-radius: 14px;
          padding: 18px 20px;
          margin: 12px 0;
          font-size: 14.5px;
          color: hsl(var(--muted-foreground));
          line-height: 1.7;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        /* ===== TABLE STYLES ===== */
        .blog-content.blog-content table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 2rem 0 !important;
          font-size: 0.875rem !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          border: 1px solid hsl(var(--border)) !important;
          display: table !important;
        }

        .blog-content.blog-content thead {
          display: table-header-group !important;
        }

        .blog-content.blog-content tbody {
          display: table-row-group !important;
        }

        .blog-content.blog-content tr {
          display: table-row !important;
        }

        .blog-content.blog-content thead th {
          display: table-cell !important;
          padding: 12px 16px !important;
          text-align: left !important;
          font-weight: 700 !important;
          font-size: 0.78rem !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
          color: hsl(var(--foreground)) !important;
          background-color: hsl(var(--primary) / 0.18) !important;
          border-bottom: 2px solid hsl(var(--primary) / 0.5) !important;
          border-right: 1px solid hsl(var(--border) / 0.5) !important;
          white-space: nowrap !important;
          vertical-align: middle !important;
        }

        .blog-content.blog-content thead th:last-child {
          border-right: none !important;
        }

        .blog-content.blog-content tbody tr {
          border-bottom: 1px solid hsl(var(--border)) !important;
          transition: background 0.15s ease !important;
        }

        .blog-content.blog-content tbody tr:last-child {
          border-bottom: none !important;
        }

        .blog-content.blog-content tbody tr:nth-child(odd) td {
          background-color: transparent !important;
        }

        .blog-content.blog-content tbody tr:nth-child(even) td {
          background-color: hsl(var(--muted) / 0.3) !important;
        }

        .blog-content.blog-content tbody tr:hover td {
          background-color: hsl(var(--primary) / 0.08) !important;
          color: hsl(var(--foreground)) !important;
        }

        .blog-content.blog-content td {
          display: table-cell !important;
          padding: 10px 16px !important;
          color: hsl(var(--muted-foreground)) !important;
          vertical-align: middle !important;
          line-height: 1.5 !important;
          border-right: 1px solid hsl(var(--border) / 0.4) !important;
          font-size: 0.875rem !important;
          margin: 0 !important;
        }

        .blog-content.blog-content td:last-child {
          border-right: none !important;
        }

        /* ===== LIST STYLES ===== */
        .blog-content ul {
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
          list-style: none !important;
          padding: 0 !important;
          margin-bottom: 2rem !important;
        }
        .blog-content ul li {
          position: relative;
          background: linear-gradient(135deg, hsl(var(--card)) 0%, rgba(0,230,118,0.03) 100%);
          border: 1px solid hsl(var(--border));
          border-left: 3px solid #00e676;
          border-radius: 12px;
          padding: 14px 18px 14px 20px;
          font-size: 14.5px;
          color: hsl(var(--muted-foreground));
          line-height: 1.75;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          cursor: default;
        }
        .blog-content ul li:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 24px rgba(0, 230, 118, 0.12);
          border-color: rgba(0,230,118,0.35);
          color: hsl(var(--foreground));
        }
        .blog-content ul li::before {
          content: '⚽';
          display: inline-block;
          margin-right: 10px;
          font-size: 13px;
          opacity: 0.85;
          vertical-align: middle;
        }
        .blog-content h2 {
          font-size: 1.4rem;
          font-weight: 900;
          color: hsl(var(--foreground));
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(0,230,118,0.25);
          letter-spacing: -0.01em;
        }
        .blog-content h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          color: hsl(var(--muted-foreground));
          line-height: 1.9;
          margin-bottom: 1.25rem;
          font-size: 15px;
        }
        .blog-content a {
          color: #00e676;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-content strong {
          color: hsl(var(--foreground));
          font-weight: 700;
        }
        .blog-content blockquote {
          border-left: 3px solid #00e676;
          background: rgba(0,230,118,0.05);
          padding: 0.75rem 1.25rem;
          color: hsl(var(--muted-foreground));
          font-style: italic;
          margin: 1.5rem 0;
          border-radius: 0 10px 10px 0;
        }

        .blog-content blockquote::before {
          content: '';
        }

        .blog-content blockquote::after {
          content: '';
        }
        .blog-content ol {
          list-style: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-content ol li {
          color: hsl(var(--muted-foreground));
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
      `}</style>
      <div
        className="blog-content prose prose-invert prose-base md:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: cleanContent(post.content) }}
      />
      {post.tags?.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {post.tags.map((tag: string) => {
            const label = formatTag(tag);
            const link = getTagLink(tag);
            const content = (
              <span className="inline-flex items-center gap-1 bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                <Tag className="w-3 h-3" /> {label}
              </span>
            );
            return link ? (
              <Link key={tag} href={link}>{content}</Link>
            ) : (
              <span key={tag}>{content}</span>
            );
          })}
        </div>
      )}
      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Related News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/news/${relatedPost.slug}`} className="flex gap-4 group items-center">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-border flex-shrink-0 bg-muted">
                  {relatedPost.image_url && (
                    <>
                      <Image src={proxyImageUrl(relatedPost.image_url)} alt="" fill className="object-cover blur-xl opacity-50 scale-110" />
                      <Image src={proxyImageUrl(relatedPost.image_url)} alt={relatedPost.title} fill className="object-contain object-center group-hover:scale-105 transition-transform duration-500 z-10" />
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-[10px] font-bold uppercase tracking-widest">
                    {getPrimaryCategory(relatedPost.tags)}
                  </span>
                  <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-3">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>

  );
}
