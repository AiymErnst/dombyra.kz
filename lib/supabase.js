import { createClient } from "@supabase/supabase-js";

// Публичный клиент — безопасен для использования в браузере.
// Anon key НЕ даёт доступа на запись к мелодиям/тегам (это защищено
// правилами Row Level Security в supabase/schema.sql — писать может
// только пользователь с ролью admin).
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
