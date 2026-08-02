import { supabase } from "./supabase";

// Список мелодий, отсортированный так же, как задано в админке (sort_order).
// tagIds — необязательный фильтр: показать только мелодии с этими тегами.
export async function getSongs({ tagIds } = {}) {
  let query = supabase
    .from("songs")
    .select("id, title, title_kz, sections, is_premium, difficulty, sort_order")
    .order("sort_order", { ascending: true });

  if (tagIds?.length) {
    const { data: matches } = await supabase
      .from("song_tags")
      .select("song_id")
      .in("tag_id", tagIds);
    const ids = [...new Set((matches || []).map((m) => m.song_id))];
    query = query.in("id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getTags() {
  const { data, error } = await supabase
    .from("tags")
    .select("id, name, name_kz, category")
    .order("category", { ascending: true });
  if (error) throw error;
  return data;
}
