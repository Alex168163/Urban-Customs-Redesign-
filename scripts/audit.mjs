/**
 * Whole-site audit. Crawls every route in a running build and checks the
 * things that actually break a site in the field:
 *
 *   - console errors and uncaught page errors
 *   - failed network requests (missing images, 404 assets)
 *   - broken internal links, and every anchor target existing on its page
 *   - images without alt text, or rendered at zero size
 *   - duplicate element IDs (a real hazard here — form fields are id-prefixed)
 *   - form labels bound to real controls
 *   - heading order, one h1 per page
 *   - horizontal overflow at 375px
 *   - title and meta description present and within length
 *
 * Usage: node scripts/audit.mjs [baseUrl]
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3111";
const routes = [
  "/",
  "/flooring/",
  "/kitchens/",
  "/our-work/",
  "/contact/",
  "/thank-you/",
  "/privacy/",
  "/definitely-not-a-page/",
];

const problems = [];
const note = (route, kind, detail) => problems.push({ route, kind, detail });

const browser = await chromium.launch();

for (const route of routes) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push(`uncaught: ${e}`));
  page.on("requestfailed", (r) => failedRequests.push(`${r.url()} — ${r.failure()?.errorText}`));
  page.on("response", (r) => {
    if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`);
  });

  const resp = await page.goto(base + route, { waitUntil: "networkidle", timeout: 90000 });
  const expected = route === "/definitely-not-a-page/" ? 404 : 200;
  if (resp.status() !== expected) note(route, "status", `expected ${expected}, got ${resp.status()}`);

  // Scroll the whole page so lazy images and reveals actually fire.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle").catch(() => {});

  // Wait for every image to finish decoding before judging it broken. The
  // optimizer encodes AVIF on first request, so a cold cache can leave images
  // in flight for several seconds — reporting those as broken is noise.
  await page
    .waitForFunction(
      () => [...document.querySelectorAll("img")].every((i) => i.naturalWidth > 0),
      null,
      { timeout: 30000 },
    )
    .catch(() => {});
  await page.waitForTimeout(400);

  for (const e of consoleErrors) note(route, "console", e);
  for (const f of failedRequests) note(route, "request", f);

  const audit = await page.evaluate(() => {
    const out = {
      images: [],
      dupIds: [],
      unlabelled: [],
      headings: [],
      h1s: 0,
      title: document.title,
      description:
        document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      internalLinks: [],
      anchorTargets: [],
      emptyLinks: [],
    };

    for (const img of document.querySelectorAll("img")) {
      const alt = img.getAttribute("alt");
      const r = img.getBoundingClientRect();
      out.images.push({
        src: img.currentSrc || img.src,
        hasAlt: alt !== null,
        emptyAlt: alt === "",
        w: Math.round(r.width),
        h: Math.round(r.height),
        // naturalWidth is the reliable signal. `complete` can stay false on a
        // cached lazy image that has already decoded and is on screen.
        complete: img.naturalWidth > 0,
      });
    }

    const seen = new Map();
    for (const el of document.querySelectorAll("[id]")) {
      const id = el.id;
      seen.set(id, (seen.get(id) ?? 0) + 1);
    }
    for (const [id, n] of seen) if (n > 1) out.dupIds.push(`${id} ×${n}`);

    for (const ctrl of document.querySelectorAll("input, select, textarea")) {
      if (ctrl.type === "hidden") continue;
      const id = ctrl.id;
      const labelled =
        (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) ||
        ctrl.closest("label") ||
        ctrl.getAttribute("aria-label") ||
        ctrl.getAttribute("aria-labelledby");
      if (!labelled) out.unlabelled.push(ctrl.name || ctrl.id || ctrl.tagName);
    }

    for (const h of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
      out.headings.push({ level: Number(h.tagName[1]), text: h.textContent.trim().slice(0, 60) });
    }
    out.h1s = document.querySelectorAll("h1").length;

    for (const a of document.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href");
      const text = (a.textContent || "").trim();
      const labelled = text || a.getAttribute("aria-label") || a.querySelector("img[alt]:not([alt=''])");
      if (!labelled) out.emptyLinks.push(href);
      if (href.startsWith("/")) out.internalLinks.push(href);
      if (href.startsWith("#") && href.length > 1) {
        out.anchorTargets.push({ href, found: !!document.querySelector(CSS.escape(href.slice(1)) ? `#${CSS.escape(href.slice(1))}` : href) });
      }
    }
    return out;
  });

  // Assert the asset itself resolves rather than trusting the browser's decode
  // flag — a lazy image mid-flight reports naturalWidth 0 and is not a defect.
  const checkedSrc = new Set();
  for (const img of audit.images) {
    if (!img.hasAlt) note(route, "img-no-alt", img.src);
    if (img.hasAlt && !img.emptyAlt && (img.w === 0 || img.h === 0))
      note(route, "img-zero-size", `${img.w}×${img.h} ${img.src}`);

    if (!img.src || checkedSrc.has(img.src)) continue;
    checkedSrc.add(img.src);
    const r = await ctx.request.get(img.src, { headers: { Accept: "image/avif,image/webp,*/*" } });
    const bytes = (await r.body()).length;
    if (r.status() !== 200 || bytes === 0)
      note(route, "img-broken", `${r.status()} ${bytes}B ${img.src}`);
  }
  for (const d of audit.dupIds) note(route, "duplicate-id", d);
  for (const u of audit.unlabelled) note(route, "unlabelled-control", u);
  for (const e of audit.emptyLinks) note(route, "link-no-text", e);
  for (const a of audit.anchorTargets) if (!a.found) note(route, "dead-anchor", a.href);

  if (audit.h1s !== 1) note(route, "h1-count", String(audit.h1s));
  let prev = 0;
  for (const h of audit.headings) {
    if (prev && h.level > prev + 1) note(route, "heading-skip", `h${prev} → h${h.level} "${h.text}"`);
    prev = h.level;
  }

  if (!audit.title) note(route, "meta", "missing title");
  else if (audit.title.length > 65) note(route, "meta", `title ${audit.title.length}ch: ${audit.title}`);
  if (route !== "/definitely-not-a-page/") {
    if (!audit.description) note(route, "meta", "missing description");
    else if (audit.description.length > 165)
      note(route, "meta", `description ${audit.description.length}ch`);
  }

  // Internal links must resolve.
  const uniq = [...new Set(audit.internalLinks.map((h) => h.split("#")[0]))].filter(Boolean);
  for (const href of uniq) {
    const r = await ctx.request.get(base + href, { maxRedirects: 5 });
    if (r.status() >= 400) note(route, "broken-link", `${href} → ${r.status()}`);
  }

  // No horizontal overflow on a phone.
  const mob = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mp = await mob.newPage();
  await mp.goto(base + route, { waitUntil: "networkidle", timeout: 90000 });
  await mp.waitForTimeout(400);
  const overflow = await mp.evaluate(() => {
    const de = document.documentElement;
    if (de.scrollWidth <= de.clientWidth + 1) return null;
    const wide = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.right > de.clientWidth + 1 && r.width > 0) {
        const style = getComputedStyle(el);
        if (style.position === "fixed") continue;
        let scrollableParent = el.parentElement;
        let inScroller = false;
        while (scrollableParent && scrollableParent !== document.body) {
          const s = getComputedStyle(scrollableParent);
          if (s.overflowX === "auto" || s.overflowX === "scroll" || s.overflow === "hidden") {
            inScroller = true;
            break;
          }
          scrollableParent = scrollableParent.parentElement;
        }
        if (!inScroller) wide.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]} right=${Math.round(r.right)}`);
      }
    }
    return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, wide: wide.slice(0, 5) };
  });
  if (overflow) note(route, "h-overflow", `${overflow.scrollWidth}>${overflow.clientWidth} :: ${overflow.wide.join(" | ")}`);
  await mob.close();

  await ctx.close();
  process.stdout.write(`checked ${route}\n`);
}

await browser.close();

console.log("\n" + "=".repeat(70));
if (!problems.length) {
  console.log("No problems found across " + routes.length + " routes.");
} else {
  const byKind = {};
  for (const p of problems) (byKind[p.kind] ??= []).push(p);
  console.log(`${problems.length} problem(s):\n`);
  for (const [kind, list] of Object.entries(byKind)) {
    console.log(`[${kind}] ${list.length}`);
    for (const p of list.slice(0, 12)) console.log(`   ${p.route}  ${p.detail}`);
    if (list.length > 12) console.log(`   …and ${list.length - 12} more`);
    console.log();
  }
}
process.exit(problems.length ? 1 : 0);
