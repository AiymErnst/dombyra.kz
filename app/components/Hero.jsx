import { Placeholder } from "./ui";

// app/components/Hero.jsx
//
// Обложка лендинга. Раньше была разделена на две части (лайм-панель
// слева + фото справа) — по просьбе Айым теперь это одна цельная
// обложка на весь экран (~92vh), весь текст и кнопка лежат поверх
// фото с градиентом снизу для читаемости.
//
// Статистика (since/launch/clients) раньше была плоской 3-колоночной
// таблицей — Айым назвала это "старым дизайном". Теперь это три
// бейджа-стикера вразнобой (разный поворот, разная высота, разные
// цвета) поверх огромной полупрозрачной цифры года запуска фоном.
//
// Все тексты — из dict.hero.* и dict.stats.*, как и раньше. Новых
// ключей не потребовалось: подпись про количество клиентов собирается
// из dict.stats.clients.value + .label, а не из отдельного ключа.
export default function Hero({ sentinelRef, dict, locale }) {
  const hero = dict?.hero || {};
  const stats = dict?.stats || {};
  const localePrefix = locale ? `/${locale}` : "";

  return (
    <>
      {/* ---------- обложка ---------- */}
      <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-brand-ink">
        <img src="content/IMG_6974.PNG" alt="Домбыра" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 lg:px-12 lg:pb-16">
          <div className="lg:mx-auto lg:max-w-[1180px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
              <span className="font-brand text-[10px] font-bold tracking-[0.14em] text-white">
                {hero.badge}
              </span>
            </span>
            <h1 className="mt-4 text-balance font-brand text-[52px] font-extrabold uppercase leading-[0.88] tracking-[-0.035em] text-white sm:text-[68px] lg:text-[96px]">
              {hero.titleLine1}
              <br />
              <span className="font-display italic normal-case font-normal tracking-normal text-brand-lime">
                {hero.titleLine2}
              </span>
            </h1>
            <p className="mt-4 max-w-[420px] font-brand text-[14.5px] font-medium leading-relaxed text-white/75">
              {hero.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 rounded-full bg-brand-lime px-7 py-4 font-brand text-sm font-bold text-brand-ink"
              >
                {hero.cta}
              </a>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-brand-ink"
                    >
                      <Placeholder>фото</Placeholder>
                    </div>
                  ))}
                </div>
                <span className="font-brand text-[11.5px] font-semibold text-white/85">
                  {stats.clients?.value} {stats.clients?.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-5 top-11 max-w-[280px] rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur sm:right-8 sm:top-16 lg:right-12 lg:top-42">
          <div className="font-brand text-[13px] font-extrabold tracking-[0.06em] text-brand-blue">
            {hero.productName}
          </div>
          <div className="mt-0.5 whitespace-nowrap font-brand text-[11.5px] font-medium text-brand-ink/55">
            {hero.productDesc}
          </div>
        </div>

        <div ref={sentinelRef} className="absolute bottom-0 h-px w-full" />
      </section>

      {/* ---------- бегущая строка ---------- */}
      <div className="flex overflow-hidden bg-brand-ink text-brand-lime">
        <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-5.5 whitespace-nowrap px-3 py-2.5 font-brand text-[10.5px] font-bold tracking-[0.16em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-5.5">
              НАҒЫЗ ҚАЗАҚ — ҚАЗАҚ ЕМЕС, НАҒЫЗ ҚАЗАҚ — ДОМБЫРА!
              <span className="text-brand-lime">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- статистика — бейджи-стикеры ---------- */}
      <section className="relative overflow-hidden bg-brand-bg px-5 py-14 lg:px-12 lg:py-20">
        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-brand text-[130px] font-extrabold leading-none text-brand-ink/[0.04] sm:text-[200px]">
          {stats.launch?.year}
        </span>
        <div className="relative mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="w-[190px] -rotate-6 rounded-[28px] bg-white p-5 text-center shadow-xl">
            <div className="font-brand text-[30px] font-extrabold leading-none text-brand-blue">
              {stats.since?.year}
            </div>
            <div className="mt-1.5 font-brand text-[11px] font-medium leading-snug text-brand-ink/55">
              {stats.since?.label}
            </div>
          </div>
          <div className="w-[190px] translate-y-3 rotate-2 rounded-[28px] bg-brand-ink p-5 text-center shadow-xl">
            <div className="font-brand text-[30px] font-extrabold leading-none text-brand-lime">
              {stats.launch?.year}
            </div>
            <div className="mt-1.5 font-brand text-[11px] font-medium leading-snug text-white/60">
              {stats.launch?.label}
            </div>
          </div>
          <div className="w-[190px] -rotate-3 rounded-[28px] bg-brand-lime p-5 text-center shadow-xl">
            <div className="font-brand text-[30px] font-extrabold leading-none text-brand-ink">
              {stats.clients?.value}
            </div>
            <div className="mt-1.5 font-brand text-[11px] font-medium leading-snug text-brand-ink/65">
              {stats.clients?.label}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
