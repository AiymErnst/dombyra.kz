"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/app/components/ui";

export default function KatalogGrid({
  initialItems,
  totalCount,
  pageSize = 9,
  locale,
  dict,
}) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`${localePrefix}/katalog/${item.slug}`}
            className="group block overflow-hidden border border-brand-border transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[3/4] bg-brand-bg">
              {item.photos?.[0] ? (
                <Image
                  src={item.photos[0]}
                  alt={item.name_ru}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <Placeholder>{c.noPhoto || "Фото домбры"}</Placeholder>
              )}
            </div>
            <div className="p-4">
              <h2 className="font-brand text-[15px] font-bold text-brand-ink">
                {item.name_ru}
              </h2>
              <p className="mt-1 font-brand text-[15px] font-extrabold text-brand-blue">
                {c.priceFrom || "от"} {item.base_price.toLocaleString("ru-RU")} ₸
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.wood_types?.map((wood) => (
                  <span
                    key={wood}
                    className="border border-brand-border bg-brand-bg px-2 py-0.5 font-brand text-[10px] font-bold tracking-[0.06em] text-brand-ink/60"
                  >
                    {wood}
                  </span>
                ))}
                {item.has_silver_option && (
                  <span className="border border-brand-border bg-brand-bg px-2 py-0.5 font-brand text-[10px] font-bold tracking-[0.06em] text-brand-blue">
                    {c.silverTag || "серебро 925"}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="border border-brand-ink/20 px-6 py-2.5 font-brand text-[12px] font-bold tracking-[0.06em] text-brand-ink/80 transition-colors hover:border-brand-blue hover:text-brand-blue disabled:opacity-50"
          >
            {loading ? c.loading || "Загружаю…" : c.showMore || "Показать ещё"}
          </button>
        </div>
      )}
    </div>
  );
}
