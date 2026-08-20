import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** /thank-you is deliberately absent — it is noindex and a conversion target. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1.0 },
    { path: "/flooring", priority: 0.9 },
    { path: "/kitchens", priority: 0.9 },
    { path: "/our-work", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
  ];

  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    changeFrequency: "monthly" as const,
    priority: p.priority,
  }));
}
