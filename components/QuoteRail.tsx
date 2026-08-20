import LeadForm from "./LeadForm";
import { site } from "@/content/site";

/**
 * The Quote Rail — the signature element, and Rule 1's delivery mechanism.
 *
 * A full-width walnut band with a fine grain texture and a hairline top rule,
 * carrying the phone number in mono at large size beside the estimate form.
 * It closes every content page. The boldness lives here so everything around
 * it can stay quiet.
 */
export default function QuoteRail({
  heading,
  body,
  location,
  defaultProjectType,
}: {
  heading: string;
  body: string;
  location: string;
  defaultProjectType?: string;
}) {
  return (
    <section id="quote" className="relative bg-walnut text-chalk">
      <div className="absolute inset-0 grain planks opacity-70" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-chalk/35" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_auto] lg:gap-16 lg:py-20">
        <div className="self-center">
          <p className="eyebrow text-chalk/80">Free estimate</p>
          <h2 className="mt-3 text-2xl lg:text-3xl">{heading}</h2>
          <p className="mt-4 max-w-xl text-chalk/85">{body}</p>

          <dl className="mt-8 grid gap-px border hairline bg-chalk/20 sm:grid-cols-2">
            <div className="bg-walnut px-5 py-5">
              <dt className="eyebrow text-chalk/80">Call</dt>
              <dd className="mt-1">
                <a
                  href={site.phone.href}
                  data-analytics="tel"
                  className="font-mono text-xl tracking-tight text-white transition-colors hover:text-green-tint sm:text-2xl"
                >
                  {site.phone.display}
                </a>
              </dd>
            </div>
            <div className="bg-walnut px-5 py-5">
              <dt className="eyebrow text-chalk/80">Text</dt>
              <dd className="mt-1">
                <a
                  href={site.text.href}
                  data-analytics="sms"
                  className="font-mono text-xl tracking-tight text-white transition-colors hover:text-green-tint sm:text-2xl"
                >
                  {site.text.display}
                </a>
              </dd>
            </div>
          </dl>

          <p className="mt-6 font-mono text-2xs uppercase tracking-[0.16em] text-chalk/80">
            {site.roc} · {site.yearsInBusiness} years in the Valley · Lifetime workmanship guarantee
          </p>
        </div>

        <div className="w-full lg:w-[420px]">
          <LeadForm
            variant="inline"
            location={location}
            heading="Send us the project"
            defaultProjectType={defaultProjectType}
          />
        </div>
      </div>
    </section>
  );
}
