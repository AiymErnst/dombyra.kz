// app/[locale]/blog/[slug]/page.jsx
//
// Второй проход по дизайну — по требованиям Айым (референс "Nihon
// Furin"), переработан сам ПРИНЦИП страницы, не просто цвета:
//
// 1. Полноширинные фото — вырываются за пределы узкой текстовой
//    колонки, а не сидят в рамке внутри неё.
// 2. Контент сгруппирован в "секции" (по h2) — у каждой секции своя
//    полоса фона на всю ширину экрана, чередуется светлый/тёмный,
//    текст меняет цвет вместе с фоном.
// 3. Само фото между секциями и служит границей — сидит впритык
//    между светлой и тёмной полосой, а не отдельная рамка с обводкой.
// 4. Секции с длинным текстом (3+ абзаца) — две колонки на десктопе.
// 5. Внутри первого абзаца каждой секции — "вводная" фраза крупным
//    курсивным шрифтом (font-display), дальше обычный текст той же
//    секции — смешение двух шрифтов в одном блоке.
// 6. Много воздуха — секции с щедрыми отступами py-14/py-20.
//
// Данные (lib/articles.js) трогать не пришлось — группировка на h2
// происходит здесь же, на лету, из того же плоского списка блоков.
import { notFound } from "next/navigation";
import Link from "next/link";
import { locales, defaultLocale, getDictionary } from "@/lib/i18n";
import {
  getArticles,
  getArticle,
  pick,
  articleBlocks,
  firstParagraph,
} from "@/lib/articles";
import { Placeholder } from "@/app/components/ui";
import ComparisonCardPhoto from "./ComparisonCardPhoto";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://dombyra.kz";
const HREFLANG = { kz: "kk-KZ", ru: "ru-KZ", en: "en", tr: "tr-TR" };

const CATALOG_CTA_TEXT = {
  ru: "Смотреть каталог домбр",
  kz: "Домбыра каталогын көру",
  en: "Browse the dombra catalog",
  tr: "Dombra kataloğuna bakın",
};

export const revalidate = 3600;

