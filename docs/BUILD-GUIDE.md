# Urban Customs — Lead Generation Rebuild
## Build Guide v1.0

**Source site:** https://urbancustomsaz.com/
**Client:** Urban Customs — flooring installation, refinishing, kitchen remodeling. Phoenix, AZ.
**Goal:** A simpler site with far fewer pages that converts visitors into estimate requests.

Read this document top to bottom before writing code. Sections 1–3 define the mandate, 4–8 define the build, 9–11 define acceptance.

---

## 1. The Three Rules

These are non-negotiable. Every other decision bends around them.

### Rule 1 — A lead capture form appears on every single page

No page is a dead end. Every page carries a working form. On short pages the form sits in the hero. On long pages it appears in the hero **and** again before the footer. The header carries tap-to-call and tap-to-text on every page, at every breakpoint.

### Rule 2 — The homepage captures the lead

The homepage does not send people to a contact page to convert. A visitor lands on the homepage and can submit a complete estimate request without scrolling and without a second click. The form is above the fold, in the hero, on both mobile and desktop.

### Rule 3 — No conditional "if" openers. Ever.

The client rejects this construction. The current site is full of it:

> "**If you are searching for** 'Flooring Contractors Near Me' … Urban Customs can help!"
> "**If you need** …"
> "**If your** hardwood flooring is in bad shape, we provide …"

Every one of these gets rewritten as a direct declarative statement of what the company does. Full rewrite table in `content/COPY-DECK.md` §2. There is a grep check in §10 that must return zero matches before handoff.

**The pattern:** the old copy makes the customer prove they qualify. The new copy states the service as fact. "We repair water-damaged hardwood floors across the Phoenix Valley." Not "If your floor is water damaged…"

---

## 2. What is wrong with the current site

Diagnosis, so the rebuild is corrective rather than cosmetic.

| Problem | Consequence |
|---|---|
| ~25 pages across 5 dropdown menus, 3 levels deep | Visitors get lost in subpages instead of converting |
| The only form lives at `/contact-style-1/` | Every conversion needs a menu hunt and a page load |
| Homepage opens with a 4-slide rotating banner | Slider content is largely ignored; nothing captures a lead |
| Homepage body copy is a keyword list ("Popular search queries used to find our flooring installation services include…") | Reads as spam to humans, adds nothing for search |
| Conditional "if you are searching" openers throughout | Client has explicitly rejected this voice |
| **Two different business addresses on the live site** | See §8 — this must be resolved before launch |
| Testimonials buried at `/our-team/` (a URL that says "team", not "reviews") | Strongest proof asset is invisible |
| Specials buried under About → Current Specials | Best offer in the business is three clicks deep |

**The address conflict — likely resolved.** The live site is inconsistent: most pages footer `8050 N 19th Avenue Ste. 127, Phoenix AZ 85021`, while the Flooring Installation page footers `1718 E. McDowell Rd. Unit 18, Phoenix, AZ 85006`.

The agency's staging redesign uses **`1718 E. McDowell Rd. Unit 18, Phoenix, Arizona 85006`** consistently on every page, with no trace of the 19th Avenue address. That is a strong signal the McDowell showroom is current and the live site simply has stale footers.

**Use McDowell — but get the client to say it out loud before launch.** Then use that one string byte-for-byte everywhere: site, schema, Google Business Profile, directory listings. Inconsistent NAP data actively suppresses local map rankings.

Note the staging footer also drops the "(By Appointment Only!)" line that the live site carries. Ask whether the showroom now takes walk-ins — it changes the copy.

---

## 2b. The agency's staging redesign — read this

There is a second, newer version of this site at `https://webtechs-designs.com/UrbanCustoms/`, built by the client's agency (WebTechs.Net) and last modified May 2026. It has never gone live.

**Mine it for content. Do not copy its structure.**

### What it gives us (use all of this)

