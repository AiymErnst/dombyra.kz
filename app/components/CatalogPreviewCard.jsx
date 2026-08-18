"use client";
// app/components/CatalogPreviewCard.jsx
//
// Одна карточка домбры на главной, с мини-галереей: если фото несколько —
// точки-индикаторы внизу (клик по точке — десктоп) и свайп пальцем прямо
// по фото (мобильный, привычный жест как в сторис). Обычный тап без
// свайпа по-прежнему уводит на страницу товара.
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SWIPE_THRESHOLD = 40; // px, минимальное движение пальца, чтобы считать это свайпом, а не тапом

export default function CatalogPreviewCard({ item, localePrefix, priceFrom }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = item.photos || [];
  const hasMultiple = photos.length > 1;

  const touchStartX = useRef(null);
  const wasSwipe = useRef(false);

  function goTo(i) {
    setActiveIndex((i + photos.length) % photos.length);
  }

  function showDot(e, i) {
    // точка сидит поверх ссылки-обёртки — без этого клик по точке
    // вместо переключения фото уводил бы на страницу товара
    e.preventDefault();
    e.stopPropagation();
    goTo(i);
  }

  function handleTouchStart(e) {
    if (!hasMultiple) return;
    touchStartX.current = e.touches[0].clientX;
    wasSwipe.current = false;
  }

  function handleTouchMove(e) {
    if (!hasMultiple || touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 10) wasSwipe.current = true;
  }

  function handleTouchEnd(e) {
    if (!hasMultiple || touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      goTo(delta < 0 ? activeIndex + 1 : activeIndex - 1);
    }
  }

  function handleClick(e) {
    // если только что был свайп — гасим переход по ссылке, это было
    // листание фото, а не намерение открыть карточку товара
    if (wasSwipe.current) {
      e.preventDefault();
      wasSwipe.current = false;
    }
  }

  return (
    <Link
      href={`${localePrefix}/katalog/${item.slug}`}
      onClick={handleClick}
      className="group block border border-brand-border overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div
        className="relative aspect-[3/4] touch-pan-y bg-brand-bg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