export function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const article of getArticles()) {
      if (articleBlocks(article, locale).length > 0) {
        params.push({ locale, slug: article.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article || articleBlocks(article, locale).length === 0) return {};

  const title = pick(article.title, locale);
  const description = firstParagraph(article, locale);
  const url = `${SITE}/${locale}/blog/${slug}`;

  return {
    title: `${title} — dombyra.kz`,
    description,
    alternates: { canonical: url },
  };
}

// разбивает плоский список блоков на "секции" по h2 — у intro (текст
// до первого h2) heading будет null. Три типа блоков (partShowcase,
// priceBreakdown, comparisonCards) — самодостаточные, целиком
// становятся отдельной секцией со своим рендером (см. CustomSection).
const CUSTOM_TYPES = ["partShowcase", "priceBreakdown", "comparisonCards"];

function groupIntoSections(blocks) {
  const sections = [];
  let current = { number: null, heading: null, image: null, rest: [] };

  function push() {
    if (current.heading !== null || current.rest.length > 0 || current.image) {
      sections.push(current);
    }
  }

  for (const block of blocks) {
    if (CUSTOM_TYPES.includes(block.type)) {
      push();
      sections.push({ custom: block });
      current = { number: null, heading: null, image: null, rest: [] };
    } else if (block.type === "h2") {
      push();
      const match = block.text.match(/^(\d+)\.\s*(.+)/);
      current = {
        number: match ? match[1] : null,
        heading: match ? match[2] : block.text,
        image: null,
        rest: [],
      };
    } else if (block.type === "image" && !current.image) {
      // первое фото в секции — вырываем на всю ширину, отдельно от
      // остального текста; если фото в секции больше одного, лишние
      // остаются обычным блоком внутри узкой колонки
      current.image = block;
    } else {
      current.rest.push(block);
    }
  }
  push();
  return sections;
}

function RestBlock({ block, dark }) {
  if (block.type === "image") {
    return (
      <figure className="mt-8">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brand-border bg-brand-bg">
          <Placeholder>{block.caption || "Фото"}</Placeholder>
        </div>
        {block.caption && (
          <figcaption className="mt-2 font-brand text-[12px] font-medium italic opacity-50">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className={`relative mt-9 rounded-2xl px-6 py-8 lg:px-10 lg:py-10 ${dark ? "bg-white/10" : "bg-brand-ink"}`}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-1 -top-4 font-brand text-[70px] font-extrabold leading-none text-white/10 lg:text-[100px]"
        >
          «
        </span>
        <p className="font-display relative text-[20px] italic leading-snug text-white lg:text-[26px]">
          {block.text}
        </p>
        {block.author && (
          <footer className="relative mt-3 font-brand text-[12px] font-bold uppercase tracking-[0.08em] text-brand-lime">
            — {block.author}
          </footer>
        )}
      </blockquote>
    );
  }

  if (block.type === "table") {
    return (
      <div className={`mt-7 overflow-hidden rounded-2xl border ${dark ? "border-white/15" : "border-brand-border"}`}>
        {block.rows.map((row, i) => (
          <div
            key={i}
            className={`flex items-center justify-between gap-4 px-5 py-3 ${
              dark
                ? i % 2 === 1 ? "bg-white/5" : "bg-transparent"
                : i % 2 === 1 ? "bg-brand-bg" : "bg-white"
            }`}
          >
            <span className={`font-brand text-[13.5px] font-medium ${dark ? "text-white/65" : "text-brand-ink/65"}`}>
              {row.label}
            </span>
            <span className={`font-brand text-[13.5px] font-extrabold ${dark ? "text-white" : "text-brand-ink"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "stats") {
    return (
      <div className="mt-7 flex flex-wrap gap-3">
        {block.items.map((item, i) => (
          <div key={i} className={`flex-1 rounded-2xl p-5 lg:min-w-[220px] ${dark ? "bg-white/10" : "bg-brand-bg"}`}>
            <div className={`font-brand text-[26px] font-extrabold lg:text-[32px] ${dark ? "text-brand-lime" : "text-brand-blue"}`}>
              {item.value}
            </div>
            <div className={`mt-1 font-brand text-[12px] font-medium leading-snug ${dark ? "text-white/60" : "text-brand-ink/60"}`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // p — обычный
  return (
    <p className={`mt-4 font-brand text-[15px] font-medium leading-relaxed ${dark ? "text-white/80" : "text-brand-ink/78"}`}>
      {block.text}
    </p>
  );
}

// одна секция целиком: заголовок с крупной цифрой, "вводная" фраза
// первого абзаца другим шрифтом, дальше обычный текст — в 2 колонки,
// если абзацев много; полоса фона на весь экран
function Section({ section, index }) {
  const dark = index % 2 === 1;
  const paragraphCount = section.rest.filter((b) => b.type === "p").length;
  const twoCol = paragraphCount >= 3;

  // первый абзац секции — выделяем первые несколько слов другим шрифтом
  const firstPIndex = section.rest.findIndex((b) => b.type === "p");
  const restBlocks = section.rest.map((block, i) => {
    if (i === firstPIndex) {
      const words = block.text.split(" ");
      const lead = words.slice(0, 6).join(" ");
      const tail = words.slice(6).join(" ");
      return (
        <p key={i} className={`mt-4 font-brand text-[15px] font-medium leading-relaxed ${dark ? "text-white/80" : "text-brand-ink/78"}`}>
          <span className={`font-display text-[19px] italic ${dark ? "text-white" : "text-brand-ink"}`}>
            {lead}{" "}
          </span>
          {tail}
        </p>
      );
    }
    return <RestBlock key={i} block={block} dark={dark} />;
  });

  return (
    <section className={dark ? "bg-brand-ink" : "bg-white"}>
      {section.image && (
        <div className="aspect-[21/9] w-full overflow-hidden bg-brand-bg sm:aspect-[3/1]">
          <Placeholder>{section.image.caption || "Фото"}</Placeholder>
        </div>
      )}
      {section.image?.caption && (
        <div className="px-5 pt-2 lg:px-7">
          <p className={`mx-auto max-w-[880px] font-brand text-[11.5px] font-medium italic ${dark ? "text-white/40" : "text-brand-ink/40"}`}>
            {section.image.caption}
          </p>
        </div>
      )}

      <div className={`px-5 pb-14 lg:px-7 lg:pb-20 ${index === 0 ? "pt-3 lg:pt-4" : "pt-14 lg:pt-20"}`}>
        <div className="mx-auto max-w-[880px]">
          {section.heading && (
            <h2 className={`flex items-start gap-3 font-brand uppercase leading-[1.1] tracking-[-0.01em] ${dark ? "text-white" : "text-brand-ink"}`}>
              {section.number && (
                <span className={`font-display text-[36px] italic leading-none lg:text-[46px] ${dark ? "text-brand-lime" : "text-brand-blue"}`}>
                  {section.number}
                </span>
              )}
              <span className="mt-1.5 text-[19px] font-extrabold lg:text-[24px]">{section.heading}</span>
            </h2>
          )}
          <div className={twoCol ? "lg:columns-2 lg:gap-10" : ""}>{restBlocks}</div>
        </div>
      </div>
    </section>
  );
}

// ── partShowcase: фото части домбры + шкала пород "дешевле → дороже" ──
// { type: "partShowcase", partLabel, title, titleAccent, description,
//   photoCaption, ladder: [{ name, note?, swatchCaption, photoCaption }],
//   cheapLabel, expensiveLabel, extraBox?: { title, groups: [{label, options}] } }
function PartShowcaseSection({ block, dark }) {
  return (
    <section className={dark ? "bg-brand-ink" : "bg-white"}>
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-brand-bg sm:aspect-[3/1]">
        <Placeholder>{block.photoCaption || block.partLabel}</Placeholder>
        {block.partLabel && (
          <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3.5 py-1.5 font-brand text-[11px] font-bold text-brand-ink shadow-md">
            {block.partLabel}
          </span>
        )}
      </div>

      <div className="px-5 py-14 lg:px-7 lg:py-20">
        <div className="mx-auto max-w-[880px]">
          <h2 className={`font-brand text-[26px] font-extrabold uppercase tracking-[-0.015em] lg:text-[36px] ${dark ? "text-white" : "text-brand-ink"}`}>
            {block.title}{" "}
            {block.titleAccent && <span className={dark ? "text-brand-lime" : "text-brand-blue"}>{block.titleAccent}</span>}
          </h2>
          {block.description && (
            <p className={`mt-3 max-w-[600px] font-brand text-[14px] font-medium leading-relaxed ${dark ? "text-white/70" : "text-brand-ink/65"}`}>
              {block.description}
            </p>
          )}

          {block.ladder && (
            <div className={`mt-9 flex gap-5 rounded-2xl p-6 ${dark ? "bg-white/5" : "bg-brand-bg"}`}>
              <div className="flex flex-none flex-col items-center">
                <span className={`font-brand text-[9px] font-bold uppercase tracking-[0.1em] ${dark ? "text-white/40" : "text-brand-ink/40"}`}>
                  {block.cheapLabel || "дешевле"}
                </span>
                <div
                  className="my-2 w-[2px] flex-1 rounded-full"
                  style={{ background: "linear-gradient(to bottom, #93c5fd, #1e3a8a)" }}
                />
                <span className={`font-brand text-[9px] font-bold uppercase tracking-[0.1em] ${dark ? "text-white/40" : "text-brand-ink/40"}`}>
                  {block.expensiveLabel || "дороже"}
                </span>
              </div>

              <div className="flex-1 divide-y divide-brand-border/60">
                {block.ladder.map((item, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-4 py-4 first:pt-0">
                    <div className="w-[140px] flex-none">
                      <div className={`font-brand text-[13.5px] font-bold ${dark ? "text-white" : "text-brand-ink"}`}>
                        {item.name}
                      </div>
                      {item.note && (
                        <div className={`mt-1 font-brand text-[11.5px] font-medium leading-snug ${dark ? "text-white/55" : "text-brand-ink/55"}`}>
                          {item.note}
                        </div>
                      )}
                    </div>
                    <div className="h-14 w-20 flex-none overflow-hidden rounded-lg bg-brand-bg lg:h-24 lg:w-32">
                      <Placeholder>{item.swatchCaption || "текстура"}</Placeholder>
                    </div>
                    {item.photoCaption !== false && (
                      <div className="h-14 w-20 flex-none overflow-hidden rounded-lg bg-brand-bg lg:h-24 lg:w-32">
                        <Placeholder>{item.photoCaption || "домбра"}</Placeholder>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {block.extraBox && (
            <div className={`mt-8 flex flex-wrap items-center gap-6 rounded-2xl p-6 ${dark ? "bg-white/10" : "bg-brand-ink"}`}>
              {block.extraBox.groups.map((g, i) => (
                <div key={i}>
                  <div className="font-brand text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">
                    {g.label}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {g.options.map((opt, j) => (
                      <span key={j} className="rounded-full bg-white/10 px-3 py-1 font-brand text-[12px] font-bold text-white">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {block.extraBox.title && (
                <div className="font-brand text-[13px] font-bold text-white">{block.extraBox.title}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── priceBreakdown: два акцентных числа + формула + шкала пород ──
function PriceBreakdownSection({ block, dark }) {
  return (
    <section className={dark ? "bg-brand-ink" : "bg-white"}>
      <div className="px-5 py-14 lg:px-7 lg:py-20">
        <div className="mx-auto max-w-[880px]">
          <h2 className={`font-brand text-[26px] font-extrabold uppercase leading-[1.05] tracking-[-0.015em] lg:text-[36px] ${dark ? "text-white" : "text-brand-ink"}`}>
            {block.title}{" "}
            {block.titleAccent && <span className={dark ? "text-brand-lime" : "text-brand-blue"}>{block.titleAccent}</span>}
          </h2>
          {block.description && (
            <p className={`mt-3 max-w-[640px] font-brand text-[14px] font-medium leading-relaxed ${dark ? "text-white/70" : "text-brand-ink/65"}`}>
              {block.description}
            </p>
          )}

          {block.thesis && (
            <div className={`mt-5 max-w-[640px] rounded-2xl border-l-4 border-brand-lime px-5 py-4 ${dark ? "bg-white/10" : "bg-brand-bg"}`}>
              <p className={`font-brand text-[15px] font-extrabold leading-snug ${dark ? "text-white" : "text-brand-ink"}`}>
                {block.thesis}
              </p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[block.statPercent, block.statFloor].filter(Boolean).map((s, i) => (
              <div key={i} className={`rounded-2xl p-6 ${dark ? "bg-white/10" : "bg-brand-bg"}`}>
                <div className={`font-brand text-[38px] font-extrabold leading-none lg:text-[44px] ${dark ? "text-brand-lime" : "text-brand-blue"}`}>
                  {s.value}
                </div>
                <div className={`mt-2 font-brand text-[13px] font-bold leading-snug ${dark ? "text-white" : "text-brand-ink"}`}>
                  {s.label}
                </div>
                {s.note && (
                  <div className={`mt-1.5 font-brand text-[12px] font-medium leading-snug ${dark ? "text-white/55" : "text-brand-ink/55"}`}>
                    {s.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          {block.photoCaption && (
            <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-brand-bg">
              <Placeholder>{block.photoCaption}</Placeholder>
            </div>
          )}

          {block.callouts && (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {block.callouts.map((c, i) => (
                <div key={i} className={`rounded-xl border p-4 ${dark ? "border-white/15" : "border-brand-border"}`}>
                  <div className={`font-brand text-[12.5px] font-bold ${dark ? "text-white" : "text-brand-ink"}`}>
                    {c.label}
                  </div>
                  <div className={`mt-1 font-brand text-[12px] font-medium leading-snug ${dark ? "text-white/55" : "text-brand-ink/55"}`}>
                    {c.note}
                  </div>
                </div>
              ))}
            </div>
          )}

          {block.formula && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {block.formula.map((label, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className={`font-brand text-[16px] font-bold ${dark ? "text-white/40" : "text-brand-ink/40"}`}>
                      {i === block.formula.length - 1 ? "=" : "+"}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-4 py-2 font-brand text-[12px] font-bold ${
                      i === block.formula.length - 1
                        ? "bg-brand-blue text-white"
                        : dark
                        ? "bg-white/10 text-white"
                        : "bg-brand-bg text-brand-ink"
                    }`}
                  >
                    {label}
                  </span>
                </span>
              ))}
            </div>
          )}

          {block.varietyScale && (
            <div className="mt-8">
              <div className="flex h-2 overflow-hidden rounded-full">
                <div className="flex-1 bg-brand-lime" />
                <div className="flex-1 bg-brand-blue" />
                <div className="flex-1" style={{ background: "#1e3a8a" }} />
                <div className="flex-1 bg-brand-ink" />
              </div>
              <div className="mt-2 flex justify-between font-brand text-[10.5px] font-bold uppercase tracking-[0.05em]">
                {block.varietyScale.labels.map((l, i) => (
                  <span key={i} className={dark ? "text-white/50" : "text-brand-ink/50"}>{l}</span>
                ))}
              </div>
              {block.varietyScale.note && (
                <p className={`mt-2 font-brand text-[12px] font-medium ${dark ? "text-white/45" : "text-brand-ink/45"}`}>
                  {block.varietyScale.note}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── comparisonCards: 3 варианта комплектации бок о бок ──
function ComparisonCardsSection({ block, dark }) {
  return (
    <section className={dark ? "bg-brand-ink" : "bg-white"}>
      <div className="px-5 py-14 lg:px-7 lg:py-20">
        <div className="mx-auto max-w-[880px]">
          <h2 className={`font-brand text-[26px] font-extrabold uppercase leading-[1.05] tracking-[-0.015em] lg:text-[36px] ${dark ? "text-white" : "text-brand-ink"}`}>
            {block.title}{" "}
            {block.titleAccent && <span className={dark ? "text-brand-lime" : "text-brand-blue"}>{block.titleAccent}</span>}
          </h2>
          {block.modelLabel && (
            <span className={`mt-3 inline-block rounded-full px-3 py-1.5 font-brand text-[11px] font-bold ${dark ? "bg-white/10 text-white" : "bg-brand-bg text-brand-ink"}`}>
              {block.modelLabel}
            </span>
          )}

          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
            {block.cards.map((card, i) => (
              <div
                key={i}
                className={`rounded-xl border p-2 sm:rounded-2xl sm:p-4 ${dark ? "border-white/15" : "border-brand-border"}`}
              >
                <span className={`inline-block rounded-full px-2 py-0.5 font-brand text-[9px] font-extrabold sm:px-3 sm:py-1 sm:text-[12px] ${dark ? "bg-white/10 text-white" : "bg-brand-bg text-brand-ink"}`}>
                  {card.price}
                </span>
                <div className="mt-2 sm:mt-3">
                  <ComparisonCardPhoto photos={card.photos} fallbackLabel={card.photoCaption || card.tier} />
                </div>
                <div className={`mt-2 font-brand text-[11px] font-extrabold sm:mt-3 sm:text-[13.5px] ${dark ? "text-white" : "text-brand-ink"}`}>
                  {card.tier}
                </div>
                <div className="mt-1.5 space-y-1 sm:mt-2 sm:space-y-1.5">
                  {card.specs.map((s, j) => (
                    <div key={j} className="flex items-start gap-1">
                      <span className={`mt-0.5 font-brand text-[9px] font-bold sm:text-[11px] ${s.included ? "text-brand-blue" : dark ? "text-white/25" : "text-brand-ink/25"}`}>
                        {s.included ? "✓" : "—"}
                      </span>
                      <span className={`font-brand text-[9px] font-medium leading-snug sm:text-[11.5px] ${dark ? "text-white/65" : "text-brand-ink/65"}`}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className={`mt-2 font-brand text-[10px] font-medium italic sm:hidden ${dark ? "text-white/35" : "text-brand-ink/35"}`}>
            Разверните телефон горизонтально, если текст в карточках выглядит тесно
          </p>

          {block.note && (
            <div className={`mt-6 rounded-2xl p-5 ${dark ? "bg-white/10" : "bg-brand-bg"}`}>
              <p className={`font-brand text-[13.5px] font-bold ${dark ? "text-white" : "text-brand-ink"}`}>{block.note}</p>
              {block.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {block.tags.map((tag, i) => (
                    <span key={i} className={`rounded-full border px-3 py-1.5 font-brand text-[11.5px] font-bold ${dark ? "border-white/20 text-white/80" : "border-brand-border text-brand-ink/70"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CustomSection({ block, index }) {
  const dark = index % 2 === 1;
  if (block.type === "partShowcase") return <PartShowcaseSection block={block} dark={dark} />;
  if (block.type === "priceBreakdown") return <PriceBreakdownSection block={block} dark={dark} />;
  if (block.type === "comparisonCards") return <ComparisonCardsSection block={block} dark={dark} />;
  return null;
}

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const t = dict.pages.blog || {};
  const article = getArticle(slug);

  if (!article) notFound();
  const blocks = articleBlocks(article, locale);
  if (blocks.length === 0) notFound();

  const title = pick(article.title, locale);
  const category = (t.categories && t.categories[article.category_key]) || article.category_key;
  const localePrefix = `/${locale}`;
  const sections = groupIntoSections(blocks);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: firstParagraph(article, locale),
    url: `${SITE}/${locale}/blog/${slug}`,
    inLanguage: HREFLANG[locale] || locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <div className="px-5 pb-10 pt-10 lg:px-7 lg:pt-16">
          <div className="mx-auto max-w-[880px]">
            <Link href={`${localePrefix}/blog`} className="font-brand text-[12.5px] font-bold text-brand-blue hover:text-brand-blue-dark">
              ← {t.backToIndex || "Все статьи"}
            </Link>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
              <span className="font-brand text-[10px] font-bold uppercase tracking-[0.12em] text-brand-ink/60">{category}</span>
              {article.read_minutes ? (
                <span className="font-brand text-[10px] font-bold uppercase tracking-[0.12em] text-brand-ink/40">
                  · {article.read_minutes} {t.readMinutes}
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 text-balance font-brand text-[34px] font-extrabold uppercase leading-[1.02] tracking-[-0.025em] text-brand-ink lg:text-[56px]">
              {title}
            </h1>
          </div>
        </div>

        {sections.map((section, i) =>
          section.custom ? (
            <CustomSection key={i} block={section.custom} index={i} />
          ) : (
            <Section key={i} section={section} index={i} />
          )
        )}

        <div className="px-5 py-14 lg:px-7 lg:py-20">
          <div className="mx-auto max-w-[880px]">
            <Link
              href={`${localePrefix}/katalog`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-brand text-[13px] font-bold text-white transition-colors hover:bg-brand-blue-dark"
            >
              {CATALOG_CTA_TEXT[locale] || CATALOG_CTA_TEXT.ru} →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
