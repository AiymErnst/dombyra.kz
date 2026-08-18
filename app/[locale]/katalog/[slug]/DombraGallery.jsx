"use client";

import { useState } from "react";
import Image from "next/image";
import { Placeholder } from "@/app/components/ui";

export default function DombraGallery({ photos, name, dict }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const c = dict?.catalogPage || {};

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-[3/4]">
        <Placeholder>{c.noPhoto || "Фото домбры"}</Placeholder>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden border border-brand-border bg-brand-bg">
        <Image
          src={photos[activeIndex]}
          alt={`${name} — ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden border-2 transition-colors ${
                i === activeIndex
                  ? "border-brand-blue"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`${i + 1}`}
            >
              <Image src={url} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
