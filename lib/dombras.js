// lib/dombras.js
//
// Работа с каталогом домбр в Supabase — по аналогии с lib/posts.js:
// все запросы к базе живут здесь, компоненты получают готовые данные.
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Список домбр. limit — сколько взять (для превью на главной), offset —
// с какой позиции (для кнопки «Показать ещё» на странице каталога).
export async function getDombras(limit = 9, offset = 0) {
  const { data, error, count } = await supabase
    .from("dombras")
    .select("*", { count: "exact" })
    .eq("in_stock", true)
    .order("sort_order", { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[каталог] список домбр не загрузился:", error);
    return { items: [], total: 0 };
  }
  return { items: data || [], total: count || 0 };
}

// Одна домбра по slug — для страницы /katalog/[slug]
export async function getDombraBySlug(slug) {
  const { data, error } = await supabase
    .from("dombras")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[каталог] домбра не загрузилась:", error);
    return null;
  }
  return data;
}

// В таблице есть name_ru/name_kz и description_ru/description_kz.
// name_en/name_tr/description_en/description_tr нужно добавить в
// Supabase отдельно (см. ALTER TABLE в чате) — если поле для текущего
// языка ещё пустое или колонки ещё не существует, аккуратно
// откатываемся на русский, потом на казахский. Так карточка никогда
// не останется без названия, даже если перевод ещё не заполнен.
export function localizedDombraName(item, locale) {
  return item?.[`name_${locale}`] || item?.name_ru || item?.name_kz || "";
}

export function localizedDombraDescription(item, locale) {
  return (
    item?.[`description_${locale}`] ||
    item?.description_ru ||
    item?.description_kz ||
    ""
  );
}
