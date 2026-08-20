import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import LazyMap from "@/components/LazyMap";
import { SectionHead } from "@/components/ui";
import { site, addressLine } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Urban Customs | Free Estimate Phoenix, AZ",
  description: `Get a free flooring or kitchen estimate from Urban Customs. Call ${site.phone.display}, text ${site.text.display}, or send the form. Serving Phoenix and the wider Valley.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-ink text-chalk">
        <div className="absolute inset-0 planks opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:py-16">
          <p className="eyebrow text-green-tint">Contact</p>
          <h1 className="mt-4 max-w-3xl text-3xl sm:text-4xl">Get your free estimate</h1>
          <p className="mt-5 max-w-2xl text-chalk/85">
            Send the form and we will get back to you, or reach us directly. We serve Phoenix, Gilbert,
            Glendale, Peoria, Tempe, Surprise, Sun City, and the wider Valley of the Sun.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <LeadForm
            variant="full"
            location="contact"
            heading="Tell us about the project"
            className="self-start"
          />

          <div>
            <SectionHead eyebrow="Direct" title="Reach us any of these ways" className="border-t-0 pt-0" />

            <dl className="mt-8 border-t hairline">
              <Row label="Phone">
                <a href={site.phone.href} data-analytics="tel" className="link-rule font-mono text-lg">
                  {site.phone.display}
                </a>
              </Row>
              <Row label="Text">
                <a href={site.text.href} data-analytics="sms" className="link-rule font-mono text-lg">
                  {site.text.display}
                </a>
              </Row>
              <Row label="Email">
                <a href={`mailto:${site.email}`} className="link-rule">
                  {site.email}
                </a>
              </Row>
              <Row label="Hours">
                {site.hours.weekday}
                <br />
                {site.hours.weekend}
              </Row>
              <Row label="Showroom">
                {addressLine}
                <br />
                <span className="text-ink-soft">{site.address.note}</span>
              </Row>
              <Row label="License">
                <span className="font-mono">{site.roc}</span>
              </Row>
            </dl>

            <div className="mt-8">
              <LazyMap />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b hairline py-4 sm:grid-cols-[130px_1fr] sm:gap-6">
      <dt className="eyebrow pt-1.5 text-slate-deep">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
