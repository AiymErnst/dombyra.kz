// app/[locale]/blog/[slug]/page.jsx
//
// Дизайн статьи переделан под "лонгрид" — по референсам Айым:
// смешение шрифтов (крупный курсивный акцент в заголовке — тот же
// font-display, что уже используется в заголовках по всему сайту —
// плюс обычный жирный текст), выделенные ключевые моменты не просто
// абзацем, а отдельными визуальными блоками.
//
// Схема блоков контента расширена тремя новыми типами (раньше были
// только h2/p):
// • quote — крупная цитата с автором (для пословицы)
// • table — таблица "параметр → значение" (для возраст → размер)
// • stats — крупное акцентное число с подписью (для "100 000 ₸",
//   "80% / 20%" и т.п.)
// Старые типы h2/p работают точно как раньше, ничего не сломано.
import { notFound } from "next/navigation";
import Link from "next/link";
import { locales, defaultLocale, getDictionary } from "@/lib/i18n";
import {
  getArticles,
  getArticle,
  pick,
  articleBlocks,
  firstParagraph,
  availableLocales,
} from "@/lib/articles";
import { Placeholder } from "@/app/components/ui";

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
  const written = availableLocales(article);
  const languages = Object.fromEntries(
    written.map((l) => [HREFLANG[l], `${SITE}/${l}/blog/${slug}`])
  );
  if (written.includes(defaultLocale)) {
    languages["x-default"] = `${SITE}/${defaultLocale}/blog/${slug}`;
  }

  return {
    title: `${title} — dombyra.kz`,
    description,
    alternates: { canonical: url, languages },
  };
}

// один блок контента → нужная разметка, в зависимости от типа
function ContentBlock({ block, isFirst }) {
  if (block.type === "h2") {
    return (
      <h2
        className={`font-brand text-[21px] font-extrabold uppercase leading-[1.15] tracking-[-0.01em] text-brand-ink lg:text-[26px] ${
          isFirst ? "mt-0" : "mt-11"
        }`}
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="relative mt-9 rounded-2xl bg-brand-ink px-6 py-8 lg:px-10 lg:py-10">
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
      <div className="mt-7 overflow-hidden rounded-2xl border border-brand-border">
        {block.rows.map((row, i) => (
          <div
            key={i}
            className={`flex items-center justify-between gap-4 px-5 py-3 ${
              i % 2 === 1 ? "bg-brand-bg" : "bg-white"
            }`}
          >
            <span className="font-brand text-[13.5px] font-medium text-brand-ink/65">
              {row.label}
            </span>
            <span className="font-brand text-[13.5px] font-extrabold text-brand-ink">
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
          <div
            key={i}
            className="flex-1 rounded-2xl bg-brand-bg p-5 lg:min-w-[220px]"
          >
            <div className="font-brand text-[26px] font-extrabold text-brand-blue lg:text-[32px]">
              {item.value}
            </div>
            <div className="mt-1 font-brand text-[12px] font-medium leading-snug text-brand-ink/60">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // p — обычный абзац
  return (
    <p className="mt-4 font-brand text-[15px] font-medium leading-relaxed text-brand-ink/78">
      {block.text}
    </p>
  );
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
  const category =
    (t.categories && t.categories[article.category_key]) || article.category_key;
  const localePrefix = `/${locale}`;
  const written = availableLocales(article);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="px-5 py-10 lg:px-7 lg:py-16">
        <div className="mx-auto max-w-[720px]">
          <Link
            href={`${localePrefix}/blog`}
            className="font-brand text-[12.5px] font-bold text-brand-blue hover:text-brand-blue-dark"
          >
            ← {t.backToIndex || "Все статьи"}
          </Link>

          {/* эйбрау — "Советы для новичков" из категории */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-bg px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
            <span className="font-brand text-[10px] font-bold uppercase tracking-[0.12em] text-brand-ink/60">
              {category}
            </span>
            {article.read_minutes ? (
              <span className="font-brand text-[10px] font-bold uppercase tracking-[0.12em] text-brand-ink/40">
                · {article.read_minutes} {t.readMinutes}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-balance font-brand text-[34px] font-extrabold uppercase leading-[1.02] tracking-[-0.025em] text-brand-ink lg:text-[52px]">
            {title}
          </h1>

          <div className="mt-7 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-brand-border bg-brand-bg">
            {article.cover_url ? (
              <img
                src={article.cover_url}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <Placeholder>{category}</Placeholder>
            )}
          </div>

          <article className="mt-2">
            {blocks.map((block, i) => (
              <ContentBlock key={i} block={block} isFirst={i === 0} />
            ))}
          </article>

          {written.length > 1 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-brand-border pt-6">
              <span className="font-brand text-[11px] font-bold uppercase tracking-[0.1em] text-brand-ink/40">
                {dict.nav?.language || "ЯЗЫК"}
              </span>
              {written.map((l) => (
                <Link
                  key={l}
                  href={`/${l}/blog/${slug}`}
                  className={`rounded-full border px-3 py-1.5 font-brand text-[12px] font-bold uppercase ${
                    l === locale
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-brand-border text-brand-ink/70 hover:border-brand-blue hover:text-brand-blue"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>
          )}

          <Link
            href={`${localePrefix}/katalog`}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-brand text-[13px] font-bold text-white transition-colors hover:bg-brand-blue-dark"
          >
            {CATALOG_CTA_TEXT[locale] || CATALOG_CTA_TEXT.ru} →
          </Link>
        </div>
      </main>
    </>
  );
}
