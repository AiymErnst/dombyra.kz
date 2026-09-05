"use client";
import Link from "next/link";
import { Placeholder } from "./ui";
import { usePhotoScrubber } from "./usePhotoScrubber";

// app/components/CatalogPreview.jsx
//
// По решению Айым карточки на главной — декоративная витрина, не
// связаны с реальными товарами из Supabase (клик по любой ведёт
// просто на /katalog целиком, а не на страницу конкретного товара).
//
// НО: свайп/hover-переключение фото Айым попросила оставить — та же
// логика, что и в CatalogPreviewCard.jsx (общий хук usePhotoScrubber),
// только фото здесь иллюстративные (несколько на карточку), а не
// подтянутые из базы. Поэтому компонент стал клиентским ("use client")
// — обработчики мыши/тача иначе не работают.

const ADVANTAGE_ICONS = [
  <svg key="guarantee" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>,
  <svg key="trainer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M12 18v3"/></svg>,
  <svg key="masters" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></svg>,
  <svg key="premium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.8L12 3Z"/></svg>,
  <svg key="materials" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20c8-1 12-6 15-15-9 1-13 6-15 15Z"/><path d="M9 15c2-2 4-4 6-8"/></svg>,
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/><circle cx="12" cy="12" r="3.2"/></svg>,
  <svg key="sound" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12c2-4 4-6 6-6s3 3 3 6-1 6-3 6-4-2-6-6Z"/><path d="M15 8c1.5 1 3 2.4 3 4s-1.5 3-3 4"/></svg>,
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

const BADGE_CLASSES = [
  "bg-white/95 text-brand-ink",
  "bg-brand-blue text-white",
  "bg-brand-lime text-brand-ink",
  "bg-brand-ink text-brand-lime",
  "bg-white/95 text-brand-ink",
  "bg-brand-blue text-white",
];

const FALLBACK_SHOWCASE = [
  // ВАЖНО про первую строку: было "public/content/bastauside" — два
  // бага сразу. 1) слово "public" никогда не пишется в пути (см. общий
  // урок про папку public/). 2) у файла в репозитории вообще нет
  // расширения (.jpg/.png) — так его загрузили на GitHub. Замените
  // ниже "bastauside.jpg" на то расширение, которое реально должно
  // быть у файла — и следом, важно: переименуйте сам файл в
  // public/content/ на GitHub так, чтобы имя ТОЧНО совпадало (включая
  // расширение) с тем, что написано здесь.
  { photos: ["/content/Ру танба/IMG_0082.JPEG", "/content/Ру танба/ru_alasha.webp", "/content/Ру танба/ru_arlan.webp"], name: "«Ру»", price: "155 000 ₸", badge: "Кость" },
  { photos: ["/content/Волна/dastur.webp", "/content/Волна/alinur.JPG", "/content/Волна/mastershop.JPG"], name: "«Бастау»", price: "65 000 ₸", badge: "42 размер" },
  { photos: ["/content/Волк/volkai.JPEG", "/content/Волк/volk_serebro.JPG", "/content/Волк/volkmastershop.JPG"], name: "«Волк»", price: "150 000 ₸", badge: "Серебро" },
  { photos: ["Фото — Кербез, общий вид", "Фото — Кербез, перламутр крупным планом", "Фото — Кербез, гриф"], name: "«Красная огненная лошадь»", price: "170 000 ₸", badge: "48 размер" },
  { photos: ["Фото — Шертер, общий вид", "Фото — Шертер, корпус", "Фото — Шертер, гриф"], name: "«Верблюд»", price: "210 000 ₸", badge: "Доп. узор" },
  { photos: ["Фото — Айгүл, общий вид", "Фото — Айгүл, узор", "Фото — Айгүл, гриф крупным планом"], name: "«Черепаха»", price: "410 000 ₸", badge: "Красное дерево" },
];

const FAN = [
  { rotate: "-rotate-6", y: "lg:translate-y-3" },
  { rotate: "-rotate-2", y: "", z: "lg:z-10" },
  { rotate: "lg:rotate-1", y: "lg:-translate-y-3", z: "lg:z-30" },
  { rotate: "lg:rotate-[4deg]", y: "lg:translate-y-1", z: "lg:z-20" },
  { rotate: "lg:rotate-[7deg]", y: "lg:translate-y-4" },
  { rotate: "-rotate-3", y: "lg:translate-y-2", z: "lg:z-10" },
];

function ShowcaseCard({ card, href, badgeClass }) {
  const photos = card.photos || [];
  const { activeIndex, hasMultiple, showDot, handleMouseMove, handleMouseLeave, handleTouchStart, handleTouchMove, handleTouchEnd, handleLinkClick } =
    usePhotoScrubber(photos);
  const current = photos[activeIndex];
  const isRealPhoto = typeof current === "string" && current.startsWith("/");

  return (
    <Link href={href} onClick={handleLinkClick} className="group block">
      <div
        className="relative aspect-[3/4] touch-pan-y overflow-hidden rounded-xl bg-brand-bg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isRealPhoto ? (
          <img
            src={current}
            alt={card.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
         ) : (
           <Placeholder>{current || "Фото домбры"}</Placeholder>
         )}

        {hasMultiple && (
          <div className="absolute inset-x-2 top-2 hidden gap-1 lg:flex">
            {photos.map((_, i) => (
              <div
                key={i}
                className={`h-[3px] flex-1 rounded-full transition-colors ${i === activeIndex ? "bg-white" : "bg-white/40"}`}
                style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.12)" }}
              />
            ))}
          </div>
        )}

        {hasMultiple && (
          <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5 lg:hidden">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => showDot(e, i)}
                aria-label={`Фото ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${i === activeIndex ? "bg-white" : "bg-white/45"}`}
                style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
              />
            ))}
          </div>
        )}

        <span className={`absolute bottom-2 left-2 rounded-full px-2 py-1 font-brand text-[8.5px] font-extrabold uppercase tracking-[0.04em] ${badgeClass}`}>
          {card.badge}
        </span>
      </div>
      <div className="mt-2 px-1 pb-1">
        <h3 className="font-brand text-[13px] font-extrabold text-brand-ink">{card.name}</h3>
        <p className="mt-1 font-brand text-[12px] font-extrabold text-brand-blue">{card.priceLabel}</p>
      </div>
    </Link>
  );
}

