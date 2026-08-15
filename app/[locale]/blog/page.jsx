// app/[locale]/blog/page.jsx
//
// Список статей. Хаб: собирает ссылки на все статьи, чтобы робот дошёл
// до каждой за один переход от главной. Без него статьи были бы доступны
// только из sitemap и индексировались бы заметно медленнее.
//
// Header и Footer здесь больше не рендерятся — они переехали в
// app/[locale]/layout.jsx (через SiteChrome) и теперь есть на всех
// страницах внутри локали. Если оставить их и здесь — задвоятся.
import { locales, defaultLocale, getDictionary } from '@/lib/i18n';
import { getPosts, pick } from '@/lib/posts';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';
const HREFLANG = { kz: 'kk-KZ', ru: 'ru-KZ', en: 'en', tr: 'tr-TR' };
export const revalidate = 3600;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale).pages.blog || {};
  const url = `${SITE}/${locale}/blog`;
  const languages = Object.fromEntries(
    locales.map((l) => [HREFLANG[l], `${SITE}/${l}/blog`])
  );
  languages['x-default'] = `${SITE}/${defaultLocale}/blog`;
  return {
    title: t.indexMetaTitle || t.indexTitle,
    description: t.indexMetaDesc,
    alternates: { canonical: url, languages },
  };
}
export default async function BlogIndex({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const t = dict.pages.blog || {};
  const posts = await getPosts();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.indexTitle,
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: pick(p.title_i18n, locale),
      url: `${SITE}/${locale}/blog/${p.slug}`,
    })),
  };
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="post-page">
        <h1>{t.indexTitle}</h1>
        {t.indexLead && <p className="post-lead">{t.indexLead}</p>}
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <a href={`/${locale}/blog/${p.slug}`}>
                <span className="post-category">
                  {(t.categories && t.categories[p.category_key]) || p.category_key}
                </span>
                <b>{pick(p.title_i18n, locale)}</b>
                <span className="post-excerpt">{pick(p.excerpt_i18n, locale)}</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
