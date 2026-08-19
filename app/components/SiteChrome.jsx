"use client";
// app/components/SiteChrome.jsx
//
// Шапка + подвал вокруг любой страницы внутри /[locale].
// Живёт в app/[locale]/layout.jsx, поэтому не нужно добавлять Header
// и Footer вручную в каждую новую страницу.
//
// Клиентский, потому что path (путь без языкового префикса) нужен и
// Header'у, и Footer'у, а узнать его можно только через usePathname.

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

// Страницы тренажёра. У них СВОЯ панель управления внутри самого
// тренажёра — там переключение режимов, язык, тема и вход в аккаунт.
// Шапка сайта поверх неё давала две панели одна над другой, поэтому
// здесь её не рисуем. Подвал остаётся: он ниже SEO-текста, ничему не
// мешает и даёт ссылки на остальной сайт.
const TRAINER_PATHS = ["/tuner", "/learn", "/karaoke"];

export default function SiteChrome({ dict, locale, children }) {
  const pathname = usePathname() || "";

  // '/kz/katalog' → '/katalog', '/kz' → '' (признак главной: на ней
  // пункты меню работают как якоря, на остальных — как ссылки)
  const path = pathname.replace(`/${locale}`, "") || "";

  const isTrainer = TRAINER_PATHS.includes(path);

  return (
    <>
      {!isTrainer && <Header dict={dict} locale={locale} path={path} />}
      {children}
      <Footer dict={dict} locale={locale} path={path} />
    </>
  );
}
