"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/data";

/** Her photo gallery with a simple lightbox. */
export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const active = open === null ? null : photos[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="group block w-full overflow-hidden rounded-2xl border border-white/70 bg-white/60 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-deep"
              aria-label={`Open photo: ${photo.caption}`}
            >
              <span className="relative block aspect-square w-full">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 45vw, 30vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="block px-3 py-2 text-xs font-medium text-plum/75">
                {photo.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-plum/80 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close photo"
            className="absolute top-5 right-6 text-3xl leading-none text-white/90 transition hover:scale-110"
          >
            ×
          </button>
          <figure
            className="max-h-full w-full max-w-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={active.src}
                alt={active.caption}
                fill
                sizes="(max-width: 640px) 90vw, 36rem"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center font-display text-lg text-white">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
