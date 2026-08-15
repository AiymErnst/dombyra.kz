import { createClient } from "@supabase/supabase-js";
import KatalogGrid from "./KatalogGrid";
import CatalogArticleLinks from "./CatalogArticleLinks";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PAGE_SIZE = 9;

export const metadata = {
  title: "Каталог домбр — dombyra.kz",
  description:
    "Домбры ручной работы с сертификатом подлинности. Цена зависит от породы дерева, дополнительных украшений и серебряной накладки 925 пробы.",
};

export const revalidate = 60;

export default async function KatalogPage() {
  const { data: items, error, count } = await supabase
    .from("dombras")
    .select("*", { count: "exact" })
    .eq("in_stock", true)
    .order("sort_order", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  if (error) {
    console.error("[каталог] ошибка загрузки:", error);
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl text-brand-ink mb-2">
        Каталог домбр
      </h1>
      <p className="text-brand-ink/70 max-w-2xl mb-3">
        Каждая домбра — ручная работа с сертификатом подлинности.
      </p>
      <p className="text-sm text-brand-ink/60 max-w-2xl mb-10 border-l-2 border-amber-500 pl-3">
        Итоговая цена зависит от выбранной породы дерева, дополнительных
        украшений и наличия серебряной накладки 925 пробы — точную стоимость
        уточняйте при заказе.
      </p>

      <KatalogGrid initialItems={items || []} totalCount={count || 0} />

      <CatalogArticleLinks />
    </main>
  );
}
