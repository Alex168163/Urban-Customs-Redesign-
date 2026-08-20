import type { Metadata } from "next";
import { site, addressLine } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How Urban Customs handles the information you send through the estimate form.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-[760px] px-4 py-16 sm:px-6 lg:py-20">
      <p className="eyebrow text-slate-deep">Privacy</p>
      <h1 className="mt-4 text-3xl">How we handle your information</h1>

      <div className="mt-8 space-y-6 text-ink-soft">
        <p>
          <strong className="text-ink">Placeholder.</strong> This page needs the client&rsquo;s own privacy
          policy before launch. What follows describes what the site actually does, so it is a starting point
          rather than a legal document.
        </p>

        <h2 className="pt-4 text-lg text-ink">What we collect</h2>
        <p>
          The estimate form collects your name, phone number, email address, and a description of your
          project. The contact form additionally collects the project address. We collect this so we can
          quote your job and reach you about it — nothing more.
        </p>

        <h2 className="pt-4 text-lg text-ink">What we do with it</h2>
        <p>
          Submissions are emailed to {site.email} and alert our team so we can respond quickly. We do not
          sell your information, and we do not share it outside the people working on your estimate.
        </p>

        <h2 className="pt-4 text-lg text-ink">Analytics</h2>
        <p>
          We measure which pages lead to estimate requests, and we count taps on the phone and text links.
          Add the client&rsquo;s cookie and analytics disclosures here once the GA4 property is live.
        </p>

        <h2 className="pt-4 text-lg text-ink">Reaching us</h2>
        <p>
          {site.name}, {addressLine}. Phone {site.phone.display}. Email {site.email}. {site.roc}.
        </p>
      </div>
    </section>
  );
}
