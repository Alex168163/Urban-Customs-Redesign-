# Asset Manifest

Every asset URL below was read directly off the live rendered HTML at `urbancustomsaz.com` and is recorded exactly as found. Base path for all of them:

```
https://urbancustomsaz.com/wp-content/uploads/
```

**Files are not pre-downloaded.** The environment that produced this manifest is network-restricted and blocked from that domain (`403 host_not_allowed`). Run `./fetch-assets.sh` to pull everything.

**Confidence key**
- ✅ **Verified** — the exact URL appeared in rendered HTML
- 🔍 **Probe** — filename known, folder inferred; the script tests candidate folders and reports results

---

## Logos → `logos/`  ✅

| File | Source path | Use |
|---|---|---|
| `urban-customs-new-logo-1200px.png` | `2024/12/` | Primary logo, retina header |
| `urban-customs-new-logo-600px.png` | `2024/12/` | Primary logo, standard header |
| `urban-customs-white-logo.png` | `2024/12/` | Reversed logo for dark bands and the Quote Rail |
| `urban-customs-square-logo-800px.png` | `2024/12/` | Footer mark, favicon source, social/OG image |

**Sample the brand hex values from `urban-customs-new-logo-1200px.png` and use them as the palette source of truth.** They override the proposed tokens in BUILD-GUIDE §6.

---

## Banners → `banners/`  ✅

The four rotating slider frames from the current homepage. **The rebuild does not use a slider** — pick the strongest single frame for any page hero that needs one and archive the rest.

| File | Source path | Original slide text |
|---|---|---|
| `floor-repair-slider.jpg` | `2023/08/` | Custom Flooring Repair Services |
| `floor-refinishing-slider.jpg` | `2023/08/` | Custom Floor Refinishing Services |
| `cabinet-installation-slider.jpg` | `2023/08/` | Custom Cabinet Installation Services |
| `kitchen-remodeling-slider-02.jpg` | `2024/04/` | Custom Kitchen Remodeling Services |

Suggested: `kitchen-remodeling-slider-02.jpg` → `/kitchens/` hero. `floor-refinishing-slider.jpg` → `/flooring/` hero.

---

## Images → `images/`  ✅

| File | Source path | Use |
|---|---|---|
| `interior-stone-installations-in-arizona.jpg` | `2024/05/` | **Homepage hero.** Preload as LCP element. |
| `phoenix-flooring-installations-before-image.jpg` | `2024/06/` | Before/during/after triptych, `/flooring/#installation` |
| `phoenix-flooring-installations-during-image.jpg` | `2024/06/` | ″ |
| `phoenix-flooring-installations-after-image.jpg` | `2024/06/` | ″ |
| `pic035-with-logo.jpg` | `2019/09/` | Hardwood section image |
| `pic007-with-logo.jpg` | `2019/09/` | Stone & tile section image |
| `pic036-with-logo.jpg` | `2019/09/` | Bamboo section image |
| `Hardwood-Floor-Refinishing-Phoenix-AZ.jpg` | `2019/09/` | Refinishing section image |

Note the capitalized filename on the last one — it is exact.

---

## Icons → `icons/`  ✅

| File | Source path | Use |
|---|---|---|
| `design-150x150.png` | `2019/09/` | Design service icon |
| `installation-icon-150x150.png` | `2019/09/` | Installation service icon |
| `warranty-150x150.png` | `2019/09/` | Warranty service icon |
| `check-mark-icon-150x150.png` | `2019/09/` | Bullet mark on feature lists |

These are 150×150 WordPress thumbnail crops. The script also tries the full-size original (same name without the `-150x150` suffix) since the crops may be too small for retina. **Consider replacing all four with inline SVG** — they are small decorative marks, and SVG removes four HTTP requests and scales cleanly.

---

## Badges → `badges/`  ✅

| File | Source path | Use |
|---|---|---|
| `Urban-Customs-Google-Button.png` | `2019/09/` | Google reviews button. Links to the company's Google reviews. |
| `169358-967-2.png` | `2025/10/` | Financing badge. Links offsite to `hellorates.com/financing/urban-customs/`. Confirm the partnership is still active before rebuilding it. |

---

## Coupons → `coupons/`  ✅

