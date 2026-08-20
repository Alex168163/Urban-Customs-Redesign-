import Link from "next/link";
import { site } from "@/content/site";

/** Mobile only. Persists on scroll so no screen is ever a dead end. */
export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t hairline bg-ink/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-3">
        <a
          href={site.phone.href}
          data-analytics="tel"
          className="flex h-14 items-center justify-center gap-2 font-display text-sm font-bold text-chalk"
        >
          Call
        </a>
        <a
          href={site.text.href}
          data-analytics="sms"
          className="flex h-14 items-center justify-center gap-2 border-x hairline font-display text-sm font-bold text-chalk"
        >
          Text
        </a>
        <Link
          href="/contact"
          className="flex h-14 items-center justify-center bg-green font-display text-sm font-bold text-white"
        >
          Free estimate
        </Link>
      </div>
    </div>
  );
}
