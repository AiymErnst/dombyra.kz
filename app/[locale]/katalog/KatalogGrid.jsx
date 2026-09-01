"use client";

import { useState } from "react";
import { Placeholder } from "@/app/components/ui";
import CatalogPreviewCard from "@/app/components/CatalogPreviewCard";

// app/[locale]/katalog/KatalogGrid.jsx
//
// Раньше карточка каталога отличалась от карточки на лендинге — здесь
// было статичное фото + отдельная лента миниатюр с лайтбоксом снизу.
// Айым попросила сделать так же, как на лендинге: используем ровно
// тот же компонент CatalogPreviewCard — тонкие сегменты сверху,
// переключение фото движением курсора на вебе, свайп на мобильном.
// Один компонент, одно и то же поведение в обоих местах — были ошибки
// синхронизации, если бы карточка существовала в двух версиях.
//
// Сетка: 4 карточки в ряд на вебе, 2 на мобильном.
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
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {items.map((item) => (
          <CatalogPreviewCard
            key={item.id}
            item={item}
            localePrefix={localePrefix}
            priceFrom={c.priceFrom || "от"}
          />
        ))}
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
    </div>
  );
}
