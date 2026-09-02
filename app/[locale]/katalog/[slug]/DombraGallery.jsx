"use client";

import { useState } from "react";
import Image from "next/image";
import { Placeholder } from "@/app/components/ui";

// app/[locale]/katalog/[slug]/DombraGallery.jsx
//
// Правки по отзыву Айым:
// 1. Скругление сделала чуть меньше (rounded-xl вместо rounded-2xl).
// 2. Раньше единственный способ листать фото — кликнуть по маленькой
//    миниатюре внизу, что визуально не считывалось как "тут можно
//    переключать фото". Теперь поверх самого фото — явные стрелки
//    влево/вправо (видны всегда, не только по наведению) и точки
//    снизу, как в большинстве галерей — сразу понятно, что фото не
//    одно и можно листать. Миниатюры под фото оставила — это быстрый
//    способ перейти сразу к нужному ракурсу, не пролистывая по одному.
export default function DombraGallery({ photos, name, dict }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const c = dict?.catalogPage || {};
  const hasMultiple = (photos?.length || 0) > 1;

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-[3/4] overflow-hidden rounded-xl border border-brand-border">
        <Placeholder>{c.noPhoto || "Фото домбры"}</Placeholder>
      </div>
    );
  }

  function goTo(i) {
    setActiveIndex((i + photos.length) % photos.length);
  }

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-brand-border bg-brand-bg">
        <Image
          src={photos[activeIndex]}
          alt={`${name} — ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label={c.prevPhoto || "Предыдущее фото"}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-md transition-colors hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label={c.nextPhoto || "Следующее фото"}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-md transition-colors hover:bg-white"
            >
              ›
            </button>

            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${i + 1}`}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === activeIndex ? "bg-white" : "bg-white/50"
                  }`}
                  style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => goTo(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
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