export default function CatalogPreview({ dict, locale }) {
  const localePrefix = locale ? `/${locale}` : "";
  const c = dict?.pages?.catalog || {};
  const advantages = c.advantages?.length === 8 ? c.advantages : FALLBACK_ADVANTAGES;
  const showcase = c.showcase?.length === 6 ? c.showcase : FALLBACK_SHOWCASE;
  const katalogHref = `${localePrefix}/katalog`;
  const priceFrom = c.priceFrom || "от";

  return (
    <section id="catalog" className="px-5 py-14 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-20">
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

      <Link
        href={`${localePrefix}/blog/${c.articleSlug || "kak-vybrat-dombru"}`}
        className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border-l-4 border-brand-lime bg-brand-bg px-5 py-3.5 transition-colors hover:bg-brand-bg/70"
      >
        <span className="font-brand text-[13px] font-medium text-brand-ink/70 lg:text-[14px]">
          {c.articleCallout || "Впервые покупаете домбру? Прочитайте статью, прежде чем выбирать."}
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
            {c.subtitle || "Ручная работа, сертификат подлинности. Цена от 100 000 ₸, зависит от дерева, украшений и серебряной накладки 925 пробы."}
          </p>
        </div>
        <Link
          href={katalogHref}
          className="shrink-0 whitespace-nowrap rounded-full bg-brand-blue px-7 py-3.5 font-brand text-[13px] font-bold text-white shadow-lg shadow-brand-blue/20 transition-colors hover:bg-brand-blue-dark"
        >
          {c.viewAll || "Смотреть весь каталог"} →
        </Link>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-3 py-6 lg:flex-nowrap lg:gap-0 lg:py-10">
        {showcase.map((card, i) => {
          const fan = FAN[i % FAN.length];
          return (
            <div
              key={i}
              className={`w-[47%] rounded-2xl border border-brand-border bg-white p-2 transition-shadow hover:shadow-lg sm:w-[172px] lg:w-auto lg:flex-1 lg:min-w-0 ${fan.rotate} ${fan.y} ${fan.z || ""} lg:-ml-3 first:lg:ml-0`}
            >
              <ShowcaseCard
                card={{ ...card, priceLabel: `${priceFrom} ${card.price}` }}
                href={katalogHref}
                badgeClass={BADGE_CLASSES[i % BADGE_CLASSES.length]}
              />
            </div>
          );
        })}
      </div>
      <p className="-mt-2 text-center font-brand text-[10.5px] font-medium text-brand-ink/40">
        {c.showcaseNote || "Примеры для ознакомления — актуальные товары в каталоге"}
      </p>
    </section>
  );
}
