import Link from "next/link";
import type { Metadata } from "next";
import { Frame } from "@/components/ui";
import { site } from "@/content/site";

/** Conversion tracking target. Never indexed. */
export const metadata: Metadata = {
  title: "Thanks — we have your request",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="relative bg-ink text-chalk">
      <div className="absolute inset-0 planks opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="lg:self-center">
          <p className="eyebrow text-green-tint">Request received</p>
          <h1 className="mt-4 text-3xl sm:text-4xl">Thanks — we have your request.</h1>
          <p className="mt-6 max-w-xl text-chalk/85">
            A member of our team will get back to you shortly. For anything urgent, call{" "}
            <a href={site.phone.href} data-analytics="tel" className="font-mono text-white underline">
              {site.phone.display}
            </a>{" "}
            and we will pick up during business hours.
          </p>
          <p className="mt-4 max-w-xl text-chalk/85">
            While you wait, take a look at recent projects across the Valley.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/our-work" className="btn btn-primary text-sm">
              See our work
            </Link>
            <a href={site.text.href} data-analytics="sms" className="btn btn-ghost text-sm">
              Text us at {site.text.display}
            </a>
          </div>

          <p className="mt-10 border-t hairline pt-5 font-mono text-2xs uppercase tracking-[0.14em] text-chalk/80">
            {site.roc} · {site.hours.weekday}
          </p>
        </div>

        <Frame
          src="/assets/staging/urban-customs-floor-designs-and-installations-img-04.jpg"
          alt="Hexagon stone tile woven into an existing hardwood floor in a defined random pattern"
          ratio="aspect-[4/3]"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>
    </section>
  );
}
