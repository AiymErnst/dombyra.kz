"use client";
// app/components/Header.jsx
//
// ОДНА шапка на весь сайт: лендинг, блог, страницы мелодий и любые
// будущие страницы. Раньше их было две — здесь и в TextPageHeader,
// и меню пришлось бы поддерживать в двух местах.
//
// Отличие только в поведении якорей: на главной #catalog работает как
// якорь, на остальных страницах превращается в /{locale}#catalog.
//
// Шапка тренажёра остаётся отдельной — там вкладки режимов вместо
// навигации. Сведём её, когда будем разбирать simulator.html.

import { useState } from "react";
import { Button } from "./ui";
import { NAV_LINKS } from "./data";
import { navHref } from "./navHref";
import LangSwitch from "./LangSwitch";

export default function Header({
  dict,
  locale,
  // путь без языкового префикса: '' на главной, '/blog/slug' на статье.
  // По нему строятся ссылки языковых версий.
  path = "",
  // языки, на которые страница переведена. Не задан → доступны все
  available,
  // Меню может управляться снаружи (лендингу это нужно для StickyBuyBar),
  // а может само — тогда пропсы не передаются.
  menuOpen: menuOpenProp,
  onOpenMenu,
  onCloseMenu,
}) {
  const [selfOpen, setSelfOpen] = useState(false);
  const controlled = menuOpenProp !== undefined;
  const menuOpen = controlled ? menuOpenProp : selfOpen;
  const open = () => (controlled ? onOpenMenu?.() : setSelfOpen(true));
  const close = () => (controlled ? onCloseMenu?.() : setSelfOpen(false));

  const isLanding = path === "";
  const nav = dict?.nav || {};

  const Brand = () => (
    <a href={`/${locale}`} className="text-[17px] font-extrabold tracking-tight">
      dombyra<span className="text-brand-blue">.kz</span>
    </a>
  );

  return (
    <>
      {/* ---------- шапка ---------- */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-brand-border bg-white/92 px-4 py-3 backdrop-blur-md lg:px-[max(28px,calc((100%-1180px)/2))]">
        <button
          onClick={open}
          aria-label={nav.openMenu || "Меню"}
          className="flex h-11 w-11 flex-col justify-center gap-[5px] border-none bg-transparent pl-0.5 lg:hidden"
        >
          <span className="block h-0.5 w-[22px] bg-brand-blue" />
          <span className="block h-0.5 w-3.5 bg-brand-ink" />
          <span className="block h-0.5 w-[22px] bg-brand-ink" />
        </button>

        <Brand />

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={navHref(link, locale, isLanding)}
              className="flex items-center gap-1.5 font-brand text-[13px] font-semibold text-brand-ink hover:text-brand-teal"
            >
              {nav[link.key]}
              {link.badge && (
                <span className="rounded-full bg-brand-lime px-1.5 py-1 font-brand text-[8.5px] font-extrabold tracking-[0.1em] text-brand-ink">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* На телефоне язык переехал вниз мобильного меню: в верхней
            панели рядом с бургером и логотипом четыре языка не помещаются */}
        <div className="hidden lg:flex">
          <LangSwitch locale={locale} path={path} available={available} dict={dict} />
        </div>
      </header>

      {/* ---------- мобильное меню ---------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-brand-bg px-5 pb-8 pt-4 lg:hidden">
          <div className="mb-7 flex h-11 items-center justify-between">
            <Brand />
            <button
              onClick={close}
              aria-label={nav.closeMenu || "Закрыть"}
              className="flex h-11 w-11 items-center justify-center border-none bg-transparent text-[26px] font-bold text-brand-blue"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={navHref(link, locale, isLanding)}
                onClick={close}
                className="flex items-center gap-2.5 border-b border-[#D8E0EE] py-2.5 font-brand text-[30px] font-extrabold leading-[1.15] tracking-tight text-brand-ink last:border-b-0"
              >
                {nav[link.key]}
                {/* бейдж берётся из данных: раньше здесь было захардкожено
                    «БЕСПЛАТНО», и на казахском выводилось русское слово */}
                {link.badge && (
                  <span className="rounded-full bg-brand-lime px-1.5 py-1 font-brand text-[9.5px] font-extrabold tracking-[0.12em] text-brand-ink">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3.5 pt-8">
            {/* язык — привычное место внизу мобильного меню, здесь есть
                место показать все четыре и подписать недоступные */}
            <div className="flex items-center gap-2 border-b border-[#D8E0EE] pb-4">
              <span className="font-brand text-[11px] font-bold tracking-[0.14em] text-brand-ink/40">
                {nav.language || "TIL"}
              </span>
              <LangSwitch
                locale={locale}
                path={path}
                available={available}
                dict={dict}
                size="lg"
              />
            </div>

            <a href="tel:+77001234567" className="font-brand text-xl font-bold">
              +7 700 123 45 67
            </a>
            <div className="font-brand text-[13px] text-brand-ink/60">
              {dict?.contacts?.address}
              <br />
              {dict?.contacts?.hours}
            </div>
            <Button className="w-full">{dict?.hero?.cta}</Button>
          </div>
        </div>
      )}
    </>
  );
}
