import { Placeholder, Button } from "./ui";

export default function Hero({ sentinelRef }) {
  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="bg-white px-5 pt-8 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:pb-2 lg:pt-[72px]">
        <div className="inline-flex items-center gap-2 border border-[#C9D4EA] bg-brand-bg px-3 py-1.5">
          <span className="h-1.5 w-1.5 bg-brand-lime" />
          <span className="whitespace-nowrap font-brand text-[10px] font-bold tracking-[0.14em] text-brand-blue">
            ҚОЛДАН ЖАСАЛҒАН · АЛМАТЫ
          </span>
        </div>
        <h1 className="mt-4.5 text-balance font-brand text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.035em] lg:text-[82px] lg:leading-[0.92]">
          Домбыра
          <br />
          <span className="text-brand-blue">твой голос</span>
        </h1>
        <p className="mt-3.5 max-w-[310px] font-brand text-[15px] font-medium leading-relaxed text-brand-ink/62 lg:max-w-[520px] lg:text-[17px]">
          Мастерские инструменты из массива — собраны, отстроены и прослушаны
          вручную. Звук, который слышно с первой ноты.
        </p>
      </section>

      <section className="relative mt-6 h-[400px] overflow-hidden lg:h-[600px]">
        <Placeholder>Фото домбры — светлый премиальный кадр</Placeholder>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-white from-[58%] to-transparent" />
        <div className="pointer-events-none absolute bottom-4 left-5 flex items-baseline gap-2.5">
          <span className="font-brand text-[13px] font-extrabold tracking-[0.1em] text-brand-blue">
            «АСЫЛ»
          </span>
          <span className="font-brand text-xs font-medium text-brand-ink/50">
            ель / клён · 185 000 ₸
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-2.5 bg-white px-5 pb-8 pt-2 lg:mx-auto lg:max-w-[1180px] lg:px-7">
        <Button className="w-full">Купить</Button>
        <div ref={sentinelRef} className="h-px" />
      </section>

      {/* ---------- бегущая строка ---------- */}
      <div className="flex overflow-hidden bg-brand-ink text-brand-lime">
        <div className="flex animate-[marquee_22s_linear_infinite] gap-5.5 whitespace-nowrap px-3 py-2.5 font-brand text-[10.5px] font-bold tracking-[0.16em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-5.5">
              НАҒЫЗ ҚАЗАҚ — ҚАЗАҚ ЕМЕС, НАҒЫЗ ҚАЗАҚ — ДОМБЫРА!
              <span className="text-brand-lime">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- статистика ---------- */}
      <section className="grid grid-cols-3 border-b border-brand-border bg-brand-bg lg:mx-auto lg:max-w-[1180px]">
        {[
          { n: "1998", l: "с этого года\nработает топ-мастер" },
          { n: "2015", l: "год запуска\nпроекта dombyra.kz" },
          { n: "10 000+", l: "клиентов\nпо всему миру" },
        ].map((s, i) => (
          <div
            key={s.n}
            className={`px-2.5 py-6 text-center lg:py-10 ${
              i < 2 ? "border-r border-brand-border" : ""
            }`}
          >
            <div className="font-brand text-[26px] font-extrabold text-brand-blue lg:text-[44px]">
              {s.n}
            </div>
            <div className="mt-1.5 whitespace-pre-line font-brand text-[11px] font-medium leading-snug text-brand-ink/55">
              {s.l}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
