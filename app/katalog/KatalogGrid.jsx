"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PAGE_SIZE = 9; // 3x3 на десктопе за одну подгрузку

export default function KatalogGrid({ initialItems, totalCount }) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const hasMore = items.length < totalCount;

  async function loadMore() {
    setLoading(true);
    const from = items.length;
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from("dombras")
      .select("*")
      .eq("in_stock", true)
      .order("sort_order", { ascending: true })
      .range(from, to);

    if (error) {
      console.error("[каталог] ошибка подгрузки:", error);
    } else if (data) {
      setItems((prev) => [...prev, ...data]);
    }
    setLoading(false);
  }

  if (items.length === 0) {
    return (
      <p className="text-brand-ink/60">
        Каталог пока пуст — добавьте первую домбру в Supabase (таблица{" "}
        <code>dombras</code>).
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/katalog/${item.slug}`}
            className="group block rounded-2xl border border-brand-ink/10 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3] bg-brand-ink/5">
              {item.photos?.[0] ? (
                <Image
                  src={item.photos[0]}
                  alt={item.name_ru}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-ink/30 text-sm">
                  Нет фото
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="font-medium text-brand-ink mb-1">
                {item.name_ru}
              </h2>
              <p className="text-amber-700 font-semibold">
                от {item.base_price.toLocaleString("ru-RU")} ₸
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.wood_types?.map((wood) => (
                  <span
                    key={wood}
                    className="text-xs px-2 py-0.5 rounded-full bg-brand-ink/5 text-brand-ink/70"
                  >
                    {wood}
                  </span>
                ))}
                {item.has_silver_option && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    серебро 925
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2.5 rounded-full border border-brand-ink/20 text-brand-ink/80 hover:border-amber-400 hover:text-amber-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Загружаю…" : "Показать ещё"}
          </button>
        </div>
      )}
    </div>
  );
}
