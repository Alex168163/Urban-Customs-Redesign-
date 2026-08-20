"use client";

import { useEffect } from "react";

/**
 * On a contractor site calls usually outnumber form fills, so tel: and sms:
 * taps are tracked as conversions alongside generate_lead.
 *
 * One delegated listener covers every phone and text link on the site —
 * header, footer, Quote Rail, sticky bar — with no per-link wiring.
 */
export default function ConversionTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a[href^='tel:'], a[href^='sms:']");
      if (!(link instanceof HTMLAnchorElement)) return;

      const isCall = link.href.startsWith("tel:");
      window.gtag?.("event", isCall ? "click_to_call" : "click_to_text", {
        link_url: link.href,
        placement: link.dataset.analytics ?? "unknown",
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
