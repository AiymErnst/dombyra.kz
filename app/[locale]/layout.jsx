import { getDictionary, locales } from '@/lib/i18n';
import SiteChrome from '@/app/components/SiteChrome';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

// Шапка и подвал теперь здесь — значит есть на ВСЕХ страницах внутри
// /[locale] (главная, каталог, блог, статьи...), добавлять вручную в
// каждую новую страницу не нужно.
// Тренажёр/тюнер/караоке лежат вне [locale] и этим layout не
// оборачиваются — у них своя шапка внутри simulator.html.
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <SiteChrome dict={dict} locale={locale}>
      {children}
    </SiteChrome>
  );
}
