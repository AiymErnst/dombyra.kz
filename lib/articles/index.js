// lib/articles/index.js
//
// ── Как добавить новую статью ──
// 1. Скопируйте файл kak-vybrat-dombru.js в этой же папке
// 2. Переименуйте копию — имя файла станет slug'ом статьи
// 3. Поменяйте slug/category_key/title/excerpt/content внутри файла —
//    ВСТАВЬТЕ РЕАЛЬНЫЙ ТЕКСТ вместо комментариев-подсказок
// 4. Добавьте ДВЕ строчки сюда, в этот файл:
//    — import в начале (по образцу строк ниже)
//    — сам импортированный объект в массив ARTICLES
// 5. В файле slugs.js (рядом) добавьте адреса статьи на kz/en/tr.
//    Можно не добавлять — тогда на всех языках будет русский адрес.
import { ARTICLE_SLUGS, OLD_ARTICLE_SLUGS, baseArticleSlug, localizedArticleSlug } from "./slugs";
import kakVybratDombru from "./kak-vybrat-dombru";
import dlyaRebenka from "./dlya-rebenka";
import kakoeDerevo from "./kakoe-derevo";

export const ARTICLES = [
  kakVybratDombru,
  dlyaRebenka,
  kakoeDerevo,
  // сюда добавлять новые статьи через запятую
];

export function getArticles() {
  return ARTICLES;
}

// Находит статью по ЛЮБОМУ её адресу: русскому, казахскому, английскому,
// турецкому или старому (см. slugs.js).
export function getArticle(slug) {
  const base = baseArticleSlug(slug) || slug;
  return ARTICLES.find((a) => a.slug === base) || null;
}

// Адрес статьи на нужном языке: 'dombyra-qalai-tandau' для kz и т.п.
export function articleSlug(article, locale) {
  return localizedArticleSlug(article.slug, locale);
}

// Полный путь статьи на нужном языке: '/kz/blog/dombyra-qalai-tandau'
export function articlePath(article, locale) {
  return `/${locale}/blog/${articleSlug(article, locale)}`;
}

// Проверка адресов при сборке: если в slugs.js опечатка (повтор адреса,
// пробел, заглавная буква, адрес несуществующей статьи) — сборка на
// Vercel остановится с понятным сообщением, а не выпустит битые ссылки.
(function checkSlugs() {
  const FORMAT = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  const seen = new Map();
  const add = (slug, where) => {
    if (!FORMAT.test(slug)) {
      throw new Error(`[статьи] Адрес «${slug}» (${where}): только латиница в нижнем регистре, цифры и дефисы.`);
    }
    if (seen.has(slug)) {
      throw new Error(`[статьи] Адрес «${slug}» повторяется: ${seen.get(slug)} и ${where}.`);
    }
    seen.set(slug, where);
  };
  for (const a of ARTICLES) add(a.slug, `статья ${a.slug}`);
  for (const [base, bySlug] of Object.entries(ARTICLE_SLUGS)) {
    if (!ARTICLES.some((a) => a.slug === base)) {
      throw new Error(`[статьи] В slugs.js есть «${base}», но такой статьи нет в ARTICLES.`);
    }
    for (const [locale, slug] of Object.entries(bySlug)) add(slug, `${base} (${locale})`);
  }
  for (const [old, base] of Object.entries(OLD_ARTICLE_SLUGS)) {
    add(old, `старый адрес → ${base}`);
    if (!ARTICLES.some((a) => a.slug === base)) {
      throw new Error(`[статьи] Старый адрес «${old}» ведёт на «${base}», но такой статьи нет.`);
    }
  }
})();

export function pick(map, locale) {
  if (!map || typeof map !== "object") return "";
  if (map[locale]) return map[locale];
  for (const code of ["ru", "kz", "en", "tr"]) if (map[code]) return map[code];
  return "";
}

export function articleBlocks(article, locale) {
  const c = article?.content;
  if (!c || typeof c !== "object") return [];
  return Array.isArray(c[locale]) ? c[locale] : [];
}

export function firstParagraph(article, locale) {
  const b = articleBlocks(article, locale).find((x) => x.type === "p");
  return b ? b.text : pick(article.excerpt, locale);
}

export function availableLocales(article) {
  const c = article?.content;
  if (!c || typeof c !== "object") return [];
  return Object.keys(c).filter((l) => Array.isArray(c[l]) && c[l].length > 0);
}
