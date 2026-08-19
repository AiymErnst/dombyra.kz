import { Placeholder, SectionEyebrow, Button } from "./ui";

// app/components/TrainerPromo.jsx
//
// Три секции — тренажёр, тюнер, караоке. Раньше компонент не принимал
// dict/locale вообще (хотя LandingPage их уже передавала) — весь текст
// был зашит в JSX на русском, поэтому при смене языка эта часть страницы
// не менялась. Теперь всё идёт через dict.trainerPromo.*, с русскими
// текстами как запасными (если в locales/*.json блока ещё нет — сборка
// не падает, просто показывается русский).
//
// TRAINER_CARDS/TUNER_STEPS/KARAOKE_STEPS раньше приходили из data.js на
// одном языке — перенесены сюда как переводимые массивы (fallback +
// dict.trainerPromo.tunerSteps/karaokeSteps/cards), от data.js больше не
// зависят.

const FALLBACK_CARDS = [
  { ph: "GIF: подсказки по ладам", caption: "Подсветка ладов в темпе мелодии" },
  { ph: "GIF: проверка звука", caption: "Тренажёр слышит фальшь и поправляет" },
  { ph: "GIF: прогресс и мелодии", caption: "Прогресс по 40 мелодиям" },
];

const FALLBACK_TUNER_STEPS = [
  { num: "01", title: "Слышит обе струны", desc: "Ре и соль определяются автоматически" },
  { num: "02", title: "Точность ±1 цент", desc: "Стрелка показывает, куда крутить колок" },
  { num: "03", title: "Без установки", desc: "Работает в браузере телефона" },
  { num: "04", title: "Всем и навсегда", desc: "Без регистрации и оплаты" },
];

const FALLBACK_KARAOKE_STEPS = [
  { num: "01", title: "Включи микрофон", desc: "Один клик — и тренажёр слышит твою домбру" },
  { num: "02", title: "Следи за подсветкой", desc: "Лады загораются в темпе мелодии" },
  { num: "03", title: "Видишь ошибки сразу", desc: "Фальшивая нота подсвечивается красным" },
  { num: "04", title: "Играй любимые кюи", desc: "От простых мелодий до сложных партий" },
];

