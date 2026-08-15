import Link from "next/link";

// Ссылки на статьи под каталогом. Заголовки и адреса берём из dict —
// так на каждом языке можно вести на свою версию статьи (или вообще
// показывать разный набор). Если в locales блока articles нет —
// секция просто не отрисуется, ничего не сломается.
export default function CatalogArticleLinks({ dict, locale }) {
  const localePrefix = locale ? `/${locale}` : "";
  const c = dict?.catalogPage || {};
  const articles = c.articles || [];

  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-brand-border pt-8 lg:mt-24">
      <h2 className="mb-5 font-brand text-[18px] font-extrabold uppercase tracking-[-0.01em] text-brand-ink lg:text-[22px]">
        {c.articlesTitle || "Прежде чем выбрать"}
      </h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`${localePrefix}/blog/${a.slug}`}
            className="flex-1 border border-brand-border px-4 py-3.5 font-brand text-[13px] font-medium text-brand-ink/75 transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            {a.title} →
          </Link>
        ))}
      </div>
    </section>
  );
}
