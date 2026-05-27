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
  const { title, slug, meta_description, content, image_url, tags: manualTags } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "title, slug and content are required" }, { status: 400 });
  }

  // Automatically classify article and merge with manual tags
  const autoTags = classifyArticle(title, content);
  const combinedTags = Array.from(new Set([...(manualTags || []), ...autoTags]));

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, slug, meta_description, content, image_url, tags: combinedTags, published: true }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, post: data }, { status: 201 });
}