/**
 * Functional acceptance tests — the build guide's §10 "definition of done",
 * executed rather than eyeballed.
 *
 * Usage: node scripts/e2e.mjs [baseUrl]
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3111";
const fails = [];
const ok = (cond, msg) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`);
  if (!cond) fails.push(msg);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// --- Rule 1: no page is a dead end -----------------------------------------
for (const p of [
  "/",
  "/flooring/",
  "/kitchens/",
  "/our-work/",
  "/contact/",
  "/thank-you/",
  "/definitely-not-a-page/",
]) {
  const res = await page.goto(base + p, { waitUntil: "domcontentloaded" });
  const forms = await page.locator("form").count();
  const submits = await page.locator("button[type=submit]").allInnerTexts();
  const roc = await page.locator("footer").getByText("ROC# 293305").count();
  const tel = await page.locator('a[href^="tel:"]').count();
  const sms = await page.locator('a[href^="sms:"]').count();
  const isThanks = p === "/thank-you/";

  ok(isThanks || forms >= 1, `${p} carries a form (${forms})`);
  ok(
    submits.every((t) => t.trim() === "Get My Free Estimate"),
    `${p} submit button reads "Get My Free Estimate"`,
  );
  ok(roc >= 1, `${p} footer carries ROC# 293305`);
  ok(tel >= 1 && sms >= 1, `${p} has tap-to-call (${tel}) and tap-to-text (${sms})`);
  ok(
    res.status() === (p === "/definitely-not-a-page/" ? 404 : 200),
    `${p} returns ${res.status()}`,
  );
}

// --- Viewport must not block pinch zoom (WCAG 1.4.4) -----------------------
await page.goto(base + "/", { waitUntil: "domcontentloaded" });
const vp = await page.locator("meta[name=viewport]").getAttribute("content");
ok(!/user-scalable|maximum-scale/.test(vp ?? ""), `viewport meta clean: "${vp}"`);

// --- Voice rules: the banned constructions must not reach the rendered page -
for (const p of ["/", "/flooring/", "/kitchens/", "/our-work/", "/contact/"]) {
  await page.goto(base + p, { waitUntil: "domcontentloaded" });
  // Reviews are reproduced verbatim and are exempt — a customer may write
  // however they like. Check everything outside them.
  const text = await page.evaluate(() => {
    const clone = document.body.cloneNode(true);
    clone.querySelectorAll("figure, blockquote").forEach((n) => n.remove());
    return clone.innerText;
  });
  const banned = [/\bif (you|your|yours|the customer)\b/i, /can help!/i, /popular search queries/i];
  const hit = banned.find((re) => re.test(text));
  ok(!hit, `${p} free of banned constructions${hit ? ` — matched ${hit}` : ""}`);
}

// --- Rule 2: the homepage captures the lead at 375px, no scroll ------------
const mob = await browser.newContext({ viewport: { width: 375, height: 812 } });
const mp = await mob.newPage();
await mp.goto(base + "/", { waitUntil: "networkidle" });
const box = await mp.locator("#home-hero-name").boundingBox();
const scrolled = await mp.evaluate(() => window.scrollY);
ok(
  box !== null && box.y + box.height <= 812 && scrolled === 0,
  `375px: first field fully visible without scrolling (bottom ${box ? Math.round(box.y + box.height) : "n/a"}px)`,
);

// --- Validation names the fix ---------------------------------------------
await mp.locator("#home-hero-phone").fill("123");
await mp.locator("#home-hero-name").click();
await mp.waitForTimeout(200);
const err = await mp.locator("#home-hero-phone-err").innerText().catch(() => "");
ok(/phone number/i.test(err), `blur validation names the fix: "${err}"`);

// --- Spam defences --------------------------------------------------------
const post = (body) =>
  mp.evaluate(async (b) => {
    const r = await fetch("/api/lead/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(b),
    });
    return { status: r.status, body: await r.json() };
  }, body);

const valid = { name: "Dana Ruiz", phone: "4805550100", email: "d@example.com", projectType: "Floor Installation" };
ok((await post({ ...valid, company: "spam-co", elapsedMs: 9000 })).body.spam === true, "honeypot rejected");
ok((await post({ ...valid, elapsedMs: 400 })).body.spam === true, "sub-2s submit rejected");
ok((await post({ ...valid, email: "nope", elapsedMs: 9000 })).status === 422, "invalid email rejected 422");
ok((await post({ ...valid, projectType: "Nonsense", elapsedMs: 9000 })).status === 422, "unknown project type rejected 422");
ok((await post({ ...valid, elapsedMs: 9000 })).status === 200, "valid lead accepted 200");

// --- The real thing: fill it in and submit --------------------------------
await mp.goto(base + "/", { waitUntil: "networkidle" });
await mp.waitForTimeout(2200);
await mp.locator("#home-hero-name").fill("Dana Ruiz");
await mp.locator("#home-hero-phone").fill("480-555-0100");
await mp.locator("#home-hero-email").fill("dana@example.com");
await mp.locator("#home-hero-projectType").selectOption("Floor Refinishing");
await mp.locator("form button[type=submit]").first().click();
await mp.waitForURL(/thank-you/, { timeout: 15000 }).catch(() => {});
ok(/thank-you/.test(mp.url()), `submit lands on /thank-you/ (${mp.url()})`);

// --- Redirects: one 301 hop, straight to a 200 ----------------------------
const { redirects } = await import("../content/redirects.ts").catch(() => ({ redirects: null }));
const pairs = redirects
  ? redirects.map((r) => [r.source + "/", r.destination])
  : [
      ["/about/", "/#why-us"],
      ["/photo-gallery/", "/our-work/"],
      ["/contact-style-1/", "/contact/"],
      ["/our-team/", "/our-work/#reviews"],
      ["/testimonials/", "/our-work/#reviews"],
    ];
let redirectFails = 0;
for (const [from, to] of pairs) {
  const r = await ctx.request.get(base + from, { maxRedirects: 0 });
  const loc = (r.headers()["location"] ?? "").replace(base, "");
  const dest = await ctx.request.get(base + (loc.split("#")[0] || "/"), { maxRedirects: 0 });
  if (r.status() !== 301 || loc !== to || dest.status() !== 200) {
    redirectFails++;
    console.log(`  FAIL ${from} → ${r.status()} ${loc} (dest ${dest.status()}, expected 301 → ${to})`);
  }
}
ok(redirectFails === 0, `${pairs.length} redirects each a single 301 to a 200`);

await browser.close();
console.log(fails.length ? `\n${fails.length} FAILING:\n- ${fails.join("\n- ")}` : "\nAll checks passed.");
process.exit(fails.length ? 1 : 0);
