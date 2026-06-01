export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const STORAGE_KEY = "newsletter_subscribers";
const LOCAL_FALLBACK_PATH = join(process.cwd(), "newsletter-subscribers.json");

function validateEmail(value: unknown) {
  const email = String(value || "").trim().toLowerCase();
  return email && /^\S+@\S+\.\S+$/.test(email) ? email : null;
}

async function saveToLocalFile(email: string) {
  let entries: Array<{ email: string; createdAt: string }> = [];

  try {
    const raw = await readFile(LOCAL_FALLBACK_PATH, "utf-8");
    entries = JSON.parse(raw) as Array<{ email: string; createdAt: string }>;
  } catch (err) {
    // File may not exist yet; that's fine.
  }

  const exists = entries.some((entry) => entry.email === email);
  if (!exists) {
    entries.push({ email, createdAt: new Date().toISOString() });
    await writeFile(LOCAL_FALLBACK_PATH, JSON.stringify(entries, null, 2), "utf-8");
  }

  return { success: true, alreadyExists: exists };
}

async function saveToSupabase(email: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  const isAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !supabaseServiceKey);

  if (!supabaseUrl || !supabaseServiceKey) {
    return {
      ok: false,
      error: "Supabase service role key is not configured.",
      permissionDenied: false,
      isAnonKey,
    };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await supabase
    .from(STORAGE_KEY)
    .insert([{ email }])
    .select()
    .single();

  if (error) {
    const message = typeof error === "string" ? error : error?.message ?? String(error);
    const permissionDenied = /row-level security|permission denied|not authenticated|unauthorized|anonymous/i.test(message);
    return { ok: false, error: message, permissionDenied, isAnonKey };
  }

  return { ok: true, alreadyExists: false, data, permissionDenied: false, isAnonKey };
}

export async function POST(request: Request) {
  let payload: any;
  try {
    payload = await request.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const email = validateEmail(payload.email);
  if (!email) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (supabaseUrl && supabaseServiceKey) {
    const supabaseResult = await saveToSupabase(email);
    if (supabaseResult.ok) {
      return NextResponse.json({ success: true, message: "Email added successfully." }, { status: 201 });
    }

    if (supabaseResult.permissionDenied) {
      const localResult = await saveToLocalFile(email);
      return NextResponse.json(
        {
          success: true,
          message: localResult.alreadyExists
            ? "Email already subscribed."
            : "Email saved locally because Supabase write was denied.",
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ error: supabaseResult.error }, { status: 500 });
  }

  if (hasAnonKey) {
    const localResult = await saveToLocalFile(email);
    return NextResponse.json(
      {
        success: true,
        message: localResult.alreadyExists
          ? "Email already subscribed."
          : "Email saved locally because SUPABASE_SERVICE_ROLE_KEY is missing.",
      },
      { status: 201 }
    );
  }

  const localResult = await saveToLocalFile(email);
  return NextResponse.json(
    {
      success: true,
      message: localResult.alreadyExists ? "Email already subscribed." : "Email saved locally.",
    },
    { status: 201 }
  );
}