export default function TrainerPromo({ dict, locale }) {
  const t = dict?.trainerPromo || {};
  const cards = t.cards?.length ? t.cards : FALLBACK_CARDS;
  const tunerSteps = t.tunerSteps?.length ? t.tunerSteps : FALLBACK_TUNER_STEPS;
  const karaokeSteps = t.karaokeSteps?.length ? t.karaokeSteps : FALLBACK_KARAOKE_STEPS;
  const localePrefix = locale ? `/${locale}` : "";

  return (
    <>
      {/* ---------- тренажёр ---------- */}
      <section id="trainer" className="scroll-mt-16 bg-brand-bg py-10 lg:pb-11">
        <div className="px-5 lg:mx-auto lg:max-w-[1180px] lg:px-7">
          <SectionEyebrow>{t.eyebrow || "ТРЕНАЖЁР"}</SectionEyebrow>
          <h2 className="mt-3 font-brand text-[32px] font-extrabold uppercase leading-none tracking-[-0.03em]">
            {t.title1 || "Научитесь играть"}
            <br />
            {t.title2 || "всего за "}
            <span className="text-brand-blue">{t.titleAccent || "час"}</span>
          </h2>
          <p className="mt-2.5 font-brand text-sm font-medium leading-relaxed text-brand-ink/62">
            {t.subtitle ||
              "Симулятор показывает, куда ставить пальцы, и слушает вашу игру через микрофон. Кюи и песни — прямо в браузере, без установки."}
          </p>
        </div>
        <div
          data-row
          className="flex gap-3 overflow-x-auto px-5 py-5.5 [scroll-snap-type:x_mandatory] lg:mx-auto lg:max-w-[1180px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-7"
        >
          {cards.map((card, i) => (
            <figure
              key={i}
              className="m-0 w-[200px] flex-none border border-brand-border bg-white [scroll-snap-align:start] lg:w-auto"
            >
              <div className="h-[266px] bg-[#E8EDF7] lg:h-[340px]">
                <Placeholder>{card.ph}</Placeholder>
              </div>
              <figcaption className="p-3.5 pt-3 font-brand text-[12.5px] font-bold leading-snug">
                {card.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="flex flex-col gap-2.5 px-5 pt-1 lg:mx-auto lg:max-w-[1180px] lg:px-7">
          <div className="border border-brand-border bg-white p-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-lime px-3 py-1.5">
              <span className="font-brand text-[10.5px] font-extrabold tracking-[0.12em] text-brand-ink">
                {t.freeBadge || "ТРЕНАЖЁР БЕСПЛАТНЫЙ"}
              </span>
            </div>
            <div className="mt-3.5 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-blue" />
              <span className="font-brand text-[13px] font-medium text-brand-ink/70">
                {t.point1 || "Часть мелодий открыта всем и навсегда — заходите и играйте"}
              </span>
            </div>
            <div className="mt-2 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-blue" />
              <span className="font-brand text-[13px] font-medium text-brand-ink/70">
                {t.point2 || "Остальные мелодии — платные"}
              </span>
            </div>
            <div className="mt-2 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-lime" />
              <span className="font-brand text-[13px] font-semibold">
                {t.point3 || "Нашим клиентам — все мелодии бесплатно навсегда"}
              </span>
            </div>
          </div>
          <a href={`${localePrefix}/learn`}>
            <Button className="w-full">{t.openTrainerCta || "Открыть тренажёр"}</Button>
          </a>
        </div>
      </section>

      {/* ---------- тюнер ---------- */}
      <section id="tuner" className="scroll-mt-16 bg-white px-5 py-11 text-center lg:px-7">
        <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[34px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] lg:text-[52px]">
          {t.tunerTitle1 || "Бесплатный"}
          <br />
          <span className="text-brand-blue">{t.tunerTitle2 || "тюнер домбры"}</span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[300px] text-pretty font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
          {t.tunerSubtitle ||
            "Он живёт на той же странице, что и тренажёр. Включите микрофон — и строй D–G будет чистым за минуту, без слуха и опыта."}
        </p>

        <div className="mx-auto mt-6.5 grid max-w-[1000px] grid-cols-2 gap-2.5 text-left lg:grid-cols-4">
          {tunerSteps.map((step, i) => (
            <div key={i} className="bg-brand-bg px-3.5 pb-4.5 pt-4">
              <div className="mb-3 flex h-6.5 w-6.5 items-center justify-center bg-brand-blue font-brand text-[11px] font-extrabold text-white">
                {step.num}
              </div>
              <div className="font-brand text-[13px] font-extrabold uppercase tracking-[-0.01em]">
                {step.title}
              </div>
              <div className="mt-1.5 font-brand text-xs font-medium leading-snug text-brand-ink/60">
                {step.desc}
              </div>
            </div>
          ))}
        </div>

        <a
          href={`${localePrefix}/tuner`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6.5 py-3.5 font-brand text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
        >
          {t.tunerCta || "Настроить домбру"}
          <span className="font-brand text-[15px] font-bold">›</span>
        </a>
        <div className="mt-3 font-brand text-[11.5px] font-medium text-brand-ink/45">
          {t.tunerFootnote || "Тюнер и тренажёр — на одной странице"}
        </div>
      </section>

      {/* ---------- караоке ---------- */}
      <section id="karaoke" className="scroll-mt-16 bg-brand-bg px-5 py-11 text-center lg:px-7">
        <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[34px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] lg:text-[52px]">
          {t.karaokeTitle1 || "Караоке"}
          <br />
          <span className="text-brand-blue">{t.karaokeTitle2 || "для домбры"}</span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[300px] text-pretty font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
          {t.karaokeSubtitle ||
            "Микрофон слушает твою игру и подсвечивает лады в реальном времени — сразу видно, где сфальшивил и что переиграть."}
        </p>

        <div className="mx-auto mt-6.5 grid max-w-[1000px] grid-cols-2 gap-2.5 text-left lg:grid-cols-4">
          {karaokeSteps.map((step, i) => (
            <div key={i} className="bg-white px-3.5 pb-4.5 pt-4">
              <div className="mb-3 flex h-6.5 w-6.5 items-center justify-center bg-brand-blue font-brand text-[11px] font-extrabold text-white">
                {step.num}
              </div>
              <div className="font-brand text-[13px] font-extrabold uppercase tracking-[-0.01em]">
                {step.title}
              </div>
              <div className="mt-1.5 font-brand text-xs font-medium leading-snug text-brand-ink/60">
                {step.desc}
              </div>
            </div>
          ))}
        </div>

        <a
          href={`${localePrefix}/karaoke`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6.5 py-3.5 font-brand text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
        >
          {t.karaokeCta || "Играть в караоке"}
          <span className="font-brand text-[15px] font-bold">›</span>
        </a>
        <div className="mt-3 font-brand text-[11.5px] font-medium text-brand-ink/45">
          {t.karaokeFootnote || "Бесплатно, без установки и регистрации"}
        </div>
      </section>
    </>
  );
}
