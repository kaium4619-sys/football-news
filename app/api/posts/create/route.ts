export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const API_SECRET = process.env.POST_API_SECRET!;

export async function POST(req: NextRequest) {
  // Auth check
  const authHeader = req.headers.get("x-api-key");
  if (authHeader !== API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, slug, meta_description, content, image_url, tags } = body;

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "title, slug and content are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, slug, meta_description, content, image_url, tags, published: true }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, post: data }, { status: 201 });
}