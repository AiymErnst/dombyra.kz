import { NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

// Пути режимов больше НЕ исключаются из локализации.
// Раньше /tuner, /learn, /karaoke проходили мимо префиксов: у них была
// одна языковая версия вместо четырёх, hreflang связывать было не с чем,
// а при появлении /ru/tuner возник бы дубль страницы.
// Теперь это /kz/tuner, /ru/tuner, /en/tuner, /tr/tuner,
// а старые адреса без префикса отдают 301 (см. next.config.mjs).

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/app/') ||   // статический тренажёр в public/app
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  // 308 вместо 307: постоянный редирект передаёт накопленные позиции
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};