| Find | Why it matters |
|---|---|
| **Brand green `#127B00`** | Set as `theme-color`. Client-approved. Now the palette anchor — see §6. |
| **McDowell address used consistently** | Resolves the live site's address conflict (§2) |
| **Four services the live site never mentions** | Laminate, Luxury Vinyl Plank, Floor Sanding, Hardwood Restoration. These expand the offer and each one is a real search term. |
| **Ten new testimonials** | Far stronger than the old seven — they name staff (Heath, Rachel, Steve the PM) and describe specific work. Use these. |
| **The custom-design case study** | A water-leak repair solved with a water-jet-cut "defined random pattern" that saved the client from replacing 2,700 ft of floor. This is the single best piece of copy either site has. Feature it. |
| **Room-type taxonomy** | Master Bath, Shower Stall, Guest Bathroom, Living Room, Kitchen Area, Outdoor Patio — a better gallery filter than material type. |
| **Financing block** | "100% home improvement financing. Apply in 60 seconds." Currently buried on the live site. |
| **New logo and favicon** | 2026/01 uploads, cleaner than the 2024 set |

### What it gets wrong (the reason this rebuild exists)

The staging redesign is a reskin. It does not fix a single problem the client raised:

- **Still no form anywhere.** Every CTA is a "LEARN MORE" or "Details" link — and they all point *cross-domain* back to the old site's `/contact-style-1/`. A visitor on staging who wants a quote leaves the domain entirely.
- **Still six dropdown menus, now with more subpages, not fewer.** The client asked for simpler; this is more complex.
- **The "If you are searching for…" paragraph survived verbatim,** including the keyword-stuffed "Popular search queries used to find our flooring installation services include…" sentence. The exact thing the client rejected is still on the homepage.
- **Still a rotating slider**, now running Slider Revolution — a heavy plugin that will hurt LCP.
- **`user-scalable=0, maximum-scale=1`** in the viewport meta. This blocks pinch-zoom on mobile. It is a WCAG 1.4.4 failure and it must not be carried over. Our viewport tag is `width=device-width, initial-scale=1` and nothing more.
- Service cards link to a contact page instead of to the services they describe.

**In short:** take its content and its color, throw away its architecture. If the client asks why they are paying for a rebuild when a redesign already exists, this list is the answer.

### One urgent problem, unrelated to the rebuild

**The staging site is set to `index, follow`.** Both pages I checked carry:

```
meta-robots: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
canonical: https://webtechs-designs.com/UrbanCustoms/...
```

It is a near-complete duplicate of the client's live site, publicly reachable, indexable, and self-canonicalizing — so it is not pointing search engines back to the real domain. That means it can compete with `urbancustomsaz.com` in search results for the client's own brand and service terms.

**Raise this with the client immediately. It does not wait for the rebuild.** The fix is any one of: `noindex` on the staging site, an HTTP auth wall, a `robots.txt` disallow, or canonical tags pointing to the live equivalents. Verify current status yourself before escalating — I read this off two pages on one day, and the agency may have already addressed it.

Worth checking `site:webtechs-designs.com/UrbanCustoms` in Google to see how much of it is actually indexed.

---

## 3. Sitemap: 25 pages down to 6

### Build exactly these

| # | Page | URL | Job |
|---|---|---|---|
| 1 | Home | `/` | Capture the lead. Everything else is secondary. |
| 2 | Flooring | `/flooring/` | Install + refinish + repair, one page. Capture the lead. |
| 3 | Kitchens & Cabinets | `/kitchens/` | Remodel + cabinets, one page. Capture the lead. |
| 4 | Our Work | `/our-work/` | Gallery + reviews, one page. Capture the lead. |
| 5 | Contact | `/contact/` | Full form, map, hours, directions. |
| 6 | Thank You | `/thank-you/` | Conversion tracking target. `noindex`. |

Plus `/404`, `/privacy`, `/sitemap.xml`, `/robots.txt`.

### What gets absorbed, and where

- **About** → "Why Urban Customs" band on the homepage. 21 years, family-run, ROC# 293305, lifetime workmanship guarantee. It does not need its own page.
- **Current Specials** → offer strip on the homepage plus a repeated band on `/flooring/`. The offer belongs where people are, not behind a menu.
- **Gallery + Testimonials** → merged into `/our-work/`. Photos and proof reinforce each other.
- **FAQs** → accordion at the bottom of the relevant service page. Keeps the long-tail search value, kills the orphan page.
- **Careers** → single `mailto:` line in the footer. It is not a lead source.
- **Hardwood / Stone / Bamboo / Flooring Options / Refinishing / Repair** (6 pages) → six sections on `/flooring/` with anchor links (`#hardwood`, `#stone`, `#bamboo`, `#refinishing`, `#repair`, `#faq`).
- **Cabinet Options** → section on `/kitchens/`.
- **City pages** (`flooring-contractors-phoenix`, `-gilbert`, `-glendale`, `-peoria`) → do **not** rebuild in v1. They currently carry SEO equity, so 301 them to `/flooring/` per the redirect map. Revisit only if the client wants a deliberate local-page program later.

