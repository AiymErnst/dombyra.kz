// lib/posts.js
//
// Статьи блога. Читаются С СЕРВЕРА — как и описания мелодий, текст должен
// попасть в HTML до отправки в браузер, иначе робот его не увидит.

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error('Не заданы NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

/** Список опубликованных статей. limit = null → все. */
export async function getPosts(limit = null) {
  const { data, error } = await supabase.rpc('get_posts', { limit_count: limit });
  if (error) {
    console.error('[blog] список статей не загрузился:', error);
    return [];
  }
  return data || [];
}

/** Одна статья по slug. null — если нет или снята с публикации. */
export async function getPost(slug) {
  const { data, error } = await supabase.rpc('get_post', { p_slug: slug });
  if (error) {
    console.error('[blog] статья не загрузилась:', slug, error);
    return null;
  }
  return (data && data[0]) || null;
}

// ── помощники ──

/** Перевод с откатом: нужный язык → русский → любой заполненный. */
export function pick(map, locale) {
  if (!map || typeof map !== 'object') return '';
  if (map[locale]) return map[locale];
  for (const code of ['ru', 'kz', 'en', 'tr']) if (map[code]) return map[code];
  return '';
}

/** Блоки статьи. Чужой язык НЕ подставляем: статья целиком на другом
 *  языке хуже, чем её отсутствие. Пустой массив → страница 404. */
export function postBlocks(post, locale) {
  const c = post.content_i18n;
  if (!c || typeof c !== 'object') return [];
  return Array.isArray(c[locale]) ? c[locale] : [];
}

/** Первый абзац — для meta description и превью. */
export function firstParagraph(post, locale) {
  const b = postBlocks(post, locale).find((x) => x.type === 'p');
  return b ? b.text : pick(post.excerpt_i18n, locale);
}

/** Языки, на которых статья действительно написана.
 *  Нужен переключателю: языки без перевода он показывает неактивными. */
export function availableLocales(post) {
  const c = post.content_i18n;
  if (!c || typeof c !== 'object') return [];
  return Object.keys(c).filter((l) => Array.isArray(c[l]) && c[l].length > 0);
}
