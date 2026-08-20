import Image from "next/image";
import LeadForm from "./LeadForm";
import { dim } from "@/content/image-dimensions";
import { site } from "@/content/site";

/**
 * One still image, one headline, one form. No slider — sliders suppress
 * conversion and wreck LCP.
 *
 * Mobile order is headline → form → supporting prose, so the first screen on
 * a phone is the headline and the first form field.
 */
export default function Hero({
  eyebrow,
  headline,
  subhead,
  image,
  imageAlt,
  formLocation,
  formHeading = "Get a free estimate",
  defaultProjectType,
  footnote,
}: {
  eyebrow: string;
  headline: React.ReactNode;
  subhead: string;
  image: string;
  imageAlt: string;
  formLocation: string;
  formHeading?: string;
  defaultProjectType?: string;
  footnote?: string;
}) {
  const d = dim(image);
  return (
    <section className="relative isolate overflow-hidden bg-ink text-chalk">
      <Image
        src={image}
        alt={imageAlt}
        width={d.w}
        height={d.h}
        priority
        fetchPriority="high"
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* Ink overlay heavy enough that white type clears WCAG AA everywhere,
          light enough that the photograph still reads as a photograph. */}
      <div
        className="absolute inset-0 -z-10 bg-ink/62 lg:bg-gradient-to-r lg:from-ink/82 lg:via-ink/55 lg:to-ink/25"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 planks opacity-30" aria-hidden="true" />

      <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 lg:grid-cols-[1.15fr_420px] lg:gap-14 lg:py-24">
        <div className="order-1 lg:order-1 lg:self-center">
          <p className="eyebrow text-green-tint">{eyebrow}</p>
          <h1 className="mt-3 text-xl text-white sm:mt-4 sm:text-3xl lg:text-4xl">{headline}</h1>
        </div>

        {/* Form comes before the prose on mobile — above the fold, no scroll. */}
        <div className="order-2 lg:order-2 lg:row-span-2 lg:self-center">
          <LeadForm
            variant="hero"
            location={formLocation}
            heading={formHeading}
            defaultProjectType={defaultProjectType}
            className="shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]"
          />
        </div>

        <div className="order-3 lg:order-3 lg:-mt-4 lg:max-w-xl">
          <p className="text-chalk/85">{subhead}</p>
          <p className="mt-6 border-t hairline pt-4 font-mono text-2xs uppercase tracking-[0.14em] text-chalk/70">
            {footnote ?? `${site.roc} · ${site.yearsInBusiness} years · Lifetime workmanship guarantee`}
          </p>
        </div>
      </div>
    </section>
  );
}
