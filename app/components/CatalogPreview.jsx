import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "./ui";

// раздел-превью на главной — id="catalog" совпадает с якорем в меню
// (href="#catalog"). Полный каталог со всеми товарами — на /katalog.
// Данные (items) приходят готовые пропсом сверху, из app/[locale]/page.jsx —
// тот же паттерн, что у Blog с posts. Сам компонент ничего не грузит.
//
// dict?.catalog?.xxx с запасными текстами — на случай, если в
// locales/*.json блок "catalog" ещё не добавлен: раньше без "?." это
// роняло всю сборку на Vercel (TypeError: Cannot read properties of
// undefined). Когда добавишь переводы в locales — просто подхватятся,
// запасные тексты используются только пока их нет.
export default function CatalogPreview({ dict, locale, items = [] }) {
  const localePrefix = locale ? `/${locale}` : "";
  const c = dict?.catalog || {};

  return (
    <section id="catalog" className="px-5 py-10 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 lg:mb-8">
        <div>
          <h2 className="font-brand text-2xl font-extrabold uppercase tracking-[-0.02em] text-brand-ink lg:text-[36px]">
            {c.title || "Каталог домбр"}
          </h2>
          <p className="mt-1.5 max-w-[420px] font-brand text-[13px] font-medium leading-relaxed text-brand-ink/62 lg:text-[15px]">
            {c.subtitle ||
              "Ручная работа, сертификат подлинности. Цена от 100 000 ₸, зависит от дерева, украшений и серебряной накладки 925 пробы."}
          </p>
        </div>
        <Link
          href={`${localePrefix}/katalog`}
          className="shrink-0 whitespace-nowrap border border-brand-ink/20 px-5 py-2.5 font-brand text-[12px] font-bold tracking-[0.04em] text-brand-ink/80 transition-colors hover:border-brand-blue hover:text-brand-blue"
        >
          {c.viewAll || "Смотреть весь каталог"} →
        </Link>
      </div>

      {items.length === 0 ? (
        <Placeholder>Каталог домбр — карточки товаров</Placeholder>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`${localePrefix}/katalog/${item.slug}`}
              className="group block border border-brand-border overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-brand-bg">
                {item.photos?.[0] ? (
                  <Image
                    src={item.photos[0]}
                    alt={item.name_ru}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <Placeholder>Фото домбры</Placeholder>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-brand text-[15px] font-bold text-brand-ink">
                  {item.name_ru}
                </h3>
                <p className="mt-1 font-brand text-[15px] font-extrabold text-brand-blue">
                  от {item.base_price.toLocaleString("ru-RU")} ₸
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