### Navigation

Five links. No dropdowns. No mega menu.

```
[LOGO]   Flooring   Kitchens   Our Work   Contact      480-747-2516   [Get My Free Estimate]
```

Mobile: logo, a call icon, a text icon, and a hamburger holding the same five links.

---

## 4. Technical stack

**Primary: Next.js 14+ (App Router) with static export, Tailwind CSS, TypeScript.**

```
next.config.js → output: 'export'
```

No CMS. Six pages of largely static content do not justify one, and a static export deploys to Netlify, Vercel, or Cloudflare Pages for free with excellent Core Web Vitals.

Content lives in typed objects under `/content/*.ts` so copy edits never touch JSX.

**Acceptable alternative:** Astro, if you prefer less JS shipped. Same structure, same rules.

**If the client requires WordPress** (they are on it today, and their agency WebTechs.Net maintains it): build the same six templates in a block theme, use Gravity Forms or WPForms for the form, and honor every rule in this document. The structure matters more than the stack.

### Project structure

```
/app
  layout.tsx            → header, footer, sticky mobile call bar, schema
  page.tsx              → Home
  flooring/page.tsx
  kitchens/page.tsx
  our-work/page.tsx
  contact/page.tsx
  thank-you/page.tsx
/components
  LeadForm.tsx          → the one form component, three variants
  QuoteRail.tsx         → signature element, see §6
  Header.tsx  Footer.tsx  StickyCallBar.tsx
  ServiceCard.tsx  ReviewCard.tsx  GalleryGrid.tsx  FaqAccordion.tsx
  OfferStrip.tsx  TrustBar.tsx
/content
  site.ts               → NAP, phone, hours, ROC number — single source of truth
  services.ts  reviews.ts  faqs.ts
/public/assets          → copy in from ../assets after running fetch-assets.sh
```

**`site.ts` is the single source of truth for name, address, phone, hours, and license number.** Nothing hardcodes a phone number in JSX. When the client changes a number, it changes in one place.

---

## 5. The lead form

This is the product. Build it first.

### Three variants, one component

| Variant | Where | Fields |
|---|---|---|
| `hero` | Homepage hero, service page heroes | Name, Phone, Email, Project Type → **4 fields** |
| `inline` | Before footer on every long page | Name, Phone, Email, Project Type, Message → 5 fields |
| `full` | `/contact/` only | Adds Street, City/State/ZIP, How Did You Hear |

The current site's form asks for nine fields including a full street address before anyone has spoken to a human. That is a wall. The hero form asks four. Address gets collected on the phone call, where it belongs.

### Field specification

```
Name          text     required   autocomplete="name"
Phone         tel      required   autocomplete="tel"   inputmode="numeric"
Email         email    required   autocomplete="email"
Project Type  select   required   → Floor Installation
                                    Floor Refinishing
                                    Floor Repair
                                    Kitchen Remodeling
                                    Cabinet Installation
                                    Something Else
Message       textarea optional
```

`full` variant adds:
```
Street Address        text    required  autocomplete="street-address"
City, State & ZIP     text    required
How Did You Hear      select  optional  → Google Search / Repeat Customer / Referral / Other
```

### Behavior

- **Submit button says `Get My Free Estimate`.** Not "Submit." The button names the outcome.
- Mobile keyboards: `type="tel"` and `inputmode="numeric"` on phone, `type="email"` on email. Getting this wrong costs mobile conversions outright.
- Validate inline on blur, not on submit. Error text names the fix: "Enter a phone number we can reach you at." Never a bare "Invalid input."
- Honeypot field, visually hidden, plus a time-to-submit check under 2 seconds. No CAPTCHA — CAPTCHA costs more real leads than the spam it stops.
- On success → redirect to `/thank-you/`. This gives a clean conversion target for GA4 and Google Ads.
- Never clear the user's entries on a failed submit.
- Form failure state: show the phone number as the fallback. "Something went wrong on our end. Call 480-747-2516 and we'll take your details directly."

