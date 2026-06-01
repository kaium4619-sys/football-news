export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { classifyArticle } from "@/lib/classifier";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const authHeader = req.headers.get("x-api-key");
  const expected = process.env.POST_API_SECRET;

  if (authHeader !== expected) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { title, subtitle, slug, meta_description, content, image_url, tags: manualTags, keywords, entities } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "title, slug and content are required" }, { status: 400 });
  }

  // Automatically classify article and merge with manual tags
  const classification = classifyArticle({ title, subtitle, content, keywords, entities, tags: manualTags });

  const finalMeta = meta_description || classification.seoDescription;
  const finalSeoTitle = classification.seoTitle;

  const { data, error } = await supabase
    .from("posts")
    .insert([{ 
      title, 
      subtitle,
      slug, 
      seo_title: finalSeoTitle,
      meta_description: finalMeta, 
      content, 
      image_url, 
      tags: classification.tags, 
      keywords,
      published: true 
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, post: data, classification }, { status: 201 });
}