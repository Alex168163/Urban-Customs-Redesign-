import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { nav, site } from "@/content/site";

/** Even a 404 carries a form. No page is a dead end. */
export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_420px] lg:gap-16">
        <div>
          <p className="eyebrow text-slate">Error 404</p>
          <h1 className="mt-4 text-3xl sm:text-4xl">That page has moved.</h1>
          <p className="mt-5 max-w-xl text-ink-soft">
            We rebuilt this site down to five pages, so a few old links land here. Everything is one of
            these, or call {site.phone.display} and we will point you at it.
          </p>

          <ul className="mt-8 border-t hairline">
            {nav.map((item) => (
              <li key={item.href} className="border-b hairline">
                <Link href={item.href} className="flex items-center justify-between py-4 font-display text-lg hover:text-green">
                  {item.label}
                  <span aria-hidden="true" className="font-mono text-sm text-green">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <LeadForm variant="hero" location="404" heading="Get a free estimate" />
      </div>
    </section>
  );
}
