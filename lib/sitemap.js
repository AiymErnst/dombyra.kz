// app/sitemap.js → /sitemap.xml
import { locales, defaultLocale } from '@/lib/i18n';
import { getSongCatalog } from '@/lib/songs';
import { getPosts } from '@/lib/posts';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dombyra.kz';
const HL = { kz: 'kk-KZ', ru: 'ru-KZ', en: 'en', tr: 'tr-TR' };

export const revalidate = 3600;

export default async function sitemap() {
  const [songs, posts] = await Promise.all([getSongCatalog(), getPosts()]);

  const routes = [
    { path: '', priority: 1.0 },
    { path: 'tuner', priority: 0.9 },
    { path: 'learn', priority: 0.8 },
    { path: 'karaoke', priority: 0.8 },
    { path: 'songs', priority: 0.8 },
    { path: 'blog', priority: 0.8 },
    ...songs.filter((s) => s.slug).map((s) => ({ path: `songs/${s.slug}`, priority: 0.7 })),
    ...posts.map((p) => ({ path: `blog/${p.slug}`, priority: 0.7 })),
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