### Backend

Static export means no server. Use a form endpoint service — Formspree, Basin, Netlify Forms, or a small serverless function. Requirements:

1. Email delivery to `info@urbancustomsaz.com` within seconds
2. **SMS or push alert to the mobile number on submit.** Response speed is the single largest driver of close rate for home services. A lead that sits in an inbox overnight is frequently a lost lead. Flag this to the client explicitly.
3. Auto-reply to the lead confirming receipt and restating the phone number
4. Submissions logged to a spreadsheet or CRM, not only email

### Tracking

Fire on successful submit:
```js
gtag('event', 'generate_lead', {
  form_location: 'hero' | 'inline' | 'contact',
  project_type: <selected value>
})
```
Also track `tel:` and `sms:` clicks as conversions. On a contractor site, calls typically outnumber form fills — do not measure only the form.

---

## 6. Design direction

The client rejected the current template look. Give them something specific to their trade.

### Ground the design in the material

Urban Customs works in wood grain, stone slab, tile grid, grout line, and finish sheen. The design should come from that world — plank proportions, the horizontal run of a floor, the measured grid of set tile — and not from a stock contractor template.

### Tokens

**Brand green is `#127B00`.** This is not a guess — it is the `theme-color` meta value the agency set on the staging redesign, so it is the color the client has already signed off on. Build around it.

```css
--uc-green:      #127B00;  /* brand green — CONFIRMED. CTAs and links only */
--uc-green-deep: #0C5400;  /* hover / pressed */
--uc-ink:        #10140F;  /* near-black, faint green cast — headings, body */
--uc-chalk:      #F2F1EC;  /* page ground */
--uc-walnut:     #6A4326;  /* wood tone — dark section grounds, Quote Rail */
--uc-slate:      #7C8471;  /* soapstone grey-green — borders, secondary */
--uc-white:      #FFFFFF;
```

Contrast, already verified:

| Pair | Ratio | Verdict |
|---|---|---|
| White text on `--uc-green` button | 5.44:1 | ✅ AA |
| `--uc-green` text on white | 5.44:1 | ✅ AA |
| `--uc-green` text on `--uc-chalk` | 4.81:1 | ✅ AA |
| `--uc-ink` on `--uc-chalk` | 16.45:1 | ✅ AAA |
| `--uc-green` on `--uc-walnut` | 1.58:1 | ❌ **never do this** |

On the walnut Quote Rail band, the CTA is a solid green button with white text. Green type directly on walnut fails badly — do not use it.

`--uc-green` is reserved exclusively for actions and links. If it appears on something that is not clickable, that is a bug. Everything else is ink, chalk, walnut, and slate.

Confirm the green against `assets/logos/urban-customs-white-logo-300px.png` once downloaded. If the logo's green differs, **the logo wins** — adjust the deep and hover values to match.

### Type

```
Display:  Archivo (700/800, tight tracking, sentence case for headlines,
                   uppercase reserved for eyebrows)
Body:     Source Sans 3 (400/600)
Utility:  IBM Plex Mono (500) — phone numbers, ROC number, measurements,
                                square-footage figures
```

The mono face is the deliberate choice: it reads like a contractor's takeoff sheet and it makes the phone number scan as data rather than decoration. Use it sparingly — phone number, license, and numeric specs only.

Type scale: 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64. Body 18px, line-height 1.6.

### Signature element — the Quote Rail

One memorable device, and it does real work. A full-width horizontal band with a fine wood-grain texture and a hairline top rule, carrying the phone number in mono at large size beside the estimate CTA. It sits at the foot of every content section on every page.

This is the signature *and* it is Rule 1's delivery mechanism — the design's most distinctive element is also its conversion engine. Spend the boldness here and keep everything around it quiet.

### Restraint

