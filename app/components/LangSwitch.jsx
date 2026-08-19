// app/components/LangSwitch.jsx
//
// Переключатель языка. Раньше в шапке стояли два неактивных <span>
// «KZ» и «RU» — не ссылки и без остальных двух языков.
//
// Языки без перевода показываются приглушённо и не кликаются. Прятать
// нельзя — читатель не поймёт, существует ли версия; вести на них тоже
// нельзя — получится русский текст под казахским адресом, а поисковик
// сочтёт это дублем.

import Link from "next/link";
import { locales } from "@/lib/i18n";

const LABEL = { kz: "KZ", ru: "RU", en: "EN", tr: "TR" };

export default function LangSwitch({ locale, path = "", available, dict, size = "sm" }) {
  const has = (l) => !available || available.includes(l);
  const hint = dict?.pages?.ui?.noTranslation || "";

  // lg — вариант для мобильного меню: там кнопки должны быть
  // достаточного размера для пальца, 11px не годятся
  const base =
    size === "lg"
      ? "rounded-lg px-3 py-2 font-brand text-[15px] font-bold tracking-[0.08em]"
      : "rounded px-1.5 py-1 font-brand text-[11px] font-bold tracking-[0.1em]";

  return (
    <nav className={`flex items-center ${size === "lg" ? "gap-1.5" : "gap-1"}`} aria-label="Language">
      {locales.map((l) => {
        const cls = base;

        if (l === locale) {
          return (
            <span key={l} className={`${cls} ${size === "lg" ? "bg-brand-blue/10" : ""} text-brand-blue`} aria-current="true">
              {LABEL[l]}
            </span>
          );
        }
        if (!has(l)) {
          return (
            <span
              key={l}
              title={hint}
              className={`${cls} text-brand-ink/20 line-through cursor-not-allowed`}
            >
              {LABEL[l]}
            </span>
          );
        }
        return (
          <Link
            key={l}
            href={`/${l}${path}`}
            className={`${cls} text-brand-ink/45 hover:text-brand-blue`}
          >
            {LABEL[l]}
          </Link>
        );
      })}
    </nav>
  );
}
