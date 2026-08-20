/**
 * 301 map from docs/REDIRECT-MAP.md.
 *
 * Collapsing ~25 pages into 6 means most existing URLs disappear. Every one
 * of them 301s to its closest new equivalent — no chains, and nothing
 * blanket-redirected to the homepage (Google treats that as a soft 404 and
 * the equity is lost anyway).
 *
 * Two details that matter and are easy to get wrong:
 *
 *   - Destinations carry the trailing slash. The site runs trailingSlash:true
 *     to match the old WordPress URL shape, so a destination of `/our-work`
 *     would 301 and then 308 again to `/our-work/` — a chain.
 *   - statusCode 301, not `permanent: true`. Next emits 308 for `permanent`,
 *     which search engines honour, but the handoff spec asks for 301 and
 *     there is no reason to hand over something that has to be explained.
 *
 * Before launch, diff this against the live sitemap.xml and a 12-month Search
 * Console export. This table covers every URL found in the old navigation and
 * body links, which is very likely not the complete set.
 */
export type Redirect = { source: string; destination: string; statusCode: 301 };

const map: [string, string][] = [
  // --- live site ---
  ["/about", "/#why-us"],
  ["/current-specials", "/#specials"],
  ["/photo-gallery", "/our-work/"],
  ["/careers", "/contact/"],
  ["/our-team", "/our-work/#reviews"],
  ["/faqs", "/flooring/#faq"],
  ["/phoenix-flooring-installation", "/flooring/"],
  ["/projects", "/flooring/"],
  ["/projects/floors", "/flooring/#hardwood"],
  ["/stone-flooring-contractors-phoenix", "/flooring/#stone"],
  ["/projects/bamboo-flooring", "/flooring/#bamboo"],
  ["/services", "/flooring/"],
  ["/hardwood-floor-refinishing", "/flooring/#refinishing"],
  ["/refinishing", "/flooring/#repair"],
  ["/kitchen-remodeling", "/kitchens/"],
  ["/kitchen-remodeling/cabinet-options", "/kitchens/#cabinets"],
  ["/contact-style-1", "/contact/"],
  ["/services/design-and-build", "/flooring/#installation"],
  ["/services/warranty", "/flooring/#warranty"],
  ["/flooring-contractors-phoenix", "/flooring/"],
  ["/flooring-contractors-gilbert", "/flooring/"],
  ["/glendale-flooring-contractors", "/flooring/"],
  ["/flooring-contractors-peoria", "/flooring/"],
  ["/tile-installation-phoenix-cost", "/flooring/#stone"],
  ["/slate-stone-flooring-phoenix", "/flooring/#stone"],
  ["/flooring-installation-cost-per-sq-ft", "/flooring/#faq"],

  // --- agency staging URLs, in case that build ships before this one ---
  ["/projects/laminate-flooring", "/flooring/#laminate"],
  ["/projects/luxury-vinyl-plank-flooring", "/flooring/#vinyl-plank"],
  ["/hardwood-floor-refinishing/wood-floor-sanding-arizona", "/flooring/#sanding"],
  ["/hardwood-restoration", "/flooring/#repair"],
  ["/testimonials", "/our-work/#reviews"],
];

export const redirects: Redirect[] = map.map(([source, destination]) => ({
  source,
  destination,
  statusCode: 301,
}));
