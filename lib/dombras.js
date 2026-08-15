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
