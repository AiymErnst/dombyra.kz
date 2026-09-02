// lib/articles/index.js
//
// Собирает все статьи из отдельных файлов в этой же папке в один
// список и даёт остальному сайту те же функции, что были раньше.
//
// ── Как добавить новую статью ──
// 1. Скопируйте файл kak-vybrat-dombru.js в этой же папке
// 2. Переименуйте копию — имя файла станет slug'ом статьи
//    (например, dombra-dlya-rebenka.js → адрес /blog/dombra-dlya-rebenka)
// 3. Поменяйте slug/category_key/title/excerpt/content внутри файла
// 4. Добавьте ДВЕ строчки сюда, в этот файл:
//    — import в начале (по образцу строки ниже)
//    — сам импортированный объект в массив ARTICLES
// Больше нигде ничего трогать не нужно — страницы (page.jsx) сами
// подхватят новую статью через getArticles()/getArticle().
import kakVybratDombru from "./kak-vybrat-dombru";

export const ARTICLES = [
  kakVybratDombru,
  // сюда добавлять новые статьи через запятую
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
