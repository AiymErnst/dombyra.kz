// app/components/Footer.jsx
//
// Ссылки строятся тем же навигационным хелпером, что и в шапке.
// Раньше здесь были якоря #trainer и #tuner — блоков с такими именами
// не существует, тренажёр и тюнер стали отдельными страницами,
// и клик по этим ссылкам не делал ничего.

import { FOOTER_LINKS } from "./data";
import { navHref } from "./navHref";

export default function Footer({ dict, locale, path = "" }) {
  const isLanding = path === "";
  const f = dict?.footer || {};
  const nav = dict?.nav || {};
  const label = (key) => f.links?.[key] || nav[key] || key;

  return (
    <footer className="bg-brand-ink px-5 py-9 pb-24 text-white lg:px-7">
      <div className="lg:mx-auto lg:max-w-[1180px]">
        <a href={`/${locale}`} className="text-[22px] font-extrabold tracking-tight">
          dombyra<span className="text-brand-lime">.kz</span>
        </a>
        <p className="mt-2.5 mb-6 max-w-[280px] font-brand text-[13px] font-medium leading-relaxed text-white/55">
          {f.tagline}
        </p>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {FOOTER_LINKS.map((col) => (
            <div key={col.titleKey} className="flex flex-col gap-2.5">
              <div className="font-brand text-[10.5px] font-bold tracking-[0.14em] text-white/40">
                {f.columns?.[col.titleKey]}
              </div>
              {col.items.map((item) => (
                <a
                  key={item.labelKey}
                  href={navHref(item, locale, isLanding)}
                  className="font-brand text-[13.5px] font-medium text-white"
                >
                  {label(item.labelKey)}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3.5 border-t border-white/12 pt-5">
          <a href="tel:+77001234567" className="font-brand text-lg font-bold text-brand-lime">
            +7 700 123 45 67
          </a>
          <div className="font-brand text-[13px] font-medium text-white/55">
            {dict?.contacts?.address}
            <br />
            salem@dombyra.kz
          </div>
          <div className="flex gap-2">
            {["IG", "YT", "TT", "WA"].map((s) => (
              <span
                key={s}
                className="flex items-center justify-center border border-white/25 px-3 py-2 font-brand text-[11px] font-bold tracking-[0.1em]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 font-brand text-[11px] font-medium text-white/35">
          © {new Date().getFullYear()} dombyra.kz · {f.legal}
        </div>
      </div>
    </footer>
  );
}
