import type { Metadata } from "next";
import Hero from "@/components/Hero";
import QuoteRail from "@/components/QuoteRail";
import GalleryGrid from "@/components/GalleryGrid";
import { SectionHead, ReviewCard } from "@/components/ui";
import { site } from "@/content/site";
import { gallery } from "@/content/gallery";
import { reviews } from "@/content/reviews";

export const metadata: Metadata = {
  title: "Flooring & Kitchen Project Gallery",
  description: `Floors, refinishing, and kitchens Urban Customs has completed for Phoenix-area homeowners. Filter by room. Call ${site.phone.display} for a free estimate.`,
  alternates: { canonical: "/our-work" },
};

export default function OurWorkPage() {
  return (
    <>
      <Hero
        eyebrow="Our work"
        headline="Our work across the Valley"
        subhead="Floors, refinishing, and kitchens we have completed for Phoenix-area homeowners. Filter the gallery by room — that is how people actually picture their own house."
        image="/assets/staging/living-room-stone-tile-flooring-by-urban-customs.jpg"
        imageAlt="Polished stone tile floor stepping down into a sunken living room"
        formLocation="our-work-hero"
        formHeading="Get a free estimate"
      />

      <section id="gallery" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
        <SectionHead
          index="01"
          eyebrow="Gallery"
          title="Browse by room"
          lede={`${gallery.length} projects across living rooms, kitchens, baths, showers, and patios.`}
        />
        <div className="mt-10">
          <GalleryGrid photos={gallery} />
        </div>
      </section>

      {/* Proof and evidence sit together — reviews interleave with the grid. */}
      <section id="reviews" className="border-y hairline bg-chalk-deep tile-grid">
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <SectionHead
            index="02"
            eyebrow="Reviews"
            title="What our customers say"
            lede="Ten reviews, reproduced word for word. Several name the people who did the work."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.name}>
                <ReviewCard name={r.name} quote={r.quote} />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a href={site.reviewsUrl} target="_blank" rel="noopener" className="btn btn-ghost text-sm">
              Read our Google reviews
            </a>
          </div>
        </div>
      </section>

      <QuoteRail
        heading="Want a floor like one of these?"
        body={`Send the form with the room you have in mind, or call ${site.phone.display} and describe it to us.`}
        location="our-work-quote-rail"
      />
    </>
  );
}
