"use client";
// app/components/CatalogPreviewCard.jsx
//
// Одна карточка домбры на главной, с мини-галереей: если фото несколько,
// внизу точки-индикаторы, клик по точке листает фото прямо в карточке,
// не уходя со страницы. Клик по самой картинке — обычный переход на
// страницу товара (как и был).
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CatalogPreviewCard({ item, localePrefix, priceFrom }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = item.photos || [];
  const hasMultiple = photos.length > 1;

  function showDot(e, i) {
    // точка сидит поверх ссылки-обёртки — без этого клик по точке
    // вместо переключения фото уводил бы на страницу товара
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(i);
  }

  return (
    <Link
      href={`${localePrefix}/katalog/${item.slug}`}
      className="group block border border-brand-border overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] bg-brand-bg">
        {photos[activeIndex] ? (
          <Image
            src={photos[activeIndex]}
            alt={item.name_ru}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-brand text-[13px] text-brand-ink/40">
            Фото домбры
          </div>
        )}

        {hasMultiple && (
          <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
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
      <div className="p-4">
        <h3 className="font-brand text-[15px] font-bold text-brand-ink">
          {item.name_ru}
        </h3>
        <p className="mt-1 font-brand text-[15px] font-extrabold text-brand-blue">
          {priceFrom} {item.base_price.toLocaleString("ru-RU")} ₸
        </p>
      </div>
    </Link>
  );
}
