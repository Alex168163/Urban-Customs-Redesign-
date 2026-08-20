# 301 Redirect Map

Collapsing ~25 pages into 6 means most existing URLs disappear. Every one of them must 301 to its closest new equivalent. Skipping this discards the site's accumulated search equity and is the single highest-risk item in the build.

## Confirmed URLs from the live site

| Old URL | → New URL | Type |
|---|---|---|
| `/` | `/` | unchanged |
| `/about/` | `/#why-us` | 301 |
| `/current-specials/` | `/#specials` | 301 |
| `/photo-gallery/` | `/our-work/` | 301 |
| `/careers/` | `/contact/` | 301 |
| `/our-team/` | `/our-work/#reviews` | 301 |
| `/faqs/` | `/flooring/#faq` | 301 |
| `/phoenix-flooring-installation/` | `/flooring/` | 301 |
| `/projects/` | `/flooring/` | 301 |
| `/projects/floors/` | `/flooring/#hardwood` | 301 |
| `/stone-flooring-contractors-phoenix/` | `/flooring/#stone` | 301 |
| `/projects/bamboo-flooring/` | `/flooring/#bamboo` | 301 |
| `/services/` | `/flooring/` | 301 |
| `/hardwood-floor-refinishing/` | `/flooring/#refinishing` | 301 |
| `/refinishing/` | `/flooring/#repair` | 301 |
| `/kitchen-remodeling/` | `/kitchens/` | 301 |
| `/kitchen-remodeling/cabinet-options/` | `/kitchens/#cabinets` | 301 |
| `/contact-style-1/` | `/contact/` | 301 |
| `/services/design-and-build/` | `/flooring/#installation` | 301 |
| `/services/warranty/` | `/flooring/#warranty` | 301 |
| `/flooring-contractors-phoenix/` | `/flooring/` | 301 |
| `/flooring-contractors-gilbert/` | `/flooring/` | 301 |
| `/glendale-flooring-contractors/` | `/flooring/` | 301 |
| `/flooring-contractors-peoria/` | `/flooring/` | 301 |
| `/tile-installation-phoenix-cost/` | `/flooring/#stone` | 301 |
| `/slate-stone-flooring-phoenix/` | `/flooring/#stone` | 301 |
| `/flooring-installation-cost-per-sq-ft/` | `/flooring/#faq` | 301 |

## Staging-site URLs

The agency's unreleased redesign at `webtechs-designs.com/UrbanCustoms/` has four service pages that do not exist on the live site. If the client publishes those services, these are the destinations:

| Staging URL | → New URL |
|---|---|
| `/projects/laminate-flooring/` | `/flooring/#laminate` |
| `/projects/luxury-vinyl-plank-flooring/` | `/flooring/#vinyl-plank` |
| `/hardwood-floor-refinishing/wood-floor-sanding-arizona/` | `/flooring/#sanding` |
| `/hardwood-restoration/` | `/flooring/#repair` |
| `/testimonials/` | `/our-work/#reviews` |

**These do not need 301s from the live domain** — those URLs have never existed there. Add them to the live site's redirect rules anyway, since they cost nothing and cover the case where the agency pushes staging live before this rebuild ships.

**Separately:** the staging site is set to `index, follow` and self-canonicalizes, which makes it an indexable duplicate competing with the client's own domain. See BUILD-GUIDE §2b. That is a live problem, not a rebuild task, and it should be raised with the client now.

## Before you write the rules

The table above covers every URL found in the live site's navigation and body links. It is very likely not the complete set — WordPress sites of this age typically carry orphaned pages, old blog posts, and attachment pages that are still indexed and still receiving traffic.

Do this first:

1. **Pull the current `sitemap.xml`** from `https://urbancustomsaz.com/sitemap.xml` (or `/wp-sitemap.xml`) and diff it against this table.
2. **Export Google Search Console** → Pages → all indexed URLs from the last 12 months.
3. **Crawl the live site** with Screaming Frog or similar to catch anything not in either list.
4. Any URL with real impressions that has no obvious match gets its own decision — do not blanket-redirect to `/`. Mass redirects to the homepage are treated as soft 404s and lose the equity anyway.

## Implementation

Static export on Netlify — `_redirects`:
```
/about/                          /#why-us                  301
/photo-gallery/                  /our-work/                301
/contact-style-1/                /contact/                 301
```

Vercel — `vercel.json`:
```json
{ "redirects": [
  { "source": "/about", "destination": "/#why-us", "permanent": true }
]}
```

Same-server WordPress replacement — `.htaccess`:
```apache
Redirect 301 /about/ https://urbancustomsaz.com/#why-us
```

## Verification

- [ ] Every row above returns `301` and lands on a `200`
- [ ] No redirect chains — old URL goes straight to final destination, never through a second hop
- [ ] Trailing-slash behavior is consistent sitewide
- [ ] `http://` and `www.` variants both resolve to the canonical `https://` non-www (or whichever the client currently uses — match it, do not change it during a rebuild)
- [ ] New `sitemap.xml` submitted to Search Console on launch day
- [ ] Search Console coverage report checked at 7 and 30 days post-launch for new 404s
