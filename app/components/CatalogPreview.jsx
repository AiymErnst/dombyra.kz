import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// раздел-превью на главной — id="catalog" совпадает с якорем в меню
// (href="#catalog" в NAV_LINKS), поэтому клик по пункту меню сразу сюда
// и проскроллит. Полный каталог со всеми товарами и пагинацией — на /katalog.
export default async function CatalogPreview() {
  const { data: items, error } = await supabase
    .from("dombras")
    .select("*")
    .eq("in_stock", true)
    .order("sort_order", { ascending: true })
    .limit(3);

  if (error) {
    console.error("[превью каталога] ошибка загрузки:", error);
  }

  return (
    <section id="catalog" className="mx-auto max-w-[1200px] px-4 py-16">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mb-2">
            Каталог домбр
          </h2>
          <p className="text-brand-ink/70">
            Ручная работа, сертификат подлинности. Цена — от{" "}
            <span className="text-amber-700 font-medium">100 000 ₸</span>,
            зависит от дерева, украшений и серебряной накладки 925 пробы.
          </p>
        </div>
        <Link
          href="/katalog"
          className="shrink-0 px-5 py-2.5 rounded-full border border-brand-ink/20 text-brand-ink/80 hover:border-amber-400 hover:text-amber-700 transition-colors text-sm whitespace-nowrap"
        >
          Смотреть весь каталог →
        </Link>
      </div>

      {(!items || items.length === 0) ? (
        <p className="text-brand-ink/50 text-sm">
          Каталог пока пуст — добавьте домбры в Supabase (таблица{" "}
          <code>dombras</code>).
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/katalog/${item.slug}`}
              className="group block rounded-2xl border border-brand-ink/10 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-brand-ink/5">
                {item.photos?.[0] ? (
                  <Image
                    src={item.photos[0]}
                    alt={item.name_ru}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-ink/30 text-sm">
                    Нет фото
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-brand-ink mb-1">
                  {item.name_ru}
                </h3>
                <p className="text-amber-700 font-semibold">
                  от {item.base_price.toLocaleString("ru-RU")} ₸
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
