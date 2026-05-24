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
  return html
    .replace(/<img[^>]*>/gi, '')
    .replace(/style="[^"]*"/gi, '')
    .replace(/style='[^']*'/gi, '')
    .replace(/<div[^>]*>\s*<\/div>/gi, '')
    .replace(/<p[^>]*>\s*<\/p>/gi, '')
    .replace(/Photo by.*?Unsplash<\/a>/gis, '')
    .replace(/via <a[^>]*>Unsplash<\/a>/gis, '');
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
        className="prose prose-invert prose-lg max-w-none
          [&_*]:!color-inherit
          [&_h1]:text-foreground [&_h1]:font-black
          [&_h2]:text-foreground [&_h2]:font-black
          [&_h3]:text-foreground [&_h3]:font-bold
          [&_p]:text-muted-foreground [&_p]:leading-relaxed
          [&_a]:text-primary [&_a]:no-underline
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground
          [&_strong]:text-foreground"
        dangerouslySetInnerHTML={{ __html: cleanContent(post.content) }}
      />
    </div>
  );
}