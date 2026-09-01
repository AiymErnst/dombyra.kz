// app/[locale]/katalog/page.js
//
// Страница каталога. Данные берём здесь, на сервере (как главная берёт
// posts), и передаём готовыми в клиентскую сетку KatalogGrid.
//
// Вводный блок под заголовком переделан: вместо одной строки про цену
// теперь — объяснение, от чего зависит стоимость (размер, дерево,
// украшения), сами тарифы по размеру (42/48) и список того, что
// входит бесплатно (чехол, тренажёр, сертификат, доставка).
import { getDictionary } from "@/lib/i18n";
import { getDombras } from "@/lib/dombras";
import KatalogGrid from "./KatalogGrid";
import CatalogArticleLinks from "./CatalogArticleLinks";

export const revalidate = 3600;

const PAGE_SIZE = 9;

const FALLBACK_SIZE_TIERS = [
  { size: "42", price: "65 000 ₸" },
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
  const sizeTiers = c.sizeTiers?.length === 2 ? c.sizeTiers : FALLBACK_SIZE_TIERS;
  const freebies = c.freebies?.length === 4 ? c.freebies : FALLBACK_FREEBIES;

  return (
    <main className="w-full px-5 py-10 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-16">
      <h1 className="font-brand text-[32px] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-brand-ink lg:text-[56px]">
        {c.title || "Каталог домбр"}
      </h1>

      <p className="mt-3 max-w-[620px] font-brand text-[15px] font-medium leading-relaxed text-brand-ink/62 lg:text-[17px]">
        {c.lead || "Каждая домбра — ручная работа с сертификатом подлинности."}
      </p>

      <div className="mt-7 rounded-2xl border border-brand-border bg-brand-bg p-5 lg:p-7">
        <p className="max-w-[720px] font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/72 lg:text-[15px]">
          {c.priceIntro ||
            "Стоимость домбры зависит от размера, дерева и дополнительных украшений. Выберите любой дизайн и украсьте домбру дополнительными узорами на грифе, сбоку корпуса, добавьте серебряную накладку и гравировку."}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {sizeTiers.map((tier, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white px-5 py-3.5 shadow-sm"
            >
              <div className="font-brand text-[11px] font-bold uppercase tracking-[0.08em] text-brand-ink/50">
                {c.sizeLabel || "Размер"} {tier.size}
              </div>
              <div className="mt-0.5 font-brand text-[18px] font-extrabold text-brand-blue">
                {c.priceFrom || "от"} {tier.price}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-brand-border pt-5">
          <div className="mb-3 font-brand text-[11px] font-bold uppercase tracking-[0.1em] text-brand-teal">
            {c.freebiesLabel || "Бесплатно с каждой домброй"}
          </div>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {freebies.map((label, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-3"
              >
                <span className="h-5 w-5 flex-none text-brand-blue">
                  {FREEBIE_ICONS[i]}
                </span>
                <span className="font-brand text-[12px] font-bold leading-snug text-brand-ink">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-14">
        <KatalogGrid
          initialItems={items}
          totalCount={total}
          pageSize={PAGE_SIZE}
          locale={locale}
          dict={dict}
        />
      </div>

      <CatalogArticleLinks dict={dict} locale={locale} />
    </main>
  );
}
