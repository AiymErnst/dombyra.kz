// app/sitemap.js → отдаётся по /sitemap.xml
//
// Языковые альтернативы перечислены прямо в карте: поисковик видит связь
// версий сразу, не дожидаясь обхода каждой страницы.

import { locales, defaultLocale } from '@/lib/i18n';
import { getSongCatalog } from '@/lib/songs';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';
const HL = { kz: 'kk-KZ', ru: 'ru-KZ', en: 'en', tr: 'tr-TR' };

// Карта пересобирается раз в сутки — новые мелодии из Supabase
// попадают в неё сами, без деплоя.
export const revalidate = 86400;

export default async function sitemap() {
  // В карту кладём все мелодии со slug. Страницы без описания при этом
  // помечены noindex в самой странице — робот их увидит, но в выдачу
  // не поставит, пока текст не появится.
  const songs = (await getSongCatalog()).filter((s) => s.slug);

  const routes = [
    { path: '', priority: 1.0 },
    { path: 'tuner', priority: 0.9 },     // приоритетная страница
    { path: 'learn', priority: 0.8 },
    { path: 'karaoke', priority: 0.8 },
    { path: 'songs', priority: 0.8 },
    ...songs.map((s) => ({ path: `songs/${s.slug}`, priority: 0.7 })),
  ];

  const entries = [];
  for (const r of routes) {
    const languages = Object.fromEntries(
      locales.map((l) => [HL[l], `${SITE}/${l}${r.path ? `/${r.path}` : ''}`])
    );
    for (const locale of locales) {
      entries.push({
        url: `${SITE}/${locale}${r.path ? `/${r.path}` : ''}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: locale === defaultLocale ? r.priority : Math.max(0.1, r.priority - 0.1),
        alternates: { languages },
      });
    }
  }
  return entries;
}
