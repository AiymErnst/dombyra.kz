// lib/articles/index.js
import kakVybratDombru from "./kak-vybrat-dombru";
import dlyaRebenka from "./dlya-rebenka";

export const ARTICLES = [
  kakVybratDombru,
  dlyaRebenka,
];

export function getArticles() {
  return ARTICLES;
}

export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug) || null;
}

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
