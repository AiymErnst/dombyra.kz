import Link from "next/link";
import { getArticle, articlePath, articleBlocks } from "@/lib/articles";

// Ссылки на статьи под каталогом. Заголовки и адреса берём из dict —
// так на каждом языке можно вести на свою версию статьи (или вообще
// показывать разный набор). Если в locales блока articles нет —
// секция просто не отрисуется, ничего не сломается.
//
// Адрес в dict может быть любым известным адресом статьи (обычно
// русским) — ссылка всё равно ведёт на версию статьи на языке страницы
// (см. lib/articles/slugs.js). Статьи, которой ещё нет (или нет на этом
// языке), в списке не показываются — ссылка появится сама, когда статью
// добавят.
export default function CatalogArticleLinks({ dict, locale }) {
  const c = dict?.catalogPage || {};
  const articles = (c.articles || [])
    .map((a) => ({ ...a, article: getArticle(a.slug) }))
    .filter((a) => a.article && articleBlocks(a.article, locale).length > 0);

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
            href={articlePath(a.article, locale)}
            className="flex-1 border border-brand-border px-4 py-3.5 font-brand text-[13px] font-medium text-brand-ink/75 transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            {a.title} →
          </Link>
        ))}
      </div>
    </section>
  );
}
