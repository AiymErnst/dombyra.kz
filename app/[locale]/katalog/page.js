// app/[locale]/katalog/page.js
//
// Страница каталога. Данные берём здесь, на сервере (как главная берёт
// posts), и передаём готовыми в клиентскую сетку KatalogGrid.
import { getDictionary } from "@/lib/i18n";
import { getDombras } from "@/lib/dombras";
import KatalogGrid from "./KatalogGrid";
import CatalogArticleLinks from "./CatalogArticleLinks";

export const revalidate = 3600;

const PAGE_SIZE = 9;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const c = dict.catalogPage || {};
  return {
    title: c.metaTitle || "Каталог домбр — dombyra.kz",
    description: c.metaDescription || "",
  };
}

export default async function KatalogPage({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { items, total } = await getDombras(PAGE_SIZE, 0);
  const c = dict.catalogPage || {};

  return (
    <main className="w-full px-5 py-10 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-16">
      <h1 className="font-brand text-[32px] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-brand-ink lg:text-[56px]">
        {c.title || "Каталог домбр"}
      </h1>

      <p className="mt-3 max-w-[520px] font-brand text-[15px] font-medium leading-relaxed text-brand-ink/62 lg:text-[17px]">
        {c.lead || "Каждая домбра — ручная работа с сертификатом подлинности."}
      </p>

      <p className="mt-5 max-w-[560px] border-l-2 border-brand-lime pl-3.5 font-brand text-[13px] font-medium leading-relaxed text-brand-ink/55 lg:text-[14px]">
        {c.priceNote ||
          "Итоговая цена зависит от выбранной породы дерева, дополнительных украшений и наличия серебряной накладки 925 пробы — точную стоимость уточняйте при заказе."}
      </p>

      <div className="mt-10 lg:mt-14">
        <KatalogGrid
          initialItems={items}
          totalCount={total}
          pageSize={PAGE_SIZE}
          locale={locale}
          dict={dict}
        />
      </div>

      <CatalogArticleLinks dict={dict} locale={locale} />
    </main>
  );
}
