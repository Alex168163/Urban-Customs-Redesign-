import { NextResponse } from "next/server";
import { site, projectTypes } from "@/content/site";

/**
 * Lead intake.
 *
 * Before launch this needs three things wired up, in priority order:
 *
 *   1. Email delivery to info@urbancustomsaz.com within seconds.
 *   2. An SMS or push alert to the mobile. Response speed is the single
 *      largest driver of close rate in home services — a lead that sits in
 *      an inbox overnight is frequently a lost lead.
 *   3. An auto-reply to the lead confirming receipt and restating the phone
 *      number, plus a row appended to a spreadsheet or CRM.
 *
 * Set LEAD_WEBHOOK_URL to forward every validated lead to whichever service
 * handles the above (Zapier, Make, a Postmark/Twilio function). With no
 * webhook configured the lead is logged and still accepted, so the front end
 * is testable end to end without credentials.
 */

export const runtime = "nodejs";

type Lead = Record<string, string | number | undefined>;

const digits = (v: string) => v.replace(/\D/g, "");

function invalid(body: Lead): string | null {
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const projectType = String(body.projectType ?? "").trim();

  if (name.length < 2) return "name";
  if (digits(phone).length < 10 || digits(phone).length > 11) return "phone";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "email";
  if (!(projectTypes as readonly string[]).includes(projectType)) return "projectType";
  return null;
}

export async function POST(request: Request) {
  let body: Lead;
  try {
    body = (await request.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (String(body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true, spam: true });
  }

  // Time-to-submit: under two seconds is a script, not a homeowner.
  const elapsed = Number(body.elapsedMs ?? 0);
  if (elapsed > 0 && elapsed < 2000) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const bad = invalid(body);
  if (bad) {
    return NextResponse.json({ ok: false, error: "validation", field: bad }, { status: 422 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
    projectType: String(body.projectType).trim(),
    message: String(body.message ?? "").trim(),
    street: String(body.street ?? "").trim(),
    cityStateZip: String(body.cityStateZip ?? "").trim(),
    hearAbout: String(body.hearAbout ?? "").trim(),
    formLocation: String(body.formLocation ?? "unknown"),
    deliverTo: site.email,
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      console.error("[lead] webhook delivery failed", err, lead);
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }
  } else {
    console.log("[lead] no LEAD_WEBHOOK_URL set — lead captured but not delivered:", lead);
  }

  return NextResponse.json({ ok: true });
}
