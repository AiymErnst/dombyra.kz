import Link from "next/link";
import { Placeholder } from "./ui";
import CatalogPreviewCard from "./CatalogPreviewCard";

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
      {/* приглашение прочитать статью — стоит ДО заголовка раздела и
          намеренно: тот, кто впервые покупает домбру, должен увидеть его
          первым, ещё до самого каталога */}
      <Link
        href={`${localePrefix}/blog/${c.articleSlug || "kak-vybrat-dombru"}`}
        className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-brand-lime bg-brand-bg px-4 py-3 transition-colors hover:bg-brand-bg/70 lg:mb-8"
      >
        <span className="font-brand text-[13px] font-medium text-brand-ink/70 lg:text-[14px]">
          {c.articleCallout ||
            "Впервые покупаете домбру? Прочитайте статью, прежде чем выбирать."}
        </span>
        <span className="whitespace-nowrap font-brand text-[13px] font-bold text-brand-blue lg:text-[14px]">
          {c.articleLinkText || "Как выбрать домбру"} →
        </span>
      </Link>

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
            <CatalogPreviewCard
              key={item.id}
              item={item}
              localePrefix={localePrefix}
              priceFrom={c.priceFrom || "от"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
