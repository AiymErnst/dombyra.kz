import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import DombraGallery from "./DombraGallery";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { data: item } = await supabase
    .from("dombras")
    .select("name_ru, description_ru")
    .eq("slug", params.slug)
    .single();

  if (!item) return {};
  return {
    title: `${item.name_ru} — dombyra.kz`,
    description: item.description_ru,
  };
}

export default async function DombraPage({ params }) {
  const { data: item, error } = await supabase
    .from("dombras")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1000px] px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <DombraGallery photos={item.photos} name={item.name_ru} />

      <div>
        <h1 className="font-serif text-3xl text-brand-ink mb-2">
          {item.name_ru}
        </h1>
        <p className="text-2xl text-amber-700 font-semibold mb-4">
          от {item.base_price.toLocaleString("ru-RU")} ₸
        </p>

        <p className="text-sm text-brand-ink/60 border-l-2 border-amber-500 pl-3 mb-6">
          Итоговая цена зависит от выбранной породы дерева, дополнительных
          украшений и наличия серебряной накладки 925 пробы.
        </p>

        {item.description_ru && (
          <p className="text-brand-ink/80 leading-relaxed mb-6">
            {item.description_ru}
          </p>
        )}

        {item.wood_types?.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-brand-ink/70 mb-1.5">
              Доступные породы дерева
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.wood_types.map((wood) => (
                <span
                  key={wood}
                  className="text-xs px-2.5 py-1 rounded-full bg-brand-ink/5 text-brand-ink/70"
                >
                  {wood}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-8">
          {item.has_silver_option && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
              Есть вариант с серебром 925 пробы
            </span>
          )}
          {item.has_decoration_option && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
              Есть доп. украшения
            </span>
          )}
        </div>

        {/* Замени на свою форму заказа / ссылку на WhatsApp / телефон */}
        <a
          href="https://wa.me/YOUR_NUMBER"
          className="inline-block px-6 py-3 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
        >
          Заказать / уточнить цену
        </a>
      </div>
    </main>
  );
}
