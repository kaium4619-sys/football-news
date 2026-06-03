import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { formatTag, getTagLink, getPrimaryCategory } from "@/lib/tag-utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

function cleanContent(html: string): string {
  return html
    .replace(/<div[^>]*style="[^"]*text-align:center[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/style="[^"]*"/gi, '')
    .replace(/style='[^']*'/gi, '')
    .replace(/<div[^>]*>\s*<\/div>/gi, '')
    .replace(/<p[^>]*>\s*<\/p>/gi, '')
    .replace(/^#\s+.+$/gm, "")
    .trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

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

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

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
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-border">

          <Image src={post.image_url} alt={post.title} fill className="object-cover" />
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
        .blog-content div {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));        
          border-radius: 12px;
          padding: 16px 18px 16px 0px;
          margin: 10px 0;
          margin-top: 2px;
          font-size: 14px;
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
          margin-bottom: 0 !important;
        }
        .blog-content ul {
          display: grid !important;
          grid-template-columns: repeat(1, 1fr);
          gap: 12px;
          list-style: none !important;
          padding: 0 !important;
          margin-bottom: 2rem !important;
        }
        @media (min-width: 640px) {
          .blog-content ul {
            grid-template-columns: repeat(2, 1fr);  
          }
        }
        @media (min-width: 768px) {
          .blog-content ul { grid-template-columns: repeat(3, 1fr);
          }
        }
        .blog-content ul li {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
        }
        .blog-content ul li::before {
          content: '🔴';
          display: block;
          margin-bottom: 8px;
        }
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 900;
          color: hsl(var(--foreground));
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid hsl(var(--border));
        }
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          color: hsl(var(--muted-foreground));
          line-height: 1.85;
          margin-bottom: 1.25rem;
        }
        .blog-content a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }
        .blog-content strong {
          color: hsl(var(--foreground));
          font-weight: 700;
        }
        .blog-content strong {
          color: hsl(var(--foreground));
          font-weight: 700;
        }
        .blog-content blockquote {
          border-left: 3px solid hsl(var(--border));
          padding: 0.4rem 1rem;
          color: hsl(var(--muted-foreground));
          font-style: italic;
          margin: 0.75rem 0;
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
        className="blog-content prose prose-invert prose-base md:prose-lg max-w-none
          [&_h2]:text-foreground [&_h2]:font-black [&_h2]:text-xl md:[&_h2]:text-3xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2
          [&_h3]:text-foreground [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-3
          [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
          [&_a]:text-primary [&_a]:underline
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_blockquote]:my-4
          [&_strong]:text-foreground [&_strong]:font-bold"
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
                  {relatedPost.image_url && <Image src={relatedPost.image_url} alt={relatedPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />}
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
