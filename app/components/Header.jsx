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
//
// Телефон и WhatsApp — общие на весь сайт, не переводятся по языкам
// (номер один и тот же независимо от locale).

import { useState } from "react";
import { Button } from "./ui";
import { NAV_LINKS } from "./data";
import { navHref } from "./navHref";
import LangSwitch from "./LangSwitch";

const PHONE_DISPLAY = "+7 (775) 522 69 01";
const PHONE_TEL = "+77755226901";
const WHATSAPP_URL = "https://wa.me/77755226901";

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18c-1.5 0-3-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3C4.4 15 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.7-.3-1.4-.8-2-1.4-.5-.5-1-1.1-1.3-1.8-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.1 1.8 2.8 4.4 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export default function Header({
  dict,
  locale,
  path = "",
  available,
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

        {/* Телефон и WhatsApp — только на широких экранах, чтобы не
            толкаться с меню и переключателем языка на планшете */}
        <div className="hidden items-center gap-3 lg:flex">
          
            href={`tel:${PHONE_TEL}`}
            className="whitespace-nowrap font-brand text-[13px] font-bold text-brand-ink hover:text-brand-blue"
          >
            {PHONE_DISPLAY}
          </a>
          
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#25D366]"
          >
            <WhatsAppIcon className="h-4.5 w-4.5 text-white" />
          </a>
        </div>

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
              
                key={link.key}
                href={navHref(link, locale, isLanding)}
                onClick={close}
                className="flex items-center gap-2.5 border-b border-[#D8E0EE] py-2.5 font-brand text-[30px] font-extrabold leading-[1.15] tracking-tight text-brand-ink last:border-b-0"
              >
                {nav[link.key]}
                {link.badge && (
                  <span className="rounded-full bg-brand-lime px-1.5 py-1 font-brand text-[9.5px] font-extrabold tracking-[0.12em] text-brand-ink">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3.5 pt-8">
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

            <div className="flex items-center gap-3">
              <a href={`tel:${PHONE_TEL}`} className="font-brand text-xl font-bold">
                {PHONE_DISPLAY}
              </a>
              
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#25D366]"
              >
                <WhatsAppIcon className="h-5 w-5 text-white" />
              </a>
            </div>
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
