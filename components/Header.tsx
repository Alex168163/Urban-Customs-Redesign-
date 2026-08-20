"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, nav } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-ink text-chalk">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
          <Image
            src="/assets/staging/urban-customs-white-logo-600px.png"
            alt={`${site.name} — flooring and remodeling`}
            width={600}
            height={132}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`font-display text-sm font-bold tracking-tight transition-colors hover:text-white ${
                  active ? "text-white" : "text-slate-soft"
                }`}
              >
                <span className="relative">
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-green" aria-hidden="true" />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-6 lg:gap-3">
          {/* Tap to call — present at every breakpoint. */}
          <a
            href={site.phone.href}
            data-analytics="tel"
            className="hidden items-center gap-2 font-mono text-sm text-chalk transition-colors hover:text-green sm:inline-flex"
          >
            <PhoneIcon />
            {site.phone.display}
          </a>
          <a
            href={site.phone.href}
            data-analytics="tel"
            aria-label={`Call ${site.name} at ${site.phone.display}`}
            className="inline-flex h-11 w-11 items-center justify-center border border-slate-soft/40 text-chalk sm:hidden"
          >
            <PhoneIcon />
          </a>
          <a
            href={site.text.href}
            data-analytics="sms"
            aria-label={`Text ${site.name} at ${site.text.display}`}
            className="inline-flex h-11 w-11 items-center justify-center border border-slate-soft/40 text-chalk lg:hidden"
          >
            <TextIcon />
          </a>

          <Link href="/contact" className="btn btn-primary hidden text-sm lg:inline-flex">
            Get My Free Estimate
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center border border-slate-soft/40 lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t hairline bg-ink lg:hidden">
          <ul className="mx-auto max-w-[1240px] px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <li key={item.href} className="border-b hairline last:border-0">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 font-display text-lg text-chalk"
                >
                  {item.label}
                  <span aria-hidden="true" className="font-mono text-xs text-green">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link href="/contact" className="btn btn-primary w-full">
                Get My Free Estimate
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-3.9-.9L3 20.5l1.6-4.8A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
