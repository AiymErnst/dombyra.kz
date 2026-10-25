// app/sitemap.js → /sitemap.xml
import { locales, defaultLocale } from '@/lib/i18n';
import { getSongCatalog } from '@/lib/songs';
import { getDombras } from '@/lib/dombras';
import { getArticles, articleSlug, articleBlocks } from '@/lib/articles';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';
const HL = { kz: 'kk-KZ', ru: 'ru-KZ', en: 'en', tr: 'tr-TR' };

export const revalidate = 3600;

export default async function sitemap() {
  const [songs, dombras] = await Promise.all([
    getSongCatalog(),
    getDombras(1000, 0),
  ]);

  // У большинства страниц адрес на всех языках одинаковый, меняется только
  // префикс (/ru/katalog, /kz/katalog). Такие страницы — { path }.
  const routes = [
    { path: '', priority: 1.0 },
    { path: 'katalog', priority: 0.9 },
    { path: 'tuner', priority: 0.9 },
    { path: 'learn', priority: 0.8 },
    { path: 'karaoke', priority: 0.8 },
    { path: 'songs', priority: 0.8 },
    { path: 'blog', priority: 0.8 },
    { path: 'about', priority: 0.6 },
    ...(dombras.items || [])
      .filter((d) => d.slug)
      .map((d) => ({ path: `katalog/${d.slug}`, priority: 0.8 })),
    ...songs.filter((s) => s.slug).map((s) => ({ path: `songs/${s.slug}`, priority: 0.7 })),
  ].map((r) => ({
    priority: r.priority,
    paths: Object.fromEntries(locales.map((l) => [l, r.path])),
  }));

  // Статьи блога берутся из файлов lib/articles (не из Supabase — раньше
  // здесь был старый список из базы). У статьи на каждом языке свой адрес
  // (lib/articles/slugs.js), и в карту попадают только языки, на которые
  // статья переведена.
  for (const article of getArticles()) {
    const paths = {};
    for (const l of locales) {
      if (articleBlocks(article, l).length > 0) paths[l] = `blog/${articleSlug(article, l)}`;
    }
    if (Object.keys(paths).length > 0) routes.push({ priority: 0.7, paths });
  }

  const url = (l, path) => `${SITE}/${l}${path ? `/${path}` : ''}`;

  const entries = [];
  for (const r of routes) {
    const langs = locales.filter((l) => l in r.paths);
    // hreflang: все языковые версии этой страницы ссылаются друг на друга
    const languages = Object.fromEntries(langs.map((l) => [HL[l], url(l, r.paths[l])]));
    for (const locale of langs) {
      const p = locale === defaultLocale ? r.priority : Math.max(0.1, r.priority - 0.1);
      entries.push({
        url: url(locale, r.paths[locale]),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: Math.round(p * 10) / 10,
        alternates: { languages },
      });
    }
  }
  return entries;
}
