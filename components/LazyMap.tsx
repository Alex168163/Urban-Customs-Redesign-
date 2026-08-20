"use client";

import { useState } from "react";
import { site, addressLine } from "@/content/site";

/**
 * An eager map iframe is often the single heaviest thing on a contractor
 * site, so nothing loads until someone asks for it.
 */
export default function LazyMap() {
  const [loaded, setLoaded] = useState(false);
  const query = encodeURIComponent(`${site.name}, ${addressLine}`);

  return (
    <div className="border hairline">
      <div className="relative aspect-[4/3] bg-chalk-deep tile-grid">
        {loaded ? (
          <iframe
            title={`Map to ${site.name}, ${addressLine}`}
            src={`https://maps.google.com/maps?q=${query}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="font-mono text-2xs uppercase tracking-[0.14em] text-ink-soft">{addressLine}</p>
            <button type="button" onClick={() => setLoaded(true)} className="btn btn-ghost text-sm">
              Load the map
            </button>
            <a
              href={`https://maps.google.com/?q=${query}`}
              target="_blank"
              rel="noopener"
              className="link-rule text-xs"
            >
              Or open directions in Google Maps →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
