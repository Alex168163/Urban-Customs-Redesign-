# Urban Customs — Redesign

A lead-generation rebuild of [urbancustomsaz.com](https://urbancustomsaz.com/): 25 pages down to 6, a working form on every one of them, and a design built out of the material the company actually works in.

Built from the spec in [`docs/BUILD-GUIDE.md`](docs/BUILD-GUIDE.md).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · deployed on Vercel.

The guide's default was a static export plus a third-party form endpoint. This build keeps everything else and swaps that one piece for a serverless route handler — explicitly sanctioned in §5 ("a small serverless function") — so the form works end to end without a third-party account, and `next/image` can do the WebP/AVIF conversion the performance section asks for.

## The three rules

1. **A form on every page.** Six pages, seven forms, plus one on the 404. Verified by test.
2. **The homepage captures the lead.** At 375px the first form field sits 407px down the page — headline and form both above the fold, no scroll, no second click.
3. **No conditional "if" openers.** `grep -rniE "\bif (you|your|yours|the customer)\b" ./content ./app ./components` returns zero. So does `grep -rni "can help!"`.

## Layout

```
app/
  layout.tsx           header, footer, sticky call bar, LocalBusiness schema
  page.tsx             home
  flooring/            13 sections, absorbs 10 old pages
  kitchens/            remodel, cabinets, 4-step process
  our-work/            room-filtered gallery + all ten reviews
  contact/             full form, direct lines, lazy map
  thank-you/           conversion target, noindex
  privacy/  not-found.tsx  sitemap.ts  robots.ts
  api/lead/route.ts    validation, honeypot, spam timing, webhook forward

components/
  LeadForm.tsx         one component, three variants (hero / inline / full)
  QuoteRail.tsx        the signature element — and the conversion engine
  Hero.tsx  Header.tsx  Footer.tsx  StickyCallBar.tsx
  GalleryGrid.tsx      filter, lightbox, scroll reveal
  FaqAccordion.tsx  LazyMap.tsx  ConversionTracking.tsx  ui.tsx

content/                 all copy and data — editing copy never touches JSX
  site.ts              NAP, phone, hours, ROC — single source of truth
  services.ts  reviews.ts  faqs.ts  gallery.ts  redirects.ts
  image-dimensions.ts  generated; explicit w/h on every image

public/assets/           111 images pulled from the live and staging sites
docs/                    the original handoff package
scripts/image-dimensions.mjs
```

## Design

The guide asked for something specific to the trade rather than a contractor template. This one is grounded in plank proportion, grout line, and the measured grid of set tile:

- **Palette** — brand green `#127B00` on chalk, ink, walnut and soapstone slate. Green is reserved strictly for things you can click; if it appears on something inert, that is a bug.
- **Type** — Archivo for display, Source Sans 3 for body, IBM Plex Mono for phone numbers, licence numbers and measurements, so figures read as data off a takeoff sheet rather than decoration.
- **Motifs** — hairline rules, 2px corners, mono section indices (`01 / WHAT WE DO`), and CSS grain and plank textures on the dark bands.
- **The Quote Rail** — a walnut band with wood grain, a hairline top rule, the phone and text numbers in large mono, and a live form. It closes every page. The most distinctive element on the site is also the one that converts.
- **Motion** — scroll reveal on gallery tiles, and nothing else. `prefers-reduced-motion` turns it off.

## Verified

Run against a production build:

- Form present, submit button reads "Get My Free Estimate", ROC# in the footer, and tap-to-call plus tap-to-text on all seven routes
- Homepage form above the fold at 375px with zero scroll
- Blur validation names the fix; honeypot and sub-2-second submits rejected; invalid payloads 422; a real submission lands on `/thank-you/`
- All 31 redirects return a single **301** straight to a **200** — no chains
- Viewport meta is exactly `width=device-width, initial-scale=1`

## Before this goes live

Blocking, from the guide:

1. **Confirm the address out loud.** `1718 E. McDowell Rd. Unit 18, Phoenix, AZ 85006` is used everywhere in `content/site.ts`, taken from the agency staging build, which resolves the live site's conflict — but nobody has said it out loud yet.
2. **Confirm laminate, vinyl plank, floor sanding and hardwood restoration are live services.** They appear only on the unpublished staging site. Each of those four sections on `/flooring/` carries a visible note; delete the `unconfirmed` flag in `content/services.ts` once confirmed, or delete the section.
3. **Wire the form up.** Set `LEAD_WEBHOOK_URL` to a service that emails `info@urbancustomsaz.com`, **fires an SMS or push alert**, auto-replies to the lead, and logs to a sheet or CRM. The SMS alert is the one worth pushing for — response speed drives close rate more than anything else on this page.
4. **Confirm the three 2026 coupons are current** and get expiry dates.
5. **Confirm the HelloRates financing partnership is active** before the financing block ships.
6. **Confirm image rights.** Several gallery photos carry a burned-in watermark, which suggests they are the company's own — confirm rather than assume, and ask for originals at full resolution.
7. **Point `site.url`** at the production domain, then submit `sitemap.xml` to Search Console.
8. Replace the placeholder in `app/privacy/page.tsx` with the client's real policy.

The 2019 cost figures from the old FAQ page are deliberately **not** carried over. Add them back only once the client confirms the numbers are current.

Separate from this rebuild, and urgent: **the agency staging site at `webtechs-designs.com/UrbanCustoms/` is set to `index, follow` and self-canonicalizes.** It is a near-complete indexable duplicate competing with the client's own domain. See `docs/BUILD-GUIDE.md` §2b.
