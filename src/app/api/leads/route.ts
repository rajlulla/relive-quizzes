import { NextResponse } from "next/server";
import { isValidPhone } from "@/lib/phone";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IncomingPayload {
  phone?: unknown;
  quizSlug?: unknown;
  timestamp?: unknown;
  result?: unknown;
  yesCount?: unknown;
  recommendations?: unknown;
  extras?: unknown;
  answers?: unknown;
}

/**
 * POST /api/leads
 *
 * Validates the phone number, then forwards a lead row to whatever sink
 * is configured at deploy time. Today the only supported sink is a
 * Google Apps Script web-app URL exposed via `LEADS_WEBHOOK_URL`. A
 * shared secret (`LEADS_WEBHOOK_SECRET`) is included in the body so the
 * Apps Script can reject random callers — Apps Script `doPost` doesn't
 * surface request headers to user code, so the secret travels in JSON.
 *
 * Returns `{ ok: true }` even when the sink fails — the result-reveal
 * UX must not depend on third-party uptime. Failures are logged
 * server-side so they show up in Vercel runtime logs.
 */
export async function POST(req: Request) {
  let body: IncomingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const phone = typeof body.phone === "string" ? body.phone : "";
  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "invalid_phone" },
      { status: 400 },
    );
  }

  const sinkUrl = process.env.LEADS_WEBHOOK_URL;
  const sinkSecret = process.env.LEADS_WEBHOOK_SECRET ?? "";

  if (!sinkUrl) {
    console.warn(
      "[/api/leads] LEADS_WEBHOOK_URL is not configured; lead dropped.",
      { quizSlug: body.quizSlug, phone },
    );
    return NextResponse.json({ ok: true, sink: "none" });
  }

  const sinkPayload = {
    secret: sinkSecret,
    timestamp:
      typeof body.timestamp === "string"
        ? body.timestamp
        : new Date().toISOString(),
    quizSlug: typeof body.quizSlug === "string" ? body.quizSlug : "",
    phone,
    result: typeof body.result === "string" ? body.result : "",
    yesCount: typeof body.yesCount === "number" ? body.yesCount : "",
    recommendations: Array.isArray(body.recommendations)
      ? body.recommendations
      : [],
    extras: Array.isArray(body.extras) ? body.extras : [],
    answers:
      body.answers && typeof body.answers === "object" ? body.answers : {},
  };

  try {
    const res = await fetch(sinkUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sinkPayload),
      // Apps Script web apps respond with a 302 to googleusercontent.com
      // before delivering the final body — fetch follows redirects by
      // default in Node, but be explicit.
      redirect: "follow",
    });
    if (!res.ok) {
      console.error("[/api/leads] sink returned non-2xx", {
        status: res.status,
      });
    }
  } catch (err) {
    console.error("[/api/leads] sink fetch failed", err);
  }

  return NextResponse.json({ ok: true });
}
