"use client";
// app/components/CatalogPreviewCard.jsx
//
// Одна карточка домбры — с мини-галереей: движение курсора на вебе,
// свайп на мобильном. Сама логика переключения фото теперь в общем
// хуке usePhotoScrubber.js (используется и здесь, и в
// ExclusiveModelBanner.jsx) — раньше была продублирована.
//
// Название теперь берётся через localizedDombraName() — раньше всегда
// показывался item.name_ru, независимо от выбранного языка сайта.
import Image from "next/image";
import Link from "next/link";
import { localizedDombraName } from "@/lib/dombras";
import { usePhotoScrubber } from "./usePhotoScrubber";

export default function CatalogPreviewCard({ item, localePrefix, priceFrom, locale }) {
  const photos = item.photos || [];
  const name = localizedDombraName(item, locale || "ru");
  const {
    activeIndex,
    hasMultiple,
    showDot,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleLinkClick,
  } = usePhotoScrubber(photos);

  return (
    <Link
      href={`${localePrefix}/katalog/${item.slug}`}
      onClick={handleLinkClick}
      className="group block rounded-2xl border border-brand-border bg-white p-2 transition-shadow hover:shadow-lg"
    >
      <div
        className="relative aspect-[3/4] touch-pan-y overflow-hidden rounded-xl bg-brand-bg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {photos[activeIndex] ? (
          <Image
            src={photos[activeIndex]}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-brand text-[13px] text-brand-ink/40">
            Фото домбры
          </div>
        )}

        {hasMultiple && (
          <div className="absolute inset-x-2 top-2 hidden gap-1 lg:flex">
            {photos.map((_, i) => (
              <div
                key={i}
                className={`h-[3px] flex-1 rounded-full transition-colors ${
                  i === activeIndex ? "bg-white" : "bg-white/40"
                }`}
                style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.12)" }}
              />
            ))}
          </div>
        )}

        {hasMultiple && (
          <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5 lg:hidden">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => showDot(e, i)}
                aria-label={`Фото ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-white" : "bg-white/45"
                }`}
                style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-2 px-1 pb-1">
        <h3 className="font-brand text-[13px] font-extrabold text-brand-ink">
          {name}
        </h3>
        <p className="mt-1 font-brand text-[12px] font-extrabold text-brand-blue">
          {priceFrom} {item.base_price.toLocaleString("ru-RU")} ₸
        </p>
      </div>
    </Link>
  );
}
