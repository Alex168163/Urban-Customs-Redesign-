import Image from "next/image";
import Link from "next/link";
import { site, addressLine, nav } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-chalk">
      <div className="absolute inset-0 planks opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-4 pb-28 pt-14 sm:px-6 lg:pb-16">
        <div className="grid gap-10 border-b hairline pb-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/assets/staging/urban-customs-white-logo-600px.png"
              alt={`${site.name} — flooring and remodeling`}
              width={600}
              height={132}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-slate-soft">
              {site.name} — flooring and kitchen contractors serving the Phoenix Valley.
            </p>
            <p className="mt-4 font-mono text-2xs uppercase tracking-[0.16em] text-chalk">{site.roc}</p>
          </div>

          <div>
            <h2 className="eyebrow text-slate-soft">Reach us</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={site.phone.href} data-analytics="tel" className="font-mono transition-colors hover:text-green">
                  Phone {site.phone.display}
                </a>
              </li>
              <li>
                <a href={site.text.href} data-analytics="sms" className="font-mono transition-colors hover:text-green">
                  Text {site.text.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-green">
                  {site.email}
                </a>
              </li>
              <li className="pt-2 text-slate-soft">
                {addressLine}
                <br />
                {site.address.note}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-slate-soft">Hours</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-soft">
              <li>{site.hours.weekday}</li>
              <li>{site.hours.weekend}</li>
            </ul>

            <h2 className="eyebrow mt-8 text-slate-soft">Pages</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-green">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-slate-soft">Service areas</h2>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-soft">
              {site.serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-soft">
              Careers:{" "}
              <a href={`mailto:${site.email}?subject=Careers`} className="text-chalk transition-colors hover:text-green">
                {site.email}
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-2xs text-slate-soft sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">© 2016–2026 {site.name}. All rights reserved.</p>
          <p>
            <Link href="/privacy" className="transition-colors hover:text-green">
              Privacy
            </Link>
            <span aria-hidden="true"> · </span>
            <a href={site.reviewsUrl} target="_blank" rel="noopener" className="transition-colors hover:text-green">
              Read &amp; write reviews
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
