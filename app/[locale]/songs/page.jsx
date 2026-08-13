// app/[locale]/songs/page.jsx
//
// Каталог мелодий. Служит хабом: собирает ссылки на все страницы мелодий
// в одном месте, чтобы робот дошёл до каждой за один переход от главной.
// Без такой страницы страницы мелодий были бы «висячими» — доступными
// только из sitemap, и индексировались бы заметно медленнее.

import { locales, defaultLocale, getDictionary } from '@/lib/i18n';
import { getSongCatalog, songTitle, songAuthor, songDifficulty } from '@/lib/songs';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';
const HREFLANG = { kz: 'kk-KZ', ru: 'ru-KZ', en: 'en', tr: 'tr-TR' };

export const revalidate = 86400;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale).pages.song || {};
  const url = `${SITE}/${locale}/songs`;
  const languages = Object.fromEntries(
    locales.map((l) => [HREFLANG[l], `${SITE}/${l}/songs`])
  );
  languages['x-default'] = `${SITE}/${defaultLocale}/songs`;
  return {
    title: t.indexMetaTitle || t.indexTitle,
    description: t.indexMetaDesc,
    alternates: { canonical: url, languages },
  };
}

export default async function SongsIndex({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const t = dict.pages.song || {};
  const songs = (await getSongCatalog()).filter((s) => s.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.indexTitle,
    itemListElement: songs.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: songTitle(s, locale),
      url: `${SITE}/${locale}/songs/${s.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mode-page">
        <h1>{t.indexTitle}</h1>
        {t.indexLead && <p className="mode-lead">{t.indexLead}</p>}
        <ul className="song-list">
          {songs.map((s) => {
            const d = songDifficulty(s);
            return (
              <li key={s.slug}>
                <a href={`/${locale}/songs/${s.slug}`}>
                  <b>{songTitle(s, locale)}</b>
                  <span>{songAuthor(s, locale)}</span>
                  {d && <em>{d} / 7</em>}
                </a>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
