"use client";
// app/components/CatalogPreviewCard.jsx
//
// Одна карточка домбры на главной, с мини-галереей — два разных способа
// листать фото под разные устройства:
//   • Веб (мышь, hover) — тонкие сегменты сверху (как у Lamoda/OZON):
//     двигаешь курсор по фото по горизонтали — переключается на нужный
//     сегмент, без клика вообще.
//   • Мобильный (палец) — свайп по фото + точки снизу как запасной
//     способ, hover там не работает физически.
// Показываются только нужные элементы под конкретное устройство через
// Tailwind (lg: = веб), лишнее не мешает и не путает.
//
// Внешний вид (скругление, белая рамка-паддинг вокруг фото) обновлён
// под новый веерный дизайн каталога на главной — сама логика выше не
// трогалась ни на строчку.
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
    e.preventDefault();
    e.stopPropagation();
    goTo(i);
  }

  function handleMouseMove(e) {
    if (!hasMultiple) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const segment = Math.min(
      photos.length - 1,
      Math.max(0, Math.floor((relX / rect.width) * photos.length))
    );
    setActiveIndex(segment);
  }

  function handleMouseLeave() {
    if (!hasMultiple) return;
    setActiveIndex(0);
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
    if (wasSwipe.current) {
      e.preventDefault();
      wasSwipe.current = false;
    }
  }

  return (
    <Link
      href={`${localePrefix}/katalog/${item.slug}`}
      onClick={handleClick}
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
            alt={item.name_ru}
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
          {item.name_ru}
        </h3>
        <p className="mt-1 font-brand text-[12px] font-extrabold text-brand-blue">
          {priceFrom} {item.base_price.toLocaleString("ru-RU")} ₸
        </p>
      </div>
    </Link>
  );
}
