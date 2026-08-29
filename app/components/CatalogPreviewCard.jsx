import Link from "next/link";
import { Placeholder } from "./ui";
import CatalogPreviewCard from "./CatalogPreviewCard";

// раздел-превью на главной — id="catalog" совпадает с якорем в меню
// (href="#catalog"). Полный каталог со всеми товарами — на /katalog.
// Данные (items) приходят готовые пропсом сверху, из app/[locale]/page.jsx —
// тот же паттерн, что у Blog с posts. Сам компонент ничего не грузит.
//
// CatalogPreviewCard НЕ трогала: у неё уже есть переключение фото по
// движению курсора (веб) и свайпу (мобильный) — работает лучше, чем то,
// что было в моём HTML-черновике дизайна, и работает с любым числом
// реальных фото из Supabase, а не только с двумя. Здесь только веерная
// раскладка карточек вокруг неё.
//
// Блок "Почему мы" раньше был отдельной секцией — теперь его
// преимущества (бейджи с иконками) переехали сюда, в начало каталога.
// Иконки — не переводимая часть (SVG в коде), подписи — dict.catalog.advantages
// с русским текстом как запасным, по тому же принципу, что и весь
// остальной dict.

const ADVANTAGE_ICONS = [
  // Гарантия 3 года
  <svg key="guarantee" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>,
  // Бесплатный тренажёр
  <svg key="trainer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M12 18v3"/></svg>,
  // Опытные мастера
  <svg key="masters" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></svg>,
  // Премиум качество
  <svg key="premium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.8L12 3Z"/></svg>,
  // Качественные материалы
  <svg key="materials" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20c8-1 12-6 15-15-9 1-13 6-15 15Z"/><path d="M9 15c2-2 4-4 6-8"/></svg>,
  // Эксклюзивные дизайны
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/><circle cx="12" cy="12" r="3.2"/></svg>,
  // Превосходное звучание
  <svg key="sound" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12c2-4 4-6 6-6s3 3 3 6-1 6-3 6-4-2-6-6Z"/><path d="M15 8c1.5 1 3 2.4 3 4s-1.5 3-3 4"/></svg>,
  // Бесплатная доставка по КЗ
  <svg key="delivery" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="13" height="8" rx="1"/><path d="M15 11h3.5L21 14v2h-6"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>,
];

const FALLBACK_ADVANTAGES = [
  "Гарантия 3 года",
  "Бесплатный тренажёр",
  "Опытные мастера",
  "Премиум качество",
  "Качественные материалы",
  "Эксклюзивные дизайны",
  "Превосходное звучание",
  "Бесплатная доставка по КЗ",
];

// веерная раскладка — поворот/сдвиг по позиции карточки, а не по имени,
// чтобы работало с любыми реальными товарами из Supabase, не только
// с тестовыми четырьмя-шестью
const FAN = [
  { rotate: "-rotate-6", y: "lg:translate-y-3" },
  { rotate: "-rotate-2", y: "", z: "lg:z-10" },
  { rotate: "lg:rotate-1", y: "lg:-translate-y-3", z: "lg:z-30" },
  { rotate: "lg:rotate-[4deg]", y: "lg:translate-y-1", z: "lg:z-20" },
  { rotate: "lg:rotate-[7deg]", y: "lg:translate-y-4" },
  { rotate: "-rotate-3", y: "lg:translate-y-2", z: "lg:z-10" },
];

export default function CatalogPreview({ dict, locale, items = [] }) {
  const localePrefix = locale ? `/${locale}` : "";
  const c = dict?.catalog || {};
  const advantages = c.advantages?.length === 8 ? c.advantages : FALLBACK_ADVANTAGES;
  const shown = items.slice(0, 6);

  return (
    <section id="catalog" className="px-5 py-14 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-20">
      {/* преимущества — было отдельным блоком "Почему мы", теперь все
          пункты равнозначны, без выделения отдельных карточек крупнее */}
      <div className="mb-8 flex flex-wrap gap-2">
        {advantages.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg px-3.5 py-2 font-brand text-[11.5px] font-bold text-brand-ink/70"
          >
            <span className="h-4 w-4 flex-none text-brand-blue">{ADVANTAGE_ICONS[i]}</span>
            {label}
          </span>
        ))}
      </div>

      {/* приглашение прочитать статью — стоит ДО заголовка раздела и
          намеренно: тот, кто впервые покупает домбру, должен увидеть его
          первым, ещё до самого каталога */}
      <Link
        href={`${localePrefix}/blog/${c.articleSlug || "kak-vybrat-dombru"}`}
        className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border-l-4 border-brand-lime bg-brand-bg px-5 py-3.5 transition-colors hover:bg-brand-bg/70"
      >
        <span className="font-brand text-[13px] font-medium text-brand-ink/70 lg:text-[14px]">
          {c.articleCallout ||
            "Впервые покупаете домбру? Прочитайте статью, прежде чем выбирать."}
        </span>
        <span className="whitespace-nowrap font-brand text-[13px] font-bold text-brand-blue lg:text-[14px]">
          {c.articleLinkText || "Как выбрать домбру"} →
        </span>
      </Link>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-brand text-2xl font-extrabold uppercase tracking-[-0.02em] text-brand-ink lg:text-[36px]">
            {c.title1 || "Каталог"}{" "}
            <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
              {c.title2 || "домбр"}
            </span>
          </h2>
          <p className="mt-1.5 max-w-[420px] font-brand text-[13px] font-medium leading-relaxed text-brand-ink/62 lg:text-[15px]">
            {c.subtitle ||
              "Ручная работа, сертификат подлинности. Цена от 100 000 ₸, зависит от дерева, украшений и серебряной накладки 925 пробы."}
          </p>
        </div>
        <Link
          href={`${localePrefix}/katalog`}
          className="shrink-0 whitespace-nowrap rounded-full bg-brand-blue px-7 py-3.5 font-brand text-[13px] font-bold text-white shadow-lg shadow-brand-blue/20 transition-colors hover:bg-brand-blue-dark"
        >
          {c.viewAll || "Смотреть весь каталог"} →
        </Link>
      </div>

      {shown.length === 0 ? (
        <Placeholder>Каталог домбр — карточки товаров</Placeholder>
      ) : (
        <div className="flex flex-wrap items-start justify-center gap-3 py-6 lg:flex-nowrap lg:gap-0 lg:py-10">
          {shown.map((item, i) => {
            const fan = FAN[i % FAN.length];
            return (
              <div
                key={item.id}
                className={`w-[47%] sm:w-[172px] lg:w-[172px] lg:flex-none ${fan.rotate} ${fan.y} ${fan.z || ""} lg:-ml-3 first:lg:ml-0`}
              >
                <CatalogPreviewCard
                  item={item}
                  localePrefix={localePrefix}
                  priceFrom={c.priceFrom || "от"}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
