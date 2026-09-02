// app/[locale]/katalog/[slug]/page.js
//
// Правки в этом проходе:
// • Название/описание теперь берутся через localizedDombraName() /
//   localizedDombraDescription() — раньше была ручная проверка
//   `locale === "kz" ? ... : ...`, которая на английском и турецком
//   всегда откатывалась на русский, хотя для этого есть общая функция.
// • Кнопка WhatsApp была самым настоящим "TODO, замени на свой номер"
//   с href="https://wa.me/YOUR_NUMBER" — то есть НЕ РАБОТАЛА вообще.
//   Теперь берёт номер из data.js, как и везде на сайте.
// • Новое: 4 размера с ценами, характеристики (базовая комплектация),
//   плашка "бесплатно", галерея украшений внизу (общий компонент).
// • Цены по размерам — реальные (65/75/85/100 тыс. ₸), не оценка.
//   Для "Красная огненная лошадь" отдельно — 170 тыс. ₸ на любой размер.
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { getDombraBySlug, localizedDombraName, localizedDombraDescription, formatPriceFrom } from "@/lib/dombras";
import { CONTACT_WHATSAPP_URL } from "@/app/components/data";
import DombraGallery from "./DombraGallery";
import DecorationsGallery from "../DecorationsGallery";

export const revalidate = 3600;

// Реальные цены по размерам (не оценка, как раньше) — одна и та же
// таблица для всех обычных моделей. Исключение — "Красная огненная
// лошадь": у неё цена одна и та же (170 000 ₸) независимо от размера,
// проверяем по названию так же, как в ExclusiveModelBanner.jsx.
const SIZE_TIERS_FIXED = [
  { size: "42", price: 65000 },
  { size: "44", price: 75000 },
  { size: "46", price: 85000 },
  { size: "48", price: 100000 },
];
const EXCLUSIVE_PRICE = 170000;

function getSizeTiers(item) {
  const isExclusive = item.name_ru?.toLowerCase().includes("огненная лошадь");
  if (isExclusive) {
    return SIZE_TIERS_FIXED.map((tier) => ({ size: tier.size, price: EXCLUSIVE_PRICE }));
  }
  return SIZE_TIERS_FIXED;
}

// Переводы вписаны прямо здесь, без обращения к dict — отдельная
// таблица на 4 языка для этого конкретного блока характеристик,
// пока не ждём большой проход по locales/*.json.
const CHARACTERISTICS_BY_LOCALE = {
  ru: [
    { label: "Дека", value: "массив ели" },
    { label: "Задний корпус", value: "орех или клён" },
    { label: "Гриф", value: "клён" },
    { label: "Накладка на грифе", value: "эбен" },
    { label: "Головка", value: "массив, в цвет корпуса" },
    { label: "Колки", value: "закрытые, механические" },
    { label: "Струны", value: "карбон" },
    { label: "Шпон", value: "натуральный, без окрашивания" },
  ],
  kz: [
    { label: "Дека", value: "шырша массиві" },
    { label: "Артқы корпус", value: "жаңғақ немесе үйеңкі" },
    { label: "Гриф", value: "үйеңкі" },
    { label: "Гриф үстіндегі жапсырма", value: "абанос" },
    { label: "Басы", value: "корпус түсіндегі массив" },
    { label: "Құлақшалар", value: "жабық, механикалық" },
    { label: "Ішектер", value: "карбон" },
    { label: "Қаптама", value: "табиғи, боялмаған" },
  ],
  en: [
    { label: "Soundboard", value: "solid spruce" },
    { label: "Back body", value: "walnut or maple" },
    { label: "Neck", value: "maple" },
    { label: "Fretboard", value: "ebony" },
    { label: "Headstock", value: "solid wood, matching the body" },
    { label: "Tuning pegs", value: "closed, geared" },
    { label: "Strings", value: "carbon" },
    { label: "Veneer", value: "natural, unstained" },
  ],
  tr: [
    { label: "Tabla (üst kapak)", value: "masif ladin" },
    { label: "Arka gövde", value: "ceviz veya akçaağaç" },
    { label: "Sap", value: "akçaağaç" },
    { label: "Klavye", value: "abanoz" },
    { label: "Baş (kafa)", value: "gövdeyle aynı renkte masif" },
    { label: "Burgular", value: "kapalı, dişli" },
    { label: "Teller", value: "karbon" },
    { label: "Kaplama (veneer)", value: "doğal, boyasız" },
  ],
};

const FALLBACK_FREEBIES = [
  "Мягкий чехол",
  "Доставка по всему миру",
  "Гарантия 3 года",
  "Сертификат настоящего казаха",
  "Стикерпак",
];

