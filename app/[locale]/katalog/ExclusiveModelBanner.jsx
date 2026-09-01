import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/app/components/ui";
import { localizedDombraName, localizedDombraDescription } from "@/lib/dombras";
import ExclusiveModelPhoto from "./ExclusiveModelPhoto";

// app/[locale]/katalog/ExclusiveModelBanner.jsx
//
// Правки по отзыву Айым:
// 1. Фото теперь листается так же, как в обычных карточках — вынесено
//    в отдельный клиентский компонент ExclusiveModelPhoto.
// 2. Дизайн был "тяжёлым" — теперь сплит: тёмное фото слева, светлая
//    (bg-brand-bg) текстовая часть справа, синий акцент вместо лайма
//    на чёрном.
export function findExclusiveItem(items) {
  return items.find((item) =>
    item.name_ru?.toLowerCase().includes("огненная лошадь")
  );
}

export default function ExclusiveModelBanner({ item, localePrefix, locale, dict }) {
  if (!item) return null;
  const c = dict?.catalogPage?.exclusive || {};
  const name = localizedDombraName(item, locale || "ru");
  const description =
    localizedDombraDescription(item, locale || "ru") ||
    c.description ||
    "Мы разработали уникальный дизайн домбры с символом текущего года. В этот инструмент вложено много смысла, пожеланий силы, движения и обновления.";
  const photos = item.photos || [];

  return (
    <div className="mb-8 flex flex-col overflow-hidden rounded-2xl border border-brand-border sm:flex-row">
      <ExclusiveModelPhoto
        photos={photos}
        name={name}
        href={`${localePrefix}/katalog/${item.slug}`}
        badge={c.badge || "Эксклюзив 2026"}
      />

      <Link
        href={`${localePrefix}/katalog/${item.slug}`}
        className="group flex flex-1 flex-col justify-center bg-brand-bg p-6 lg:p-9"
      >
        <h2 className="font-brand text-[24px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-brand-ink sm:text-[28px] lg:text-[32px]">
          {name}
        </h2>
        <p className="mt-2.5 max-w-[420px] font-brand text-[13px] font-medium leading-relaxed text-brand-ink/65 lg:text-[13.5px]">
          {description}
        </p>
        <div className="mt-4 font-brand text-[19px] font-extrabold text-brand-blue lg:text-[22px]">
          {dict?.catalogPage?.priceFrom || "от"} {item.base_price.toLocaleString("ru-RU")} ₸
        </div>
        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 font-brand text-[12.5px] font-bold text-white transition-colors group-hover:bg-brand-blue-dark">
          {c.cta || "Смотреть модель"} <span>›</span>
        </span>
      </Link>
    </div>
  );
}
