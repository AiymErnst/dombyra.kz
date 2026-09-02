// app/[locale]/katalog/page.js
//
// Страница каталога. Данные берём здесь, на сервере (как главная берёт
// posts), и передаём готовыми в клиентскую сетку KatalogGrid.
//
// Вводный блок под заголовком переделан: вместо одной строки про цену
// теперь — объяснение, от чего зависит стоимость (размер, дерево,
// украшения), сами тарифы по размеру (42/44/46/48) и список того, что
// входит бесплатно (чехол, тренажёр, сертификат, доставка).
//
// Новое: эксклюзивная модель "Красная огненная лошадь" выделена
// отдельным тёмным баннером над обычной сеткой карточек (не смешана
// с остальными товарами) — см. ExclusiveModelBanner.jsx. В самом низу
// страницы — галерея украшений (серебро, гравировка, узоры), как была
// на старом сайте.

// Раньше страница кэшировалась на час (revalidate = 3600) — новые
// товары появлялись с задержкой, пока не истечёт кэш или не сработает
// вебхук из Supabase. Теперь страница рендерится заново при каждом
// заходе — так же, как тренажёр (simulator.html) загружает мелодии
// напрямую из Supabase при каждом открытии, без кэша вообще. При
// небольшом трафике сайта разница в скорости не заметна, а вебхук и
// REVALIDATE_SECRET для dombras больше не нужны.
"use client";

import { useState } from "react";
import Image from "next/image";
import { Placeholder } from "@/app/components/ui";

export default function DombraGallery({ photos, name, dict }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const c = dict?.catalogPage || {};

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-brand-border">
        <Placeholder>{c.noPhoto || "Фото домбры"}</Placeholder>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-brand-border bg-brand-bg">
        <Image
          src={photos[activeIndex]}
          alt={`${name} — ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
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