Three 2026 specials from `/current-specials/`. Each image links to a PDF hosted on `webtechs-designs.com` (the client's agency staging domain).

| File | Source path | Links to PDF |
|---|---|---|
| `urban-customs-design-coupon-2026-1024x512.jpg` | `2026/07/` | `urban-customs-design-page-2026.pdf` |
| `urban-customs-installation-coupon-2026-1024x512.jpg` | `2026/07/` | `urban-customs-installation-page-2026.pdf` |
| `urban-customs-free-shipping-coupon-2026-1024x512.jpg` | `2026/07/` | `urban-customs-free-shipping-page-2026.pdf` |

The `-1024x512` suffix is a WordPress resize. The script tries the full-size original first and falls back to the sized version.

**Two things to raise with the client:**
1. Confirm these three offers are current and get their expiry dates. Expired coupons on a live page destroy trust.
2. The PDFs live on the agency's staging domain, not the client's own. Host them on the client's domain in the rebuild so they survive any agency change.

---

## Gallery → `gallery/`  🔍

The `/photo-gallery/` page lazy-loads 39 images with titles `pic001-with-logo` through `pic039-with-logo` (029 and 034 are absent from the list). Three of these were confirmed at full URLs on other pages:

```
2019/09/pic007-with-logo.jpg   ✅
2019/09/pic035-with-logo.jpg   ✅
2019/09/pic036-with-logo.jpg   ✅
```

All three sit in `2019/09/`, so the script iterates the full range against that folder. Expect a small number of misses — some may be `.png` or sit in a neighboring month. The script tries both extensions and reports failures.

The gallery also lists three refinishing photos whose filenames were **not** exposed: titled "Wood Floor Refinishing", "Hardwood Floor Refinishing", and "Hardwood Floor Refinishing 2". The script probes slugified guesses. Request these from the client if they do not resolve.

---

## Kitchen gallery → `kitchen/`  🔍

`/kitchen-remodeling/` lazy-loads 10 images titled `arizona-kitchen-remodeling-by-urban-customs-img-001` through `-img-010`. The upload folder was not exposed in the rendered HTML. The script probes `2024/04/`, `2024/08/`, `2024/05/`, `2024/06/`, `2023/08/`, and `2019/09/`, and on a hit uses that folder for all ten.

---

## Staging site assets → `staging/`  ✅ / 🔍

Second source: the agency's unreleased redesign at `https://webtechs-designs.com/UrbanCustoms/wp-content/uploads/`. These are newer than the live site's equivalents and generally better.

**Verified**

| File | Source path | Use |
|---|---|---|
| `urban-customs-white-logo-300px.png` | `2026/01/` | Newest reversed logo. **Sample brand green from this.** |
| `urban-customs-favicon-300x300.png` | `2026/01/` | Favicon source — generate the full icon set from it |
| `urban-customs-floor-designs-and-installations-img-01.jpg` | `2026/02/` | Custom-design case study, `/flooring/#custom-design` |
| `urban-customs-floor-designs-and-installations-img-02.jpg` | `2026/02/` | ″ |
| `urban-customs-floor-designs-and-installations-img-03.jpg` | `2026/02/` | ″ |
| `urban-customs-floor-designs-and-installations-img-04.jpg` | `2026/02/` | ″ |

**Probe** — slider frames titled `custom-flooring-slider`, `flooring-restoration-slider`, and `kitchen-cabinet-slider` are lazy-loaded and their paths were not exposed. The script probes `2026/01`, `2026/02`, `2026/03`, `2025/12`. The rebuild has no slider, so these are only useful as page hero stills — low priority if they miss.

**Also worth pulling manually:** the six room-type images on `/services/` (Master Bath, Shower Stall, Guest Bathroom, Living Room, Kitchen Area, Outdoor Patio). All lazy-loaded with no exposed filenames. They map exactly to the gallery filter taxonomy in BUILD-GUIDE §7.4, so they are worth requesting from the client directly.

**Before using anything from this domain:** it is the agency's staging server, not the client's property. Confirm the client owns these assets and has the right to move them. The coupon PDFs are already hosted there, which is itself a dependency worth removing.

---

## Not downloadable

| Asset | Why | What to do |
|---|---|---|
| Google Map embed | Third-party iframe | Rebuild with the place ID for Urban Customs. Lazy-load it. |
| Google reviews content | Live API data | Use the Google Places API for live reviews, or keep the static button. Never hardcode a rating figure. |
| Coupon PDFs | Hosted on the agency staging domain | Get originals from the client; host on the client's own domain |
| Favicon set | Not exposed | Generate from `urban-customs-square-logo-800px.png` |

---

## After downloading

1. **Check `fetch-report.txt`** for failures. Request anything missing from the client — they will have higher-resolution originals than these web copies, which is the better source anyway.
2. **Confirm image rights** with the client before publishing. The watermarked gallery photos appear to be their own work; confirm rather than assume.
3. **Convert to WebP** with JPG fallback. These are unoptimized WordPress uploads and several are large.
4. **Generate responsive sizes** — 480 / 768 / 1200 / 1920 — and serve via `srcset`.
5. **Write real alt text.** The current site ships most images with empty alt attributes. Describe the actual work: "Refinished oak flooring in a Phoenix living room." Alt text is both an accessibility requirement and a live image-search ranking factor.
6. **Rename to kebab-case** on the way into `/public/assets/`. `pic007-with-logo.jpg` tells nobody anything — `travertine-tile-entryway-phoenix.jpg` does.
