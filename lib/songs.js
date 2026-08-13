// lib/songs.js
//
// Доступ к мелодиям С СЕРВЕРА (на сборке и при ревалидации).
// Именно этот путь важен для поиска: данные попадают в HTML до отправки
// в браузер. Тренажёр внутри iframe читает базу отдельно, своим клиентом,
// и его содержимое робот не видит — поэтому текст берём здесь.

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    'Не заданы NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
    'Добавьте их в .env.local и в переменные окружения проекта на Vercel.'
  );
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

/** Список всех мелодий: нужен для генерации адресов и страницы каталога. */
export async function getSongCatalog() {
  const { data, error } = await supabase.rpc('get_song_catalog');
  if (error) {
    console.error('[songs] каталог не загрузился:', error);
    return [];
  }
  return data || [];
}

/** Одна мелодия по slug. Возвращает null, если такой нет — страница отдаст 404. */
export async function getSongBySlug(slug) {
  const { data, error } = await supabase.rpc('get_song_page', { p_slug: slug });
  if (error) {
    console.error('[songs] мелодия не загрузилась:', slug, error);
    return null;
  }
  return (data && data[0]) || null;
}

// ── помощники для вывода ──

/** Перевод с откатом: текущий язык → исходная колонка → любой заполненный. */
export function pickLang(map, legacy, locale) {
  if (map && typeof map === 'object') {
    if (map[locale]) return map[locale];
    if (legacy) return legacy;
    for (const code of ['kz', 'ru', 'en', 'tr']) if (map[code]) return map[code];
  }
  return legacy || '';
}

export const songTitle  = (s, locale) => pickLang(s.title_i18n, s.title, locale);
export const songAuthor = (s, locale) => pickLang(s.author_i18n, s.author, locale);

/** Абзацы описания. Если на нужном языке их нет — не подставляем чужой:
 *  чужой язык на странице хуже, чем его отсутствие. */
export function songParagraphs(s, locale) {
  const d = s.description_i18n;
  if (!d || typeof d !== 'object') return [];
  return Array.isArray(d[locale]) ? d[locale] : [];
}

/** Уровень сложности из тегов: там он лежит строкой-числом. */
export function songDifficulty(s) {
  const tag = (s.tags || []).find((t) => t.category === 'difficulty');
  const n = tag ? parseInt(tag.name, 10) : NaN;
  return Number.isFinite(n) ? n : null;
}

export function songGenres(s, locale) {
  return (s.tags || [])
    .filter((t) => t.category === 'genre')
    .map((t) => (locale === 'kz' ? t.name_kz || t.name : t.name));
}

/** Языки, на которых у мелодии есть описание. */
export function availableLocales(song) {
  const d = song.description_i18n;
  if (!d || typeof d !== 'object') return [];
  return Object.keys(d).filter((l) => Array.isArray(d[l]) && d[l].length > 0);
}
