import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

function cleanContent(html: string): string {
  const cleaned = html
    // 1. Remove the lead image div to prevent duplication with the featured image
    .replace(/<div[^>]*style="[^"]*text-align:center[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    // 2. Remove common wrapper divs that cause "card-inside-card" issues (like the one for 'What You Need to Know')
    .replace(/<div[^>]*style="[^"]*margin:[^"]*0\s+36px[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, '$1')
    .replace(/<div[^>]*style="[^"]*max-width:780px[^"]*"[^>]*>([\s\S]*?)<\/div>$/, '$1')
    // 3. Remove all inline styles
    .replace(/style="[^"]*"/gi, '')
    .replace(/style='[^']*'/gi, '')
    // 4. Remove empty elements
    .replace(/<div[^>]*>\s*<\/div>/gi, '')
    .replace(/<p[^>]*>\s*<\/p>/gi, '')
    // 5. Remove H1 as the page title handles it
    .replace(/^#\s+.+$/gm, "")

    .trim();
  return cleaned;
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to News
      </Link>

      {post.image_url && (
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-border">
          <Image src={post.image_url} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {post.tags?.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {post.tags.map((tag: string) => (
            <span key={tag} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
              <Tag className="w-3 h-3" /> {tag}
            </span>
          ))}
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

      <hr className="border-border mb-8" />

      <div
        className="prose prose-invert prose-base md:prose-lg max-w-none
          [&_h1]:text-foreground [&_h1]:font-black [&_h1]:text-2xl md:[&_h1]:text-4xl [&_h1]:mb-4 md:[&_h1]:mb-6 [&_h1]:tracking-tight
          [&_h2]:text-foreground [&_h2]:font-black [&_h2]:text-xl md:[&_h2]:text-3xl [&_h2]:mt-8 md:[&_h2]:mt-14 [&_h2]:mb-4 md:[&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2 md:[&_h2]:pb-3
          [&_h3]:text-foreground [&_h3]:font-bold [&_h3]:text-lg md:[&_h3]:text-2xl [&_h3]:mt-6 md:[&_h3]:mt-10 [&_h3]:mb-3 md:[&_h3]:mb-4
          [&_p]:text-muted-foreground [&_p]:leading-[1.85] [&_p]:mb-4 md:[&_p]:mb-6 [&_p]:text-left md:[&_p]:text-justify
          [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-medium [&_a]:transition-colors [&_a]:hover:text-primary-foreground
          [&_blockquote]:bg-blue-50/10 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 md:[&_blockquote]:pl-6 [&_blockquote]:pr-4 md:[&_blockquote]:pr-6 [&_blockquote]:py-3 md:[&_blockquote]:py-4 [&_blockquote]:rounded-2xl [&_blockquote]:italic [&_blockquote]:text-foreground/90 [&_blockquote]:my-4 md:[&_blockquote]:my-6 [&_blockquote]:shadow-sm [&_blockquote]:relative
          [&_strong]:text-foreground [&_strong]:font-bold
          [&_ul]:!list-none [&_ul]:!pl-0 [&_ul]:grid [&_ul]:grid-cols-2 [&_ul]:md:grid-cols-3 [&_ul]:gap-3 [&_ul]:mb-6 md:[&_ul]:mb-8
          [&_ul_li]:bg-card [&_ul_li]:border [&_ul_li]:border-border [&_ul_li]:rounded-xl [&_ul_li]:p-4 [&_ul_li]:shadow-sm [&_ul_li]:text-muted-foreground [&_ul_li]:leading-relaxed [&_ul_li]:text-sm [&_ul_li]:flex [&_ul_li]:flex-col [&_ul_li]:gap-2
          [&_ul_li::before]:content-['🔴'] [&_ul_li::before]:block [&_ul_li::before]:text-base
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 md:[&_ol]:space-y-3 [&_ol]:mb-6 md:[&_ol]:mb-8
          [&_li]:text-muted-foreground [&_li]:leading-relaxed
          [&_img]:block [&_img]:mx-auto [&_img]:my-6 md:[&_img]:my-12 [&_img]:rounded-2xl [&_img]:border [&_img]:border-border [&_img]:shadow-xl [&_img]:max-w-full [&_img]:w-auto [&_img]:h-auto
          [&_div]:flex [&_div]:items-start [&_div]:gap-3 md:[&_div]:gap-4 [&_div]:bg-card [&_div]:border [&_div]:border-border [&_div]:rounded-2xl [&_div]:p-4 md:[&_div]:p-5 [&_div]:mb-3 md:[&_div]:mb-4 [&_div]:shadow-md [&_div]:w-full
          [&_div_span]:text-muted-foreground [&_div_span]:leading-relaxed [&_div_span]:flex-1 [&_div_span]:text-sm md:[&_div_span]:text-[15px]
          [&_table]:w-full [&_table]:border-collapse [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:shadow-sm
          [&_thead_tr]:bg-slate-900 [&_thead_tr]:text-white
          [&_th]:p-3 md:[&_th]:p-4 [&_th]:text-left [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider
          [&_td]:p-3 md:[&_td]:p-4 [&_td]:border-b [&_td]:border-border [&_td]:text-sm
          [&_tbody_tr:nth-child(even)]:bg-slate-50/50
          [&_figure]:my-6 md:[&_figure]:my-12 [&_figure]:flex [&_figure]:flex-col [&_figure]:items-center
          [&_figcaption]:text-xs md:[&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:mt-3 md:[&_figcaption]:mt-4 [&_figcaption]:text-center [&_figcaption]:font-medium
          [&_hr]:my-8 md:[&_hr]:my-12 [&_hr]:border-border [&_hr]:opacity-50"
        dangerouslySetInnerHTML={{ __html: cleanContent(post.content) }}
        />
       </div>
  );
}
