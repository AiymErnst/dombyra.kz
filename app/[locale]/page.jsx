// app/[locale]/blog/[slug]/page.jsx
//
// Страница статьи. Текст рендерится на сервере — робот видит его без
// выполнения JS. Разметка Article сообщает поиску заголовок, дату и автора.

import { notFound } from 'next/navigation';
import { locales, defaultLocale, getDictionary } from '@/lib/i18n';
import { getPosts, getPost, pick, postBlocks, firstParagraph, availableLocales } from '@/lib/posts';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';
const HREFLANG = { kz: 'kk-KZ', ru: 'ru-KZ', en: 'en', tr: 'tr-TR' };

export const revalidate = 3600;
// Статья, опубликованная после сборки, отрендерится при первом заходе.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts();
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const dict = getDictionary(locale);
  const t = dict.pages.blog || {};
  const title = pick(post.title_i18n, locale);
  const url = `${SITE}/${locale}/blog/${slug}`;

  const raw = firstParagraph(post, locale);
  const description = raw.length > 160 ? raw.slice(0, 157).trimEnd() + '…' : raw;

  const languages = Object.fromEntries(
    locales.map((l) => [HREFLANG[l], `${SITE}/${l}/blog/${slug}`])
  );
  languages['x-default'] = `${SITE}/${defaultLocale}/blog/${slug}`;

  // Статья без перевода на этот язык не должна попадать в индекс:
  // иначе в выдаче окажется русский текст по казахскому адресу.
  const translated = postBlocks(post, locale).length > 0;

  return {
    title: `${title} | ${t.metaSuffix || 'dombyra.kz'}`,
    description,
    alternates: { canonical: url, languages },
    ...(translated ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      locale: HREFLANG[locale].replace('-', '_'),
      publishedTime: post.published_at || undefined,
      ...(post.cover_url ? { images: [post.cover_url] } : {}),
    },
  };
}

/** Рендер блока статьи. Список типов закрытый — произвольный HTML
 *  из базы не принимаем, чтобы правка контента не могла сломать вёрстку. */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'h3':
      return <h3>{block.text}</h3>;
    case 'quote':
      return <blockquote>{block.text}</blockquote>;
    case 'list':
      return (
        <ul>
          {(block.items || []).map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case 'p':
    default:
      return <p>{block.text}</p>;
  }
}

export default async function PostPage({ params }) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const t = dict.pages.blog || {};
  const nav = dict.nav || {};

  const title = pick(post.title_i18n, locale);
  const blocks = postBlocks(post, locale);
  // перевода нет — показываем русскую версию, но страница помечена noindex
  const shown = blocks.length ? blocks : postBlocks(post, defaultLocale);
  const category = (t.categories && t.categories[post.category_key]) || post.category_key;
  const url = `${SITE}/${locale}/blog/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': url,
        headline: title,
        description: firstParagraph(post, locale),
        url,
        inLanguage: locale === 'kz' ? 'kk' : locale,
        datePublished: post.published_at || undefined,
        articleSection: category,
        author: { '@type': 'Organization', name: 'dombyra.kz', url: `${SITE}/${locale}` },
        publisher: { '@type': 'Organization', name: 'dombyra.kz', url: `${SITE}/${locale}` },
        ...(post.cover_url ? { image: post.cover_url } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: nav.trainer || 'dombyra.kz', item: `${SITE}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t.indexTitle || 'Blog', item: `${SITE}/${locale}/blog` },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Шапка нужна, чтобы со статьи можно было уйти на сайт и сменить
          язык: раньше страница была тупиком — только хлебные крошки. */}
      <Header locale={locale} path={`/blog/${slug}`} available={availableLocales(post)} dict={dict} />

      <main className="post-page">
        <nav className="post-crumbs" aria-label="breadcrumb">
          <a href={`/${locale}`}>{nav.trainer || 'dombyra.kz'}</a>
          {' / '}
          <a href={`/${locale}/blog`}>{t.indexTitle || 'Blog'}</a>
        </nav>

        <div className="post-meta">
          <span className="post-category">{category}</span>
          {post.read_minutes ? (
            <span>{post.read_minutes} {t.readMinutes || 'мин'}</span>
          ) : null}
        </div>

        <h1>{title}</h1>

        <article className="post-body">
          {shown.map((b, i) => <Block key={i} block={b} />)}
        </article>

        <nav className="post-more">
          <a href={`/${locale}/blog`}>{t.backToIndex || t.indexTitle}</a>
        </nav>
      </main>

      <Footer locale={locale} dict={dict} path={`/blog/${slug}`} />
    </>
  );
}