- **Kill the rotating slider.** One still hero image, one headline, one form. Sliders suppress conversion and hurt LCP.
- Border radius: 2px, or zero. Floors and tile are square-cut. No pill buttons.
- Motion: scroll-reveal on the gallery grid at most. Respect `prefers-reduced-motion`. Nothing on the hero — it must be interactive instantly.
- No stock photography of unrelated houses. Every image is their own work.

---

## 7. Page specifications

### 7.1 Home — `/`

**Job: capture the lead.** Nothing on this page outranks that.

```
┌────────────────────────────────────────────────────────────┐
│ HEADER  logo | Flooring Kitchens Our Work Contact          │
│         480-747-2516  [Get My Free Estimate]               │
├────────────────────────────────────────────────────────────┤
│ HERO — background: interior-stone-installations-in-arizona │
│                                                            │
│  Phoenix flooring and         ┌──────────────────────┐     │
│  kitchen contractors,         │ GET A FREE ESTIMATE  │     │
│  family-run since 2005.       │ Name                 │     │
│                               │ Phone                │     │
│  Hardwood, tile, stone,       │ Email                │     │
│  bamboo, refinishing,         │ Project Type      ▾  │     │
│  and full kitchen remodels    │ [Get My Free Estimate]│    │
│  across the Valley.           │ Or call 480-747-2516 │     │
│                               └──────────────────────┘     │
│  ROC# 293305 · 21 years · Lifetime workmanship guarantee   │
├────────────────────────────────────────────────────────────┤
│ TRUST BAR  21 Years · ROC# 293305 · Lifetime Guarantee ·   │
│            Cali Bamboo Preferred Installer · Financing     │
├────────────────────────────────────────────────────────────┤
│ SERVICES  3 cards → Flooring | Refinishing | Kitchens      │
├────────────────────────────────────────────────────────────┤
│ OFFER STRIP  3 current coupons, each → /contact/           │
├────────────────────────────────────────────────────────────┤
│ RECENT WORK  6 photos → /our-work/                         │
├────────────────────────────────────────────────────────────┤
│ REVIEWS  3 testimonials + Google reviews button            │
├────────────────────────────────────────────────────────────┤
│ WHY URBAN CUSTOMS  Design · Installation · Warranty        │
├────────────────────────────────────────────────────────────┤
│ QUOTE RAIL  full inline form + phone                       │
├────────────────────────────────────────────────────────────┤
│ FOOTER  NAP · hours · map · service areas · ROC#           │
└────────────────────────────────────────────────────────────┘
```

**Mobile hero order:** headline → form → supporting text. The form comes *before* the prose. On a phone, the first screen should be the headline and the first form field.

Hero background: `interior-stone-installations-in-arizona.jpg`. Dark overlay at ~55% so white type clears WCAG AA. Preload it as the LCP element.

### 7.2 Flooring — `/flooring/`

Absorbs ten old pages. Hero with `hero` form variant, then anchored sections:

1. `#installation` — Installation overview + before/during/after images
2. `#custom-design` — **The custom-design case study.** Put it high on the page, directly under the installation intro. It is the strongest proof asset the company has: a real problem, a specific solution, a quantified save. Pair it with the four `urban-customs-floor-designs-and-installations` images.
3. `#hardwood` — Hardwood
4. `#stone` — Natural stone & tile (keep the tile sizing and stone-selection lists — real specifics build trust)
5. `#bamboo` — Bamboo / Cali Bamboo preferred installer, 50-year warranty
6. `#laminate` — Laminate *(new — staging only)*
7. `#vinyl-plank` — Luxury vinyl plank *(new — staging only)*
8. `#refinishing` — Refinishing: buffing, screening, sanding, resurfacing, re-coating
9. `#sanding` — Floor sanding *(new — staging only)*
10. `#repair` — Repair & restoration: water damage, termite damage, deep scratches, worn areas, gaps, cracks *(staging splits restoration out as its own service; keep it in this section but use both words in the heading so the search term is covered)*
11. `#warranty` — Lifetime workmanship guarantee + manufacturer warranties
12. `#faq` — FAQ accordion
13. Quote Rail → inline form

Laminate, vinyl plank, sanding, and restoration exist only on the staging site. **Confirm with the client that they actually offer all four** before publishing — an unpublished staging page is not proof of an active service line.

