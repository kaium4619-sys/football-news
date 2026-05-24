import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
    <article className="max-w-3xl mx-auto px-4 py-10">
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full rounded-xl mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-400 mb-6">{post.meta_description}</p>
      {post.tags && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-yellow-400 text-black text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}