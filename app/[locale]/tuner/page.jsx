// app/[locale]/tuner/page.jsx
// Тонкая обёртка: вся разметка и SEO-обвязка в общем ModePage.

import { getDictionary, locales } from '@/lib/i18n';
import ModePage, { buildMetadata } from '@/app/components/ModePage';

const MODE = 'tuner';

// Страницы всех четырёх языков генерируются на сборке
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, mode: MODE, dict: getDictionary(locale) });
}

export default async function Page({ params }) {
  const { locale } = await params;
  return <ModePage locale={locale} mode={MODE} dict={getDictionary(locale)} />;
}