Keep the cost figures from the FAQ **only if the client confirms they are current.** They cite 2019 data. Stale pricing on a live page erodes trust and invites disputes. Either refresh the numbers with the client or cut the cost FAQs entirely.

### 7.3 Kitchens & Cabinets — `/kitchens/`

Hero with form. Then: Kitchen Design / Cabinet Installation / Remodel Ideas cards → the 4-step process (Consultation, Planning & Design, Finalize Details, Remodeling) → kitchen project gallery → FAQ → Quote Rail.

The 4-step process is genuinely sequential, so numbered markers are correct here. Do not number anything that is not a real sequence.

### 7.4 Our Work — `/our-work/`

Filterable gallery. Use the **room-type taxonomy from the staging site** rather than material type — homeowners search and think in rooms, not species:

`All · Living Room · Kitchen · Master Bath · Guest Bath · Shower Stall · Outdoor Patio · Refinishing & Repair`

Lazy-load below the fold, lightbox on click, real descriptive alt text on every image. Testimonials interleaved between gallery rows so proof and evidence sit together. Google reviews button. Quote Rail.

**Use the ten staging testimonials, not the seven from the live site.** They are newer, they name the people who do the work, and several describe outcomes a prospect can picture. Full text in `content/COPY-DECK.md` §6.

### 7.5 Contact — `/contact/`

`full` form variant, top of page, above the map. Beside it: phone, text line, email, address, hours, and the "By Appointment Only" note. Google Map embed **lazy-loaded** — an eager map iframe is often the single heaviest thing on a contractor site.

### 7.6 Thank You — `/thank-you/`

`noindex, nofollow`. Confirm what happens next and when. Give the phone number for anything urgent. Link to `/our-work/` to keep them warm. Conversion pixels fire here.

---

## 8. Content, SEO, and compliance

### Titles and descriptions

| Page | Title (≤60ch) |
|---|---|
| Home | Flooring Contractors Phoenix, AZ \| Urban Customs |
| Flooring | Flooring Installation & Refinishing Phoenix \| Urban Customs |
| Kitchens | Kitchen Remodeling Phoenix, AZ \| Urban Customs |
| Our Work | Flooring & Kitchen Project Gallery \| Urban Customs |
| Contact | Contact Urban Customs \| Free Estimate Phoenix, AZ |

Write descriptions as statements of service with the phone number. No "if you are searching."

### Schema (JSON-LD, in `layout.tsx`)

`LocalBusiness` / `HomeAndConstructionBusiness` with name, the **confirmed** address, `telephone`, `openingHours`, `areaServed` (Phoenix, Gilbert, Glendale, Peoria, Tempe, Peoria, Sun City, Litchfield Park), `hasCredential` for ROC# 293305, and `aggregateRating` **only if** the client provides real review counts. Never fabricate rating data — Google penalizes it and it is a legal exposure.

Add `FAQPage` schema on the service pages, matching the visible accordion content exactly.

### Redirects

Full 301 map in `content/REDIRECT-MAP.md`. Every retired URL must resolve. Losing this step throws away the site's existing search equity — it is the highest-risk item in the whole build.

### Compliance items to confirm with the client

- Which address is current (§2)
- Whether the 2019 cost figures may stay
- Whether the three 2026 coupons are still live and their expiry dates
- ROC# 293305 must appear in the footer of every page — Arizona ROC advertising requirement
- The financing link goes offsite to `hellorates.com`. Confirm the partnership is active before rebuilding the badge.

---

## 9. Performance and accessibility

**Targets:** LCP under 2.0s on 4G mobile, CLS under 0.1, Lighthouse Performance 90+, Accessibility 95+.

- Convert all downloaded JPG/PNG to WebP with JPG fallback. Source images are large and unoptimized.
- Explicit `width`/`height` on every image to prevent layout shift.
- Preload the hero image. Lazy-load everything below the fold, including the map.
- Self-host fonts, `font-display: swap`, subset to Latin.
- Every form input has a real `<label>` — placeholder text is not a label.
- Visible keyboard focus rings. Do not remove outlines.
- Test the whole form flow with a keyboard only, and with VoiceOver on iOS.
- Contrast: all text on the hero overlay must clear 4.5:1. Palette ratios are pre-verified in §6.
- **Viewport meta is exactly `width=device-width, initial-scale=1`.** The staging redesign ships `maximum-scale=1, user-scalable=0`, which blocks pinch-zoom and fails WCAG 1.4.4. Do not carry it over.
- Do not use Slider Revolution or any equivalent slider plugin. The staging build loads it; we have no slider.

