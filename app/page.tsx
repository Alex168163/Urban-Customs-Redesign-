import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import QuoteRail from "@/components/QuoteRail";
import GalleryGrid from "@/components/GalleryGrid";
import { SectionHead, Frame, TrustBar, ReviewCard } from "@/components/ui";
import { site } from "@/content/site";
import { homeServices, whyUs, trustPoints, offers } from "@/content/services";
import { gallery } from "@/content/gallery";
import { byName } from "@/content/reviews";
import { dim } from "@/content/image-dimensions";

export const metadata: Metadata = {
  title: "Flooring Contractors Phoenix, AZ | Urban Customs",
  description: `Urban Customs installs hardwood, tile, stone, and bamboo flooring and remodels kitchens across the Phoenix Valley. Family-run for ${site.yearsInBusiness} years. Call ${site.phone.display} for a free estimate.`,
  alternates: { canonical: "/" },
};

const recentWork = gallery.filter((p) =>
  [
    "/assets/staging/hardwood-flooring-by-urban-customs-in-az.jpg",
    "/assets/gallery/pic006-with-logo.jpg",
    "/assets/gallery/pic024-with-logo.jpg",
    "/assets/staging/living-room-stone-tile-flooring-by-urban-customs.jpg",
    "/assets/gallery/pic018-with-logo.jpg",
    "/assets/gallery/pic036-with-logo.jpg",
  ].includes(p.src),
);

const homeReviews = [byName("Eric B."), byName("Laurie S."), byName("Adam B.")];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={`Phoenix · Family-run since ${site.foundedYear}`}
        headline={
          <>
            Phoenix flooring and kitchen contractors, family-run for{" "}
            <span className="text-green-tint">{site.yearsInBusiness} years</span>.
          </>
        }
        subhead="Hardwood, tile, stone, bamboo, refinishing, and full kitchen remodels across the Valley of the Sun. Every install carries a transferable lifetime workmanship guarantee."
        image="/assets/images/interior-stone-installations-in-arizona.jpg"
        imageAlt="Stacked stone feature wall beside a floating hardwood staircase in an Arizona home"
        formLocation="home-hero"
      />

      <TrustBar points={trustPoints} />

      {/* ---------------------------------------------------------------- */}
      <section id="services" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          index="01"
          eyebrow="What we do"
          title="Three trades, one crew, one guarantee"
          lede="We install the floor, we come back to refinish it, and we remodel the kitchen it sits in. The same people run all three."
        />

        <div className="mt-10 grid gap-px bg-slate/35 lg:grid-cols-3">
          {homeServices.map((s) => (
            <article key={s.title} className="group flex flex-col bg-chalk">
              <Frame src={s.image.src} alt={s.image.alt} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm text-ink-soft">{s.body}</p>
                <Link href={s.href} className="link-rule mt-5 inline-flex w-fit items-center gap-2 text-sm">
                  {s.linkLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="specials" className="relative bg-ink text-chalk">
        <div className="absolute inset-0 planks opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <SectionHead
            index="02"
            eyebrow="Current specials"
            title="Offers running now"
            lede="Bring one of these to your estimate. Confirm expiry with us when we call."
            tone="dark"
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {offers.map((o) => (
              <li key={o.title} className="border hairline bg-ink/40">
                <Link href="/contact" className="group block">
                  <span className="relative block aspect-[2/1] overflow-hidden bg-walnut-deep">
                    <Image
                      src={o.image}
                      alt={o.alt}
                      width={dim(o.image).w}
                      height={dim(o.image).h}
                      sizes="(min-width: 640px) 33vw, 100vw"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="flex items-center justify-between gap-3 px-4 py-3 font-mono text-2xs uppercase tracking-[0.14em]">
                    {o.title}
                    <span className="text-green-tint" aria-hidden="true">
                      Claim →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Financing — removes the price objection before it forms. */}
          <div className="mt-6 flex flex-col gap-4 border hairline bg-walnut p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-bold">100% home improvement financing available.</p>
              <p className="mt-1 text-sm text-chalk/80">Apply in 60 seconds. Multiple options.</p>
            </div>
            <a
              href={site.financingUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-primary shrink-0 text-sm"
            >
              Check my options →
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="recent-work" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          index="03"
          eyebrow="Recent projects"
          title="Recent projects in the Valley"
          lede="Every photo on this site is our own work in a real Phoenix-area home."
        />
        <div className="mt-10">
          <GalleryGrid photos={recentWork} filterable={false} />
        </div>
        <Link href="/our-work" className="link-rule mt-8 inline-flex items-center gap-2">
          See the full gallery <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="reviews" className="border-y hairline bg-chalk-deep tile-grid">
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <SectionHead index="04" eyebrow="Reviews" title="What our customers say" />
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {homeReviews.map((r) => (
              <li key={r.name}>
                <ReviewCard name={r.name} quote={r.quote} />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={site.reviewsUrl} target="_blank" rel="noopener" className="btn btn-ghost text-sm">
              Read our Google reviews
            </a>
            <Link href="/our-work#reviews" className="link-rule text-sm">
              All ten reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="why-us" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          index="05"
          eyebrow="Why Urban Customs"
          title="Why homeowners pick Urban Customs"
          lede={`Two decades of family tradition in Phoenix home improvement. ${site.roc}.`}
        />
        <div className="mt-10 grid gap-px bg-slate/35 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <article key={w.title} className="bg-chalk p-6">
              <p className="font-mono text-2xs tracking-[0.16em] text-green">0{i + 1}</p>
              <h3 className="mt-3 text-lg">{w.title}</h3>
              <p className="mt-3 text-sm text-ink-soft">{w.body}</p>
            </article>
          ))}
        </div>
      </section>

      <QuoteRail
        heading="Ready for a new floor?"
        body={`Get a free, no-pressure estimate. Call ${site.phone.display}, text ${site.text.display}, or send the form.`}
        location="home-quote-rail"
      />
    </>
  );
}
