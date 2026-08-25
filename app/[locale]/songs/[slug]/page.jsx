// app/[locale]/songs/[slug]/page.jsx
//
// Страница одной мелодии. Главный источник длинного хвоста: запросов
// «келіншек ноталары», «адай табы», «сандық нота» много, а конкуренция
// почти нулевая — в выдаче ролики TikTok и файлы на старых сайтах.
//
// Текст рендерится на сервере, тренажёр монтируется ниже клиентским
// компонентом <Trainer> (без iframe) и открывается сразу на нужной
// мелодии — slug передаётся ему пропом song.

import { notFound } from 'next/navigation';
import { locales, defaultLocale, getDictionary } from '@/lib/i18n';
import {
  getSongCatalog, getSongBySlug,
  songTitle, songAuthor, songParagraphs, songDifficulty, songGenres,
} from '@/lib/songs';
import Trainer from '@/app/components/Trainer';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';
const HREFLANG = { kz: 'kk-KZ', ru: 'ru-KZ', en: 'en', tr: 'tr-TR' };

// Раз в сутки подтягиваем изменения из базы: описания правятся руками,
// пересобирать сайт ради каждой правки незачем.
export const revalidate = 86400;

// Мелодия, которой не было на сборке, отрендерится при первом заходе
// и дальше отдаётся из кэша. Благодаря этому добавление песни в Supabase
// НЕ требует ни правок в репозитории, ни пересборки сайта.
export const dynamicParams = true;

// На сборке готовим только первые мелодии по порядку. При сотнях песен
// генерировать все × 4 языка — это тысячи страниц и деплой на десятки
// минут, причём большая часть из них никому не понадобится.
// Остальные создаются по требованию (см. dynamicParams выше).
const PREGENERATE = 40;

export async function generateStaticParams() {
  const songs = (await getSongCatalog())
    .filter((s) => s.slug)
    .slice(0, PREGENERATE);
  return locales.flatMap((locale) =>
    songs.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const song = await getSongBySlug(slug);
  if (!song) return {};

  const dict = getDictionary(locale);
  const t = dict.pages.song || {};
  const title = songTitle(song, locale);
  const author = songAuthor(song, locale);
  const url = `${SITE}/${locale}/songs/${slug}`;

  // Первый абзац описания как meta description: он написан человеком
  // и точнее любого шаблона. Обрезаем до ~160 символов.
  const first = songParagraphs(song, locale)[0] || '';
  const description = first
    ? (first.length > 160 ? first.slice(0, 157).trimEnd() + '…' : first)
    : `${title}${author ? ' — ' + author : ''}. ${t.fallbackDesc || ''}`.trim();

  const languages = Object.fromEntries(
    locales.map((l) => [HREFLANG[l], `${SITE}/${l}/songs/${slug}`])
  );
  languages['x-default'] = `${SITE}/${defaultLocale}/songs/${slug}`;

  // Страница без описания — это заголовок и три строки фактов.
  // Google помечает такие как малоценные и может понизить оценку сайта
  // целиком. Пока описание не написано, держим страницу вне индекса:
  // она работает для людей, но не портит выдачу.
  const hasText = songParagraphs(song, locale).length > 0;

  return {
    title: `${title}${author ? ' — ' + author : ''} | ${t.metaSuffix || 'dombyra.kz'}`,
    description,
    ...(hasText ? {} : { robots: { index: false, follow: true } }),
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      locale: HREFLANG[locale].replace('-', '_'),
    },
  };
}

export default async function SongPage({ params }) {
  const { locale, slug } = await params;
  const song = await getSongBySlug(slug);
  if (!song) notFound();

  const dict = getDictionary(locale);
  const t = dict.pages.song || {};
  const nav = dict.nav || {};

  const title = songTitle(song, locale);
  const author = songAuthor(song, locale);
  const paragraphs = songParagraphs(song, locale);
  const difficulty = songDifficulty(song);
  const genres = songGenres(song, locale);
  const tuning = song.tuning_key === 'teris' ? t.tuningTeris : t.tuningStandard;
  const url = `${SITE}/${locale}/songs/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicComposition',
        '@id': url,
        name: title,
        url,
        inLanguage: locale === 'kz' ? 'kk' : locale,
        ...(author ? { composer: { '@type': 'Person', name: author } } : {}),
        ...(genres.length ? { genre: genres } : {}),
        ...(paragraphs.length ? { description: paragraphs[0] } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: nav.trainer || 'dombyra', item: `${SITE}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t.indexTitle || 'Songs', item: `${SITE}/${locale}/songs` },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Режим «Обучение» (в тренажёре он называется normal). Колбэки
          onModeChange/onLocaleChange здесь не передаём: на странице
          мелодии переключение режима не меняет адрес — тренажёр просто
          переключается внутри себя. */}
      <Trainer mode="normal" locale={locale} song={slug} />

      <main className="mode-page">
        <nav className="song-crumbs" aria-label="breadcrumb">
          <a href={`/${locale}`}>{nav.trainer || 'dombyra'}</a>
          {' / '}
          <a href={`/${locale}/songs`}>{t.indexTitle || 'Songs'}</a>
        </nav>

        <h1>{title}</h1>
        {author && <p className="song-author">{author}</p>}

        <ul className="song-facts">
          {tuning && <li><b>{t.tuningLabel}:</b> {tuning}</li>}
          {difficulty && <li><b>{t.difficultyLabel}:</b> {difficulty} / 7</li>}
          {genres.length > 0 && <li><b>{t.genreLabel}:</b> {genres.join(', ')}</li>}
        </ul>

        {paragraphs.length > 0 ? (
          <section className="song-about">
            <h2>{t.aboutHeading}</h2>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </section>
        ) : null}

        <nav className="mode-also">
          <h2>{t.moreHeading}</h2>
          <a href={`/${locale}/songs`}><b>{t.indexTitle}</b></a>
          <a href={`/${locale}/learn`}><b>{dict.pages.learn.h1}</b></a>
          <a href={`/${locale}/tuner`}><b>{dict.pages.tuner.h1}</b></a>
        </nav>
      </main>
    </>
  );
}
