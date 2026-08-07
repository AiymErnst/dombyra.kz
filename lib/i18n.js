import ru from '@/locales/ru.json';
import kz from '@/locales/kz.json';
import en from '@/locales/en.json';
import tr from '@/locales/tr.json';

const dictionaries = { ru, kz, en, tr };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.ru;
}

export const locales = ['kz', 'ru', 'en', 'tr'];
export const defaultLocale = 'ru';