const FREEBIE_ICONS = [
  <svg key="case" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 5 6v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6l-3-3H8Z" /><path d="M9 3v4h6V3" /></svg>,
  <svg key="delivery" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="13" height="8" rx="1" /><path d="M15 11h3.5L21 14v2h-6" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></svg>,
  <svg key="guarantee" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>,
  <svg key="certificate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5" /><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" /></svg>,
  <svg key="sticker" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11l5 5v11H4V4Z" /><path d="M15 4v5h5" /></svg>,
];

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const item = await getDombraBySlug(slug);
  if (!item) return {};
  const name = localizedDombraName(item, locale);
  const description = localizedDombraDescription(item, locale);
  return {
    title: `${name} — dombyra.kz`,
    description: description || "",
  };
}

export default async function DombraPage({ params }) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const item = await getDombraBySlug(slug);

  if (!item) notFound();

  const c = dict.catalogPage || {};
  const name = localizedDombraName(item, locale);
  const description = localizedDombraDescription(item, locale);
  const sizeTiers = getSizeTiers(item);
  const characteristics = CHARACTERISTICS_BY_LOCALE[locale] || CHARACTERISTICS_BY_LOCALE.ru;
  const freebies = c.pageFreebies?.length === 5 ? c.pageFreebies : FALLBACK_FREEBIES;
  const priceFrom = c.priceFrom || "от";

  const whatsappMessage = encodeURIComponent(
    (c.orderPrefill || "Здравствуйте! Интересует домбра «{name}».").replace("{name}", name)
  );

  return (
    <main className="w-full px-5 py-10 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <DombraGallery photos={item.photos} name={name} dict={dict} />

        <div>
          <h1 className="font-brand text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-brand-ink lg:text-[42px]">
            {name}
          </h1>

          <p className="mt-3 font-brand text-[22px] font-extrabold text-brand-blue lg:text-[28px]">
            {formatPriceFrom(priceFrom, `${item.base_price.toLocaleString("ru-RU")} ₸`, locale)}
          </p>

          {description && (
            <p className="mt-4 font-brand text-[14.5px] font-medium leading-relaxed text-brand-ink/70">
              {description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {sizeTiers.map((tier) => (
              <span
                key={tier.size}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-bg px-3 py-1.5 font-brand text-[11.5px] font-bold text-brand-ink"
              >
                {c.sizeLabel || "Размер"} {tier.size}
                <span className="text-brand-blue">
                  {formatPriceFrom(priceFrom, `${tier.price.toLocaleString("ru-RU")} ₸`, locale)}
                </span>
              </span>
            ))}
          </div>

          {(item.wood_types?.length > 0 || item.has_silver_option || item.has_decoration_option) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.wood_types?.map((wood) => (
                <span
                  key={wood}
                  className="rounded-full border border-brand-border bg-brand-bg px-3 py-1.5 font-brand text-[12px] font-bold text-brand-ink/70"
                >
                  {wood}
                </span>
              ))}
              {item.has_silver_option && (
                <span className="rounded-full border border-brand-border bg-brand-bg px-3 py-1.5 font-brand text-[12px] font-bold text-brand-blue">
                  {c.silverOption || "Вариант с серебром 925 пробы"}
                </span>
              )}
              {item.has_decoration_option && (
                <span className="rounded-full border border-brand-border bg-brand-bg px-3 py-1.5 font-brand text-[12px] font-bold text-brand-blue">
                  {c.decorationOption || "Дополнительные украшения"}
                </span>
              )}
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-brand-border p-4 lg:p-5">
            <div className="mb-3 font-brand text-[11px] font-bold uppercase tracking-[0.12em] text-brand-ink/45">
              {c.specsLabel || "Характеристики — базовая комплектация"}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {characteristics.map((spec, i) => (
                <div key={i} className="flex items-baseline gap-2 text-[12.5px]">
                  <span className="flex-none whitespace-nowrap font-brand font-medium text-brand-ink/55">
                    {spec.label}
                  </span>
                  <span className="-mb-[3px] flex-1 border-b border-dotted border-brand-ink/25" />
                  <span className="flex-none whitespace-nowrap font-brand font-bold text-brand-ink">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 font-brand text-[12px] font-medium leading-relaxed text-brand-ink/55">
              {c.specsNote ||
                "Это базовый вид домбры. Можно сделать из другого дерева, добавить узоры по бокам корпуса или серебряную накладку — обсудите с мастером."}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {freebies.map((label, i) => (
              <div key={i} className="flex items-center gap-2 rounded-2xl bg-brand-bg px-3 py-2.5">
                <span className="h-4.5 w-4.5 flex-none text-brand-teal">{FREEBIE_ICONS[i]}</span>
                <span className="font-brand text-[11.5px] font-bold leading-snug text-brand-ink">{label}</span>
              </div>
            ))}
          </div>

          
            href={`${CONTACT_WHATSAPP_URL}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-brand text-[13px] font-bold text-white transition-colors hover:bg-brand-blue-dark"
          >
            {c.orderCta || "Заказать / уточнить цену"} <span>›</span>
          </a>
        </div>
      </div>

      <DecorationsGallery dict={dict} />
    </main>
  );
}
