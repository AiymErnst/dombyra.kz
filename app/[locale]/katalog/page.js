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
import { getDictionary } from "@/lib/i18n";
import { getDombras } from "@/lib/dombras";
import { CONTACT_WHATSAPP_URL } from "@/app/components/data";
import KatalogGrid from "./KatalogGrid";
import CatalogArticleLinks from "./CatalogArticleLinks";
import ExclusiveModelBanner, { findExclusiveItem } from "./ExclusiveModelBanner";

export const revalidate = 3600;

const PAGE_SIZE = 9;

const FALLBACK_SIZE_TIERS = [
  { size: "42", price: "65 000 ₸" },
  { size: "44", price: "75 000 ₸" },
  { size: "46", price: "90 000 ₸" },
  { size: "48", price: "100 000 ₸" },
];

const FALLBACK_FREEBIES = [
  "Мягкий чехол",
  "Доступ к онлайн-тренажёру",
  "Сертификат настоящего казаха",
  "Доставка по Казахстану",
];

const FREEBIE_ICONS = [
  <svg key="case" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 5 6v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6l-3-3H8Z" /><path d="M9 3v4h6V3" /></svg>,
  <svg key="trainer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="13" rx="2" /><path d="M8 21h8M12 18v3" /></svg>,
  <svg key="certificate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>,
  <svg key="delivery" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="13" height="8" rx="1" /><path d="M15 11h3.5L21 14v2h-6" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></svg>,
];

const DECORATION_PHOTOS = [
  "Серебряная накладка на голову",
  "Гравировка с именем",
  "Ру танба на грифе",
  "Узоры сбоку корпуса",
  "Костяная накладка",
  "Деревянная резьба",
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const c = dict.catalogPage || {};
  return {
    title: c.metaTitle || "Каталог домбр — dombyra.kz",
    description: c.metaDescription || "",
  };
}

export default async function KatalogPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { items, total } = await getDombras(PAGE_SIZE, 0);
  const c = dict.catalogPage || {};
  const localePrefix = locale ? `/${locale}` : "";
  const sizeTiers = c.sizeTiers?.length === 4 ? c.sizeTiers : FALLBACK_SIZE_TIERS;
  const freebies = c.freebies?.length === 4 ? c.freebies : FALLBACK_FREEBIES;
  const decorations = c.decorations || {};

  const exclusiveItem = findExclusiveItem(items);
  const gridItems = exclusiveItem
    ? items.filter((item) => item.id !== exclusiveItem.id)
    : items;
  const gridTotal = exclusiveItem ? total - 1 : total;

  return (
    <main className="w-full px-5 py-10 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-16">
      <h1 className="font-brand text-[32px] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-brand-ink lg:text-[56px]">
        {c.title || "Каталог домбр"}
      </h1>

      <p className="mt-3 max-w-[620px] font-brand text-[15px] font-medium leading-relaxed text-brand-ink/62 lg:text-[17px]">
        {c.lead || "Каждая домбра — ручная работа с сертификатом подлинности."}
      </p>

      <div className="mt-5 rounded-2xl border border-brand-border bg-brand-bg p-4 lg:p-5">
        <p className="max-w-[640px] font-brand text-[12.5px] font-medium leading-relaxed text-brand-ink/70">
          {c.priceIntro ||
            "Стоимость зависит от размера, дерева и украшений. Выберите дизайн, добавьте узоры на грифе и корпусе, серебряную накладку или гравировку."}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {sizeTiers.map((tier, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-brand text-[11.5px] font-bold text-brand-ink"
            >
              {c.sizeLabel || "Размер"} {tier.size}
              <span className="text-brand-blue">
                {c.priceFrom || "от"} {tier.price}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-brand-border pt-3">
          {freebies.map((label, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-white px-3 py-1.5 font-brand text-[11px] font-semibold text-brand-ink/80"
            >
              <span className="h-3.5 w-3.5 flex-none text-brand-teal">{FREEBIE_ICONS[i]}</span>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 lg:mt-14">
        <ExclusiveModelBanner item={exclusiveItem} localePrefix={localePrefix} dict={dict} />

        <KatalogGrid
          initialItems={gridItems}
          totalCount={gridTotal}
          pageSize={PAGE_SIZE}
          locale={locale}
          dict={dict}
        />
      </div>

      <section className="mt-16 border-t border-brand-border pt-10 lg:mt-24">
        <h2 className="font-brand text-[24px] font-extrabold uppercase tracking-[-0.02em] text-brand-ink lg:text-[32px]">
          {decorations.title || "Дополнительно"}
        </h2>
        <p className="mt-3 max-w-[640px] font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/65 lg:text-[14.5px]">
          {decorations.subtitle ||
            "По желанию можно добавить накладку на голову из серебра, кости или дерева с бесплатной гравировкой, ру танба, узоры на грифе и сбоку корпуса, звукосниматель."}
        </p>

        <div data-row className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {(decorations.photos?.length ? decorations.photos : DECORATION_PHOTOS).map(
            (caption, i) => (
              <div
                key={i}
                className="h-[190px] w-[220px] flex-none overflow-hidden rounded-2xl border border-brand-border bg-brand-bg"
              >
                <div className="flex h-full w-full items-center justify-center px-3 text-center font-brand text-[11px] font-medium text-brand-ink/40">
                  {caption}
                </div>
              </div>
            )
          )}
        </div>

        
          href={`${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(
            decorations.prefillMessage || "Здравствуйте! Хочу узнать про украшения для домбры."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 font-brand text-[13px] font-bold text-white transition-colors hover:bg-brand-blue-dark"
        >
          {decorations.cta || "Выбрать украшения"} <span>›</span>
        </a>
      </section>

      <CatalogArticleLinks dict={dict} locale={locale} />
    </main>
  );
}
