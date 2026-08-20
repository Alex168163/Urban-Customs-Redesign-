# Urban Customs — Lead Generation Rebuild Package

Everything needed to rebuild https://urbancustomsaz.com/ as a simpler, lead-focused site.

## Start here

```
BUILD-GUIDE.md              ← read this first, top to bottom
content/COPY-DECK.md        ← all site copy, plus the "if" rewrite table
content/REDIRECT-MAP.md     ← 301s from the old URLs
assets/ASSET-MANIFEST.md    ← every image, where it came from, where it goes
assets/fetch-assets.sh      ← downloads the assets
assets/asset-urls.txt       ← plain URL list, wget fallback
```

## Get the assets first

```bash
cd assets
chmod +x fetch-assets.sh
./fetch-assets.sh
```

Downloads into `logos/ banners/ images/ icons/ badges/ coupons/ gallery/ kitchen/` and writes `fetch-report.txt` with anything that failed.

**The assets are not pre-downloaded.** The environment that built this package is network-restricted and blocked from `urbancustomsaz.com` (`403 host_not_allowed`). Every URL was read off the live rendered HTML and recorded exactly, so the script should pull them cleanly from any machine with open internet access.

## The mandate in three lines

1. **A lead form on every page.** No page is a dead end.
2. **The homepage captures the lead.** Form in the hero, above the fold, no second click.
3. **No conditional "if" openers.** The client has rejected them. There is a grep check in BUILD-GUIDE §10 that must return zero.

## The shape of the change

25 pages → 6. Home, Flooring, Kitchens, Our Work, Contact, Thank You. Everything else is absorbed as a section or redirected.

## Two source sites

This package draws on both:

1. **`urbancustomsaz.com`** — the live site
2. **`webtechs-designs.com/UrbanCustoms/`** — the agency's unreleased redesign

The staging site is worth mining: it confirms the **brand green `#127B00`**, resolves the address conflict, adds four services the live site never mentions, and carries ten stronger testimonials plus the best piece of copy either site has. But its architecture fixes none of the client's complaints — still no form, still six dropdown menus, still the "If you are searching…" paragraph. **Take its content, throw away its structure.** Full breakdown in BUILD-GUIDE §2b.

## Raise with the client before launch

1. **Confirm the McDowell address.** Staging uses `1718 E. McDowell Rd. Unit 18, Phoenix, AZ 85006` consistently, which likely resolves the live site's conflict — but get it said out loud.
2. **Are laminate, vinyl plank, floor sanding, and hardwood restoration actually offered?** They appear only on the unpublished staging site.
3. **Are the 2019 cost figures still accurate?** They are published as current pricing.
4. **Are the three 2026 coupons live, and when do they expire?**
5. **Is the HelloRates financing partnership still active?**

## Two things that are urgent and separate from the rebuild

**The staging site is indexable.** It is set to `index, follow`, self-canonicalizes, and is a near-complete duplicate of the client's site — so it can compete with `urbancustomsaz.com` in search for the client's own terms. Verify current status, then get it `noindex`ed or behind auth. This does not wait for the rebuild.

**Form submissions should fire an SMS or push alert**, not just an email. Response speed is the largest single driver of close rate in home services, and it costs almost nothing to add.
