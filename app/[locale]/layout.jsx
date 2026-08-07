import { locales } from '@/lib/i18n';
import '../globals.css'; // подставь свой путь к глобальным стилям, если он другой

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
