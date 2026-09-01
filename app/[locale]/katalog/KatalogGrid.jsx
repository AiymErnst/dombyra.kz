"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/app/components/ui";

// app/[locale]/katalog/KatalogGrid.jsx
//
// Раньше карточка показывала только первое фото и была с прямыми
// углами. Теперь: скруглённые карточки, 4 в ряд на вебе / 2 на
// мобильном, и под каждой карточкой — лента миниатюр ВСЕХ фото этого
// товара. Клик по самой карточке (фото/названию/цене) по-прежнему
// ведёт на страницу товара. Клик по миниатюре в ленте — открывает это
// фото увеличенным поверх страницы (лайтбокс), никуда не уходя —
// удобно пролистать все ракурсы прямо в каталоге перед тем как решить,
// открывать ли карточку.
//
// Страницу самого товара (/katalog/[slug]) в этой задаче не трогаем —
// это отдельная работа.
export default function KatalogGrid({
  initialItems,
  totalCount,
  pageSize = 9,
  locale,
  dict,
}) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const hasMore = items.length < totalCount;
  const localePrefix = locale ? `/${locale}` : "";
  const c = dict?.catalogPage || {};

  async function loadMore() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/dombras?offset=${items.length}&limit=${pageSize}`
      );
      const data = await res.json();
      if (data.items?.length) {
        setItems((prev) => [...prev, ...data.items]);
      }
    } catch (e) {
      console.error("[каталог] не удалось подгрузить:", e);
    }
    setLoading(false);
  }

  if (items.length === 0) {
    return <Placeholder>{c.empty || "Каталог пока пуст"}</Placeholder>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {items.map((item) => {
          const photos = item.photos || [];
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-brand-border bg-white transition-shadow hover:shadow-lg"
            >
              <Link href={`${localePrefix}/katalog/${item.slug}`} className="group block">
                <div className="relative aspect-[3/4] bg-brand-bg">
                  {photos[0] ? (
                    <Image
                      src={photos[0]}
                      alt={item.name_ru}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <Placeholder>{c.noPhoto || "Фото домбры"}</Placeholder>
                  )}
                </div>
                <div className="p-3.5">
                  <h2 className="font-brand text-[13.5px] font-bold leading-snug text-brand-ink">
                    {item.name_ru}
                  </h2>
                  <p className="mt-1 font-brand text-[13.5px] font-extrabold text-brand-blue">
                    {c.priceFrom || "от"} {item.base_price.toLocaleString("ru-RU")} ₸
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.wood_types?.map((wood) => (
                      <span
                        key={wood}
                        className="rounded-full border border-brand-border bg-brand-bg px-2 py-0.5 font-brand text-[9.5px] font-bold tracking-[0.04em] text-brand-ink/60"
                      >
                        {wood}
                      </span>
                    ))}
                    {item.has_silver_option && (
                      <span className="rounded-full border border-brand-border bg-brand-bg px-2 py-0.5 font-brand text-[9.5px] font-bold tracking-[0.04em] text-brand-blue">
                        {c.silverTag || "серебро 925"}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {photos.length > 1 && (
                <div data-row className="flex gap-1.5 overflow-x-auto px-3.5 pb-3.5">
                  {photos.map((photo, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightbox({ src: photo, alt: `${item.name_ru} — фото ${i + 1}` })}
                      className="relative h-12 w-12 flex-none overflow-hidden rounded-lg border border-brand-border"
                    >
                      <Image
                        src={photo}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="rounded-full border border-brand-ink/20 px-6 py-2.5 font-brand text-[12px] font-bold tracking-[0.06em] text-brand-ink/80 transition-colors hover:border-brand-blue hover:text-brand-blue disabled:opacity-50"
          >
            {loading ? c.loading || "Загружаю…" : c.showMore || "Показать ещё"}
          </button>
        </div>
      )}

      {lightbox && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-brand-ink/90 p-6"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Закрыть"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl font-bold text-white"
          >
            ×
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-[720px]">
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              className="object-contain"
              sizes="720px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
