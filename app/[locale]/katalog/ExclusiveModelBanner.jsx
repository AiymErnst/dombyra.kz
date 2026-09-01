import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/app/components/ui";

// app/[locale]/katalog/ExclusiveModelBanner.jsx
//
// Модель "Красная огненная лошадь" — эксклюзив, привязанный к символу
// 2026 года. Раньше на старом сайте у неё была своя отдельная страница
// с тёмным фоном и крупным фото. Здесь — то же самое, но встроено в
// новый каталог: тёмный баннер над обычной сеткой карточек, а не
// карточка среди других.
//
// Определяем, какой товар считать эксклюзивным, по названию (ищем
// "Красная огненная лошадь" в name_ru) — временное решение. Надёжнее было бы
// завести в Supabase отдельное булево поле вроде is_featured в таблице
// dombras и фильтровать по нему, но это уже правка схемы базы, а не
// кода — можно сделать отдельным шагом, если появится вторая
// эксклюзивная модель и понадобится более гибкая система.
export function findExclusiveItem(items) {
  return items.find((item) =>
    item.name_ru?.toLowerCase().includes("Красная огненная лошадь")
  );
}

export default function ExclusiveModelBanner({ item, localePrefix, dict }) {
  if (!item) return null;
  const c = dict?.catalogPage?.exclusive || {};

  return (
    <Link
      href={`${localePrefix}/katalog/${item.slug}`}
      className="group relative mb-8 flex flex-col overflow-hidden rounded-2xl bg-brand-ink text-white sm:flex-row"
    >
      <div className="relative h-[280px] w-full flex-none sm:h-[380px] sm:w-[45%] lg:h-[420px]">
        {item.photos?.[0] ? (
          <Image
            src={item.photos[0]}
            alt={item.name_ru}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 45vw"
          />
        ) : (
          <Placeholder>Фото — эксклюзивная модель</Placeholder>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-brand-lime px-3 py-1.5 font-brand text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-brand-ink">
          {c.badge || "Эксклюзив 2026"}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 lg:p-10">
        <h2 className="font-brand text-[26px] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-[32px] lg:text-[40px]">
          {item.name_ru}
        </h2>
        <p className="mt-3 max-w-[420px] font-brand text-[13.5px] font-medium leading-relaxed text-white/70 lg:text-[14.5px]">
          {c.description ||
            "Мы разработали уникальный дизайн домбры с символом текущего года. В этот инструмент вложено много смысла, пожеланий силы, движения и обновления."}
        </p>
        <div className="mt-5 font-brand text-[20px] font-extrabold text-brand-lime lg:text-[24px]">
          {dict?.catalogPage?.priceFrom || "от"} {item.base_price.toLocaleString("ru-RU")} ₸
        </div>
        <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 font-brand text-[12.5px] font-bold text-brand-ink transition-colors group-hover:bg-brand-lime">
          {c.cta || "Смотреть модель"} <span>›</span>
        </span>
      </div>
    </Link>
  );
}
