import type { Metadata } from "next";
import Hero from "@/components/Hero";
import QuoteRail from "@/components/QuoteRail";
import GalleryGrid from "@/components/GalleryGrid";
import FaqAccordion, { faqSchema } from "@/components/FaqAccordion";
import { SectionHead, Frame, ReviewCard } from "@/components/ui";
import { site } from "@/content/site";
import { kitchenServices, kitchenProcess } from "@/content/services";
import { kitchenFaqs } from "@/content/faqs";
import { kitchenGallery } from "@/content/gallery";
import { byName } from "@/content/reviews";

export const metadata: Metadata = {
  title: "Kitchen Remodeling Phoenix, AZ",
  description: `Urban Customs remodels kitchens across the Phoenix Valley — cabinets, countertops, tile, and full redesigns. Call ${site.phone.display} for a free remodeling estimate.`,
  alternates: { canonical: "/kitchens" },
};

const kitchenReviews = [byName("Sandy S."), byName("Dallas L.")];

export default function KitchensPage() {
  return (
    <>
      <Hero
        eyebrow="Kitchens & cabinets"
        headline="Kitchen remodeling in Phoenix, Arizona"
        subhead={`Cabinets, countertops, tile, and full kitchen redesigns across the Valley. Call ${site.phone.display} for a free remodeling estimate.`}
        image="/assets/staging/professional-flooring-contractors-in-az.jpg"
        imageAlt="Contemporary kitchen with a dark island, stone counters and continuous tile flooring"
        formLocation="kitchens-hero"
        formHeading="Get a free kitchen estimate"
        defaultProjectType="Kitchen Remodeling"
      />

      <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          index="01"
          eyebrow="What we do"
          title="Design, cabinets, and the whole remodel"
          lede="One team plans the room, orders the parts, and does the work — so nothing gets lost between trades."
        />

        <div className="mt-10 grid gap-px bg-slate/35 lg:grid-cols-3" id="cabinets">
          {kitchenServices.map((s) => (
            <article key={s.title} className="flex flex-col bg-chalk">
              <Frame src={s.image.src} alt={s.image.alt} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg">{s.title}</h3>
                <p className="mt-3 text-sm text-ink-soft">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* A genuinely sequential process, so the numbers are doing real work. */}
      <section id="process" className="relative bg-ink text-chalk">
        <div className="absolute inset-0 planks opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <SectionHead
            index="02"
            eyebrow="Process"
            title="Four steps, in this order"
            lede="Work starts once every piece is on site and correct. That is how we hold to a schedule."
            tone="dark"
          />
          <ol className="mt-10 grid gap-px bg-chalk/20 sm:grid-cols-2 lg:grid-cols-4">
            {kitchenProcess.map((step) => (
              <li key={step.step} className="bg-ink p-6">
                <p className="font-mono text-2xl text-green">{step.step}</p>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-3 text-sm text-chalk/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          index="03"
          eyebrow="Kitchen projects"
          title="Kitchens we have finished in the Valley"
          lede="Cabinet runs, islands, backsplashes, and counters — all our own work."
        />
        <div className="mt-10">
          <GalleryGrid photos={kitchenGallery} filterable={false} />
        </div>
      </section>

      <section id="reviews" className="border-y hairline bg-chalk-deep tile-grid">
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <SectionHead index="04" eyebrow="Reviews" title="Homeowners on our remodels" />
          <ul className="mt-10 grid gap-4 lg:grid-cols-2">
            {kitchenReviews.map((r) => (
              <li key={r.name}>
                <ReviewCard name={r.name} quote={r.quote} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
        <SectionHead index="05" eyebrow="FAQ" title="Questions we get asked" />
        <FaqAccordion faqs={kitchenFaqs} />
      </section>

      <QuoteRail
        heading="Get a free kitchen estimate."
        body={`Call ${site.phone.display} or send the form.`}
        location="kitchens-quote-rail"
        defaultProjectType="Kitchen Remodeling"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(kitchenFaqs)) }}
      />
    </>
  );
}
