"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dim } from "@/content/image-dimensions";
import { galleryCategories, type GalleryCategory, type Photo } from "@/content/gallery";

export default function GalleryGrid({
  photos,
  filterable = true,
}: {
  photos: Photo[];
  filterable?: boolean;
}) {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = useMemo(
    () => galleryCategories.filter((c) => c === "All" || photos.some((p) => p.category === c)),
    [photos],
  );

  const shown = useMemo(
    () => (active === "All" ? photos : photos.filter((p) => p.category === active)),
    [photos, active],
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? null : (i + delta + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  return (
    <div>
      {filterable && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by room">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setActive(c);
                setLightbox(null);
              }}
              aria-pressed={active === c}
              className={`border px-3.5 py-2 font-mono text-2xs uppercase tracking-[0.12em] transition-colors ${
                active === c
                  ? "border-ink bg-ink text-chalk"
                  : "hairline text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ul className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
        {shown.map((photo, i) => (
          <Reveal key={photo.src} index={i}>
            <button
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative block w-full overflow-hidden bg-chalk-deep"
              aria-label={`Open larger view — ${photo.alt}`}
            >
              <span className="relative block aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={dim(photo.src).w}
                  height={dim(photo.src).h}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 px-3 py-2 text-left font-mono text-2xs uppercase tracking-[0.12em] text-chalk transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                {photo.category}
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      {lightbox !== null && shown[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={shown[lightbox].alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
        >
          <div className="relative max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={shown[lightbox].src}
              alt={shown[lightbox].alt}
              width={dim(shown[lightbox].src).w}
              height={dim(shown[lightbox].src).h}
              sizes="100vw"
              className="mx-auto max-h-[76vh] w-auto object-contain"
            />
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-chalk/85">{shown[lightbox].alt}</p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <LightboxButton onClick={() => step(-1)} label="Previous photo">
                ←
              </LightboxButton>
              <span className="font-mono text-2xs uppercase tracking-[0.14em] text-chalk/60">
                {lightbox + 1} / {shown.length}
              </span>
              <LightboxButton onClick={() => step(1)} label="Next photo">
                →
              </LightboxButton>
            </div>

            <button
              type="button"
              onClick={close}
              className="absolute -top-2 right-0 flex h-11 w-11 items-center justify-center border border-chalk/30 text-chalk hover:bg-chalk hover:text-ink"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LightboxButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center border border-chalk/30 font-mono text-chalk transition-colors hover:bg-chalk hover:text-ink"
    >
      {children}
    </button>
  );
}

/** Scroll reveal — the one piece of motion on the site, and it opts out politely. */
function Reveal({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    // Failsafe: a reveal that never fires is a photo nobody ever sees.
    const t = setTimeout(() => setShown(true), 1500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <li
      ref={ref}
      className="reveal"
      data-shown={shown}
      style={{ transitionDelay: `${Math.min(index, 5) * 45}ms` }}
    >
      {children}
    </li>
  );
}
