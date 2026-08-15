// app/[locale]/katalog/[slug]/page.js
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { getDombraBySlug } from "@/lib/dombras";
import DombraGallery from "./DombraGallery";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getDombraBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.name_ru} — dombyra.kz`,
    description: item.description_ru || "",
  };
}

export default async function DombraPage({ params }) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const item = await getDombraBySlug(slug);

  if (!item) notFound();

  const c = dict.catalogPage || {};
  const name = locale === "kz" && item.name_kz ? item.name_kz : item.name_ru;
  const description =
    locale === "kz" && item.description_kz
      ? item.description_kz
      : item.description_ru;

  return (
    <main className="grid w-full grid-cols-1 gap-8 px-5 py-10 lg:mx-auto lg:max-w-[1180px] lg:grid-cols-2 lg:gap-14 lg:px-7 lg:py-16">
      <DombraGallery photos={item.photos} name={name} dict={dict} />

      <div>
        <h1 className="font-brand text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-brand-ink lg:text-[42px]">
          {name}
        </h1>

        <p className="mt-3 font-brand text-[22px] font-extrabold text-brand-blue lg:text-[28px]">
          {c.priceFrom || "от"} {item.base_price.toLocaleString("ru-RU")} ₸
        </p>

        <p className="mt-4 border-l-2 border-brand-lime pl-3.5 font-brand text-[13px] font-medium leading-relaxed text-brand-ink/55">
          {c.priceNoteShort ||
            "Итоговая цена зависит от породы дерева, дополнительных украшений и серебряной накладки 925 пробы."}
        </p>

        {description && (
          <p className="mt-6 font-brand text-[15px] font-medium leading-relaxed text-brand-ink/70">
            {description}
          </p>
        )}

        {item.wood_types?.length > 0 && (
          <div className="mt-7">
            <div className="mb-2 font-brand text-[11px] font-bold uppercase tracking-[0.12em] text-brand-ink/45">
              {c.woodLabel || "Породы дерева"}
            </div>
            <div className="flex flex-wrap gap-2">
              {item.wood_types.map((wood) => (
                <span
                  key={wood}
                  className="border border-brand-border bg-brand-bg px-3 py-1.5 font-brand text-[12px] font-bold text-brand-ink/70"
                >
                  {wood}
                </span>
              ))}
            </div>
          </div>
        )}

        {(item.has_silver_option || item.has_decoration_option) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.has_silver_option && (
              <span className="border border-brand-border bg-brand-bg px-3 py-1.5 font-brand text-[12px] font-bold text-brand-blue">
                {c.silverOption || "Вариант с серебром 925 пробы"}
              </span>
            )}
            {item.has_decoration_option && (
              <span className="border border-brand-border bg-brand-bg px-3 py-1.5 font-brand text-[12px] font-bold text-brand-blue">
                {c.decorationOption || "Дополнительные украшения"}
              </span>
            )}
          </div>
        )}

        {/* TODO: замени на свой номер WhatsApp или ссылку на форму заказа */}
        <a
          href="https://wa.me/YOUR_NUMBER"
          className="mt-9 inline-block bg-brand-ink px-7 py-3.5 font-brand text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-85"
        >
          {c.orderCta || "Заказать / уточнить цену"}
        </a>
      </div>
    </main>
  );
}
