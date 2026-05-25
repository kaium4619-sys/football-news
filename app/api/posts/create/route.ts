export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const authHeader = req.headers.get("x-api-key");
  const expected = process.env.POST_API_SECRET;

  // Debug log
  console.log("Received key:", authHeader);
  console.log("Expected key:", expected);

  if (authHeader !== expected) {
    return NextResponse.json(
      { error: "Unauthorized", received: authHeader, expected: expected },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { title, slug, meta_description, content, image_url, tags } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "title, slug and content are required" }, { status: 400 });
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