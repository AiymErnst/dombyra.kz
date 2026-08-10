import { Button } from "./ui";
import { NAV_LINKS } from "./data";

export default function Header({ menuOpen, onOpenMenu, onCloseMenu, dict }) {
  return (
    <>
      {/* ---------- шапка ---------- */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-brand-border bg-white/92 px-4 py-3 backdrop-blur-md lg:px-[max(28px,calc((100%-1180px)/2))]">
        <button
          onClick={onOpenMenu}
          aria-label="Открыть меню"
          className="flex h-11 w-11 flex-col justify-center gap-[5px] border-none bg-transparent pl-0.5 lg:hidden"
        >
          <span className="block h-0.5 w-[22px] bg-brand-blue" />
          <span className="block h-0.5 w-3.5 bg-brand-ink" />
          <span className="block h-0.5 w-[22px] bg-brand-ink" />
        </button>

        <div className="text-[17px] font-extrabold tracking-tight">
          dombyra<span className="text-brand-blue">.kz</span>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 font-brand text-[13px] font-semibold text-brand-ink hover:text-brand-teal"
            >
              {dict.nav[link.key]}
              {link.badge && (
                <span className="rounded-full bg-brand-lime px-1.5 py-1 font-brand text-[8.5px] font-extrabold tracking-[0.1em] text-brand-ink">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="font-brand text-[11px] font-bold tracking-[0.1em] text-brand-ink/40">
            KZ
          </span>
          <span className="h-3 w-px bg-brand-border" />
          <span className="font-brand text-[11px] font-bold tracking-[0.1em] text-brand-blue">
            RU
          </span>
        </div>
      </header>

      {/* ---------- мобильное меню ---------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-brand-bg px-5 pb-8 pt-4 lg:hidden">
          <div className="mb-7 flex h-11 items-center justify-between">
            <div className="text-[17px] font-extrabold tracking-tight">
              dombyra<span className="text-brand-blue">.kz</span>
            </div>
            <button
              onClick={onCloseMenu}
              aria-label="Закрыть меню"
              className="flex h-11 w-11 items-center justify-center border-none bg-transparent text-[26px] font-bold text-brand-blue"
            >
              ×
            </button>
          </div>
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onCloseMenu}
                className="flex items-center gap-2.5 border-b border-[#D8E0EE] py-2.5 font-brand text-[30px] font-extrabold leading-[1.15] tracking-tight text-brand-ink last:border-b-0"
              >
                {dict.nav[link.key]}
                {link.badge && (
                  <span className="rounded-full bg-brand-lime px-1.5 py-1 font-brand text-[9.5px] font-extrabold tracking-[0.12em] text-brand-ink">
                    БЕСПЛАТНО
                  </span>
                )}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3.5 pt-8">
            <a href="tel:+77001234567" className="font-brand text-xl font-bold">
              +7 700 123 45 67
            </a>
            <div className="font-brand text-[13px] text-brand-ink/60">
              Алматы, ул. Панфилова 98
              <br />
              Ежедневно 10:00 — 20:00
            </div>
            <Button className="w-full">Купить домбру</Button>
          </div>
        </div>
      )}
    </>
  );
}
