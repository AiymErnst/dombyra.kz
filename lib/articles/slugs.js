// lib/articles/slugs.js
//
// Адреса статей блога на каждом языке.
//
// Русский адрес — это slug в файле самой статьи
// (kak-vybrat-dombru.js → slug: "kak-vybrat-dombru"). Здесь — адреса
// для остальных языков. Например, казахская версия статьи
// «Как выбрать домбру» открывается по адресу /kz/blog/dombyra-qalai-tandau.
//
// Файл маленький и без текстов статей, поэтому его можно подключать
// где угодно — в том числе в переключателе языка в шапке.
//
// ── Новая статья ──
// Добавьте строку по образцу ниже. Если адрес для какого-то языка не
// указать, на этом языке будет русский адрес — это тоже работает.
// Адреса: только латиница в нижнем регистре, цифры и дефисы, без
// повторов (если ошибиться, сборка на Vercel остановится и скажет где).
export const ARTICLE_SLUGS = {
  "kak-vybrat-dombru": {
    kz: "dombyra-qalai-tandau",
    en: "how-to-choose-a-dombyra",
    tr: "dombyra-nasil-secilir",
  },
  "dlya-rebenka": {
    kz: "balaga-dombyra",
    en: "dombyra-for-kids",
    tr: "cocuklar-icin-dombyra",
  },
  "kakoe-derevo": {
    kz: "dombyra-qandai-agashtan",
    en: "best-wood-for-dombyra",
    tr: "dombyra-hangi-agactan",
  },
};

// Старые адреса статей, которые ещё где-то встречаются (прежний блог,
// ссылки в locales/*.json, закладки). Слева старый, справа — русский
// адрес статьи. Такие ссылки ведут на нужную статью, а не на 404.
export const OLD_ARTICLE_SLUGS = {
  "dombra-dlya-rebenka": "dlya-rebenka",
};

// Любой известный адрес статьи (на любом языке или старый) → её
// русский адрес. Неизвестный адрес → null.
export function baseArticleSlug(slug) {
  if (!slug) return null;
  if (ARTICLE_SLUGS[slug]) return slug;
  if (OLD_ARTICLE_SLUGS[slug]) return OLD_ARTICLE_SLUGS[slug];
  for (const [base, bySlug] of Object.entries(ARTICLE_SLUGS)) {
    if (Object.values(bySlug).includes(slug)) return base;
  }
  return null;
}

// Адрес статьи на нужном языке. Принимает любой известный адрес статьи.
// Статьи, которых нет в ARTICLE_SLUGS, на всех языках живут по своему
// единственному адресу — он и возвращается.
export function localizedArticleSlug(slug, locale) {
  const base = baseArticleSlug(slug) || slug;
  return ARTICLE_SLUGS[base]?.[locale] || base;
}

// Для переключателя языка: '/blog/kak-vybrat-dombru' на казахском →
// '/blog/dombyra-qalai-tandau'. Любой другой путь возвращается как есть.
export function localizeBlogPath(path, locale) {
  const m = /^\/blog\/([^/?#]+)(.*)$/.exec(path || "");
  if (!m) return path;
  return `/blog/${localizedArticleSlug(m[1], locale)}${m[2]}`;
}
