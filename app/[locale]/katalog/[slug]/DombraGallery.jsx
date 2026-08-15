"use client";

import { useState } from "react";
import Image from "next/image";

export default function DombraGallery({ photos, name }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-brand-ink/5 flex items-center justify-center text-brand-ink/30">
        Нет фото
      </div>
    );
  }

  return (
    <div>
      {/* Главное фото */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-ink/5">
        <Image
          src={photos[activeIndex]}
          alt={`${name} — фото ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Лента миниатюр — показываем только если фото больше одного,
          сама скроллится по горизонтали (overflow-x-auto), если не
          помещаются в одну строку */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {photos.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex
                  ? "border-amber-500"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`Показать фото ${i + 1}`}
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
