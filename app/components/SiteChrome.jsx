"use client";
// app/components/SiteChrome.jsx
//
// Шапка + подвал вокруг любой страницы внутри /[locale].
// Живёт в app/[locale]/layout.jsx, поэтому не нужно добавлять Header
// и Footer вручную в каждую новую страницу.
//
// Клиентский, потому что path (путь без языкового префикса) нужен и
// Header'у, и Footer'у, а узнать его можно только через usePathname.
// Тренажёр, тюнер и караоке лежат ВНЕ [locale] — их этот layout не
// оборачивает, у них своя шапка внутри simulator.html.

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteChrome({ dict, locale, children }) {
  const pathname = usePathname() || "";

  // '/kz/katalog' → '/katalog', '/kz' → '' (признак главной: на ней
  // пункты меню работают как якоря, на остальных — как ссылки)
  const path = pathname.replace(`/${locale}`, "") || "";

  return (
    <>
      <Header dict={dict} locale={locale} path={path} />
      {children}
      <Footer dict={dict} locale={locale} path={path} />
    </>
  );
}
