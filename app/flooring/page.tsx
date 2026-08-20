import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import QuoteRail from "@/components/QuoteRail";
import FaqAccordion, { faqSchema } from "@/components/FaqAccordion";
import { SectionHead, Frame, ReviewCard, SpecTable } from "@/components/ui";
import { site } from "@/content/site";
import { flooringSections } from "@/content/services";
import { flooringFaqs } from "@/content/faqs";
import { caseStudyImages } from "@/content/gallery";
import { byName } from "@/content/reviews";

export const metadata: Metadata = {
  title: "Flooring Installation & Refinishing Phoenix",
  description: `Urban Customs is a licensed flooring contractor serving Phoenix, Glendale, Peoria, Surprise, Gilbert, and the wider Valley. Installation, refinishing, and repair. ${site.roc}. Call ${site.phone.display}.`,
  alternates: { canonical: "/flooring" },
};

const jumpLinks = [
  { href: "#installation", label: "Installation" },
  { href: "#custom-design", label: "Custom design" },
  { href: "#hardwood", label: "Hardwood" },
  { href: "#stone", label: "Stone & tile" },
  { href: "#bamboo", label: "Bamboo" },
  { href: "#laminate", label: "Laminate" },
  { href: "#vinyl-plank", label: "Vinyl plank" },
  { href: "#refinishing", label: "Refinishing" },
  { href: "#sanding", label: "Sanding" },
  { href: "#repair", label: "Repair" },
  { href: "#warranty", label: "Warranty" },
  { href: "#faq", label: "FAQ" },
];

/** Reviews placed beside the section they actually prove. */
const sectionReview: Record<string, string> = {
  refinishing: "Adam B.",
  "vinyl-plank": "Haylee H.",
  stone: "Amber B.",
  repair: "Adam B.",
};

export default function FlooringPage() {
  return (
    <>
      <Hero
        eyebrow="Flooring"
        headline="Flooring installation, refinishing, and repair in Phoenix"
        subhead={`Urban Customs is a licensed flooring contractor serving Phoenix, Glendale, Peoria, Surprise, Gilbert, and the wider Valley. ${site.roc}.`}
        image="/assets/staging/stone-flooring-installations-in-arizona.jpg"
        imageAlt="Stacked stone wall beside a hardwood and steel staircase in a Phoenix home"
        formLocation="flooring-hero"
        formHeading="Get a free flooring estimate"
        defaultProjectType="Floor Installation"
      />

      {/* Anchor rail — replaces ten pages of dropdown menu. */}
      <nav aria-label="Sections on this page" className="border-b hairline bg-chalk-deep">
        <ul className="mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-4 py-3 sm:px-6">
          {jumpLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-block whitespace-nowrap border hairline px-3 py-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Custom design case study — the strongest proof either site has, high
          on the page, directly under the installation intro. */}
      <Section section={flooringSections[0]} index="01" />

      <section id="custom-design" className="relative bg-walnut-deep text-chalk">
        <div className="absolute inset-0 grain planks opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            index="02"
            eyebrow="Custom design"
            title="We design around problems other contractors replace."
            tone="dark"
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div className="max-w-xl space-y-4 text-chalk/85">
              <p>
                A line leak behind a refrigerator damaged a section of wood floor. The style had been
                discontinued, and the homeowner wanted to keep it. Replacing the whole floor meant 2,700
                square feet.
              </p>
              <p>
                Instead we laid a defined random pattern of tile through the damaged area with stone accent
                pieces water-jet cut to match the tile dimensions, then wove the original wood back into it.
                The repair reads as a design feature. The homeowner kept the floor they wanted and did not
                replace 2,700 feet of it.
              </p>
              <dl className="grid grid-cols-2 gap-px border hairline bg-chalk/20 !mt-8">
                <div className="bg-walnut-deep px-5 py-4">
                  <dt className="eyebrow text-chalk/80">Floor saved</dt>
                  <dd className="mt-1 font-mono text-xl text-white">2,700 ft²</dd>
                </div>
                <div className="bg-walnut-deep px-5 py-4">
                  <dt className="eyebrow text-chalk/80">Replaced</dt>
                  <dd className="mt-1 font-mono text-xl text-white">0 ft²</dd>
                </div>
              </dl>
            </div>

            <ol className="grid grid-cols-2 gap-2 sm:gap-3">
              {caseStudyImages.map((img, i) => (
                <li key={img.src}>
                  <Frame
                    src={img.src}
                    alt={img.alt}
                    ratio="aspect-[4/3]"
                    sizes="(min-width: 1024px) 28vw, 50vw"
                  />
                  <p className="mt-2 font-mono text-2xs uppercase tracking-[0.12em] text-chalk/80">
                    0{i + 1} — {["Opened up", "Pattern set", "Woven in", "Finished"][i]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {flooringSections.slice(1).map((s, i) => (
        <Section
          key={s.id}
          section={s}
          index={String(i + 3).padStart(2, "0")}
          flip={i % 2 === 1}
          reviewName={sectionReview[s.id]}
        />
      ))}

      <section id="faq" className="border-t hairline bg-chalk-deep tile-grid">
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <SectionHead index="13" eyebrow="FAQ" title="Questions we get asked" />
          <FaqAccordion faqs={flooringFaqs} />
        </div>
      </section>

      <QuoteRail
        heading="Get a free flooring estimate."
        body={`Call ${site.phone.display} or send the form and we will get back to you.`}
        location="flooring-quote-rail"
        defaultProjectType="Floor Installation"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(flooringFaqs)) }}
      />
    </>
  );
}

function Section({
  section,
  index,
  flip = false,
  reviewName,
}: {
  section: (typeof flooringSections)[number];
  index: string;
  flip?: boolean;
  reviewName?: string;
}) {
  const review = reviewName ? byName(reviewName) : null;

  return (
    <section id={section.id} className="border-t hairline">
      <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:py-20">
        <div className={`grid gap-10 lg:grid-cols-2 lg:gap-14 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <SectionHead index={index} eyebrow={section.eyebrow} title={section.title} className="border-t-0 pt-0" />
            <div className="mt-5 space-y-4 text-ink-soft">
              {section.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {section.specs && <SpecTable rows={section.specs} />}

            {section.unconfirmed && (
              <p className="mt-6 border-l-2 border-green bg-green-tint px-4 py-3 text-xs text-ink-soft">
                <strong className="font-semibold">Confirm before launch.</strong> This service appears only on
                the agency&rsquo;s unpublished redesign. Verify with the client that it is an active service
                line, then delete this note.
              </p>
            )}

            {review && (
              <div className="mt-8">
                <ReviewCard name={review.name} quote={review.quote} />
              </div>
            )}

            {section.id === "warranty" && (
              <Link href="/contact" className="btn btn-ghost mt-8 text-sm">
                Talk to us about your floor
              </Link>
            )}
          </div>

          {section.image && (
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Frame
                src={section.image.src}
                alt={section.image.alt}
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