---

## 10. Definition of done

Do not hand off until every box is checked.

**The three rules**
- [ ] A working form is present on all six pages
- [ ] The homepage form is above the fold on a 375px viewport with no scrolling
- [ ] `grep -rniE "\bif (you|your|yours|the customer)\b" ./content ./app ./components` returns **zero** matches
- [ ] `grep -rni "can help!" ./content ./app ./components` returns **zero** matches

**Conversion**
- [ ] Tap-to-call works in the header on every page, on mobile and desktop
- [ ] Tap-to-text works and opens the SMS app pre-addressed to 480-381-9892
- [ ] Sticky mobile call bar persists on scroll
- [ ] Submitting the form sends email **and** an SMS/push alert
- [ ] Successful submit lands on `/thank-you/` and fires `generate_lead`
- [ ] `tel:` and `sms:` clicks tracked as conversions
- [ ] Submit button reads "Get My Free Estimate" on every instance

**Content**
- [ ] Zero keyword-stuffed sentences; the "Popular search queries…" paragraph is gone
- [ ] All copy pulled from `content/COPY-DECK.md`
- [ ] One address string used everywhere, client-confirmed
- [ ] ROC# 293305 in the footer of every page
- [ ] All seven testimonials carry real attribution

**Carried over from staging**
- [ ] Brand green `#127B00` used for actions and links only
- [ ] Viewport meta contains no `user-scalable` or `maximum-scale`
- [ ] Ten staging testimonials used, with attribution
- [ ] Custom-design case study on `/flooring/`
- [ ] No cross-domain CTAs — every link stays on the new domain
- [ ] Laminate, vinyl plank, sanding, restoration confirmed as live services by the client

**Technical**
- [ ] Every redirect in `REDIRECT-MAP.md` resolves with a 301
- [ ] `sitemap.xml` and `robots.txt` present; `/thank-you/` excluded
- [ ] Schema validates in Google's Rich Results Test
- [ ] Lighthouse mobile: Performance 90+, Accessibility 95+, SEO 100
- [ ] Tested on iOS Safari, Android Chrome, desktop Chrome, Firefox, Safari
- [ ] Real form submission received end-to-end before launch

---

## 11. Assets

`/assets/` holds the manifest, a plain URL list, and a download script.

**The assets are not pre-downloaded.** The environment that produced this guide is network-restricted and blocked from `urbancustomsaz.com` (proxy returns `403 host_not_allowed`). Every URL below has been read directly off the live site's rendered HTML and is recorded exactly.

Run this first:

```bash
cd assets
chmod +x fetch-assets.sh
./fetch-assets.sh
```

The script downloads into `logos/`, `banners/`, `images/`, `icons/`, `badges/`, `coupons/`, `gallery/`, and `kitchen/`, and writes `fetch-report.txt` listing anything that failed. See `assets/ASSET-MANIFEST.md` for every file, where it came from, and where it goes in the new build.

A handful of gallery and kitchen filenames were lazy-loaded and not exposed in the rendered HTML. The script probes the known upload folders for those and reports what it finds. Anything still missing after the run should be requested from the client directly — they will have originals at higher resolution than the web copies anyway, which is the better outcome.

**Before using any image:** confirm with the client that they own or are licensed for it. Several gallery photos carry a burned-in watermark logo, which suggests they are the company's own work, but confirm rather than assume.

---

## 12. Build order

1. `site.ts` — NAP, phone, hours, ROC number
2. `LeadForm.tsx` — all three variants, wired to a real endpoint, tested end to end
3. `layout.tsx` — header, footer, sticky call bar, schema
4. Homepage
5. Flooring, Kitchens
6. Our Work, Contact, Thank You
7. Redirects, sitemap, robots
8. Performance pass, accessibility pass
9. Run §10 in full

Build the form before the pages. Everything else is a frame around it.
