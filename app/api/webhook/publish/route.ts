import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		// parse body if present (safe fallback)
		let body: any = null;
		try {
			body = await req.json();
		} catch (_) {
			// ignore parse errors for empty/non-JSON bodies
		}

		// placeholder: process webhook payload here
		// e.g., verify signature, trigger revalidation, etc.

		return NextResponse.json({ success: true, received: !!body });
	} catch (err) {
		return new NextResponse("Webhook handler error", { status: 500 });
	}
}

export async function GET() {
	return NextResponse.json({ ok: true });
}
