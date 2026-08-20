import Image from "next/image";
import { dim } from "@/content/image-dimensions";

/** Numbered section header — mono index, display title, hairline rule. */
export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  tone = "light",
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`border-t hairline pt-5 ${className}`}>
      <p className={`eyebrow ${dark ? "text-chalk/80" : "text-slate-deep"}`}>
        {index && <span className="text-green">{index} </span>}
        {eyebrow}
      </p>
      <h2 className={`mt-3 max-w-3xl text-2xl lg:text-3xl ${dark ? "text-chalk" : ""}`}>{title}</h2>
      {lede && (
        <p className={`mt-4 max-w-2xl ${dark ? "text-chalk/80" : "text-ink-soft"}`}>{lede}</p>
      )}
    </div>
  );
}

/** Image that always ships explicit intrinsic dimensions, so nothing shifts. */
export function Frame({
  src,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  ratio?: string;
}) {
  const d = dim(src);
  return (
    <div className={`relative overflow-hidden bg-chalk-deep ${ratio} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={d.w}
        height={d.h}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export function TrustBar({ points }: { points: readonly string[] }) {
  return (
    <div className="border-y hairline bg-chalk-deep">
      <ul className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-ink-soft">
            <span className="h-1.5 w-1.5 shrink-0 bg-green" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReviewCard({
  name,
  quote,
  tone = "light",
}: {
  name: string;
  quote: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={`flex h-full flex-col border hairline p-6 ${dark ? "bg-ink/40 text-chalk" : "bg-white"}`}
    >
      <Stars />
      <blockquote className={`mt-4 flex-1 text-sm leading-relaxed ${dark ? "text-chalk/85" : "text-ink-soft"}`}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t hairline pt-4 font-mono text-2xs uppercase tracking-[0.14em]">
        {name}
      </figcaption>
    </figure>
  );
}

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="Five out of five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#127b00" aria-hidden="true">
          <path d="m12 2 3 6.6 7 .9-5.1 4.8 1.3 7L12 18l-6.2 3.3 1.3-7L2 9.5l7-.9L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

export function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="mt-6 border-t hairline">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1 border-b hairline py-3 sm:grid-cols-[160px_1fr] sm:gap-6">
          <dt className="eyebrow pt-1 text-slate-deep">{r.label}</dt>
          <dd className="text-sm">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
