import type { Faq } from "@/content/faqs";

/**
 * Native details/summary — keyboard accessible with no JavaScript, and it
 * matches the FAQPage schema emitted alongside it exactly.
 */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mt-8 border-t hairline">
      {faqs.map((faq) => (
        <details key={faq.q} className="group border-b hairline">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-base font-bold tracking-tight marker:hidden hover:text-green">
            {faq.q}
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 font-mono text-sm text-green transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-sm text-ink-soft">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
