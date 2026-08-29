import { Placeholder, SectionEyebrow } from "./ui";

// app/components/TrainerPromo.jsx
//
// Порядок секций теперь тюнер → тренажёр → караоке (был тренажёр →
// тюнер → караоке).
//
// Тренажёр и караоке — фото были скучным рядом из трёх одинаковых
// квадратов. Теперь это коллаж: одна крупная карточка + две поменьше
// друг над другом. В караоке коллаж зеркальный (крупная справа), в
// тренажёре — крупная слева. У тренажёра появились те же нумерованные
// шаги 01–04, что уже были у тюнера и караоке — раньше вместо них был
// блок "ТРЕНАЖЁР БЕСПЛАТНЫЙ", который Айым попросила убрать целиком.
//
// У тюнера пробовали сделать "вырезанные домбры без фона" вместо фото —
// Айым решила этого не делать, поэтому там просто два обычных фото.
//
// Кнопки "Настроить домбру" / "Открыть тренажёр" / "Играть в караоке"
// были разными по виду — теперь все три одинаковые пилюли со стрелкой.
//
// Все тексты по-прежнему через dict.trainerPromo.*, с русским текстом
// как запасным.

const FALLBACK_TUNER_PHOTOS = [
  { ph: "фото — струна расстроена, стрелка отклонена", caption: "Слышит частоту струны и показывает, куда крутить колок" },
  { ph: "фото — стрелка в зелёной зоне по центру", caption: "Стрелка встала в центр — строй идеальный" },
];

const FALLBACK_TUNER_STEPS = [
  { num: "01", title: "Слышит обе струны", desc: "Ре и соль определяются автоматически" },
  { num: "02", title: "Точность ±1 цент", desc: "Стрелка показывает, куда крутить колок" },
  { num: "03", title: "Без установки", desc: "Работает в браузере телефона" },
  { num: "04", title: "Всем и навсегда", desc: "Без регистрации и оплаты" },
];

const FALLBACK_TRAINER_CARDS = [
  { ph: "GIF: подсказки по ладам", caption: "Подсветка ладов в темпе мелодии" },
  { ph: "GIF: проверка звука", caption: "Тренажёр слышит фальшь и поправляет" },
  { ph: "GIF: прогресс и мелодии", caption: "Прогресс по 40 мелодиям" },
];

const FALLBACK_TRAINER_STEPS = [
  { num: "01", title: "Выбирай мелодию", desc: "От простых мелодий до сложных кюев" },
  { num: "02", title: "Смотри на подсказки", desc: "Лады подсвечиваются в темпе мелодии" },
  { num: "03", title: "Играй в микрофон", desc: "Тренажёр слышит игру и поправляет" },
  { num: "04", title: "Бесплатно и сразу", desc: "Без установки — прямо в браузере" },
];

const FALLBACK_KARAOKE_CARDS = [
  { ph: "фото — точное попадание, зелёная подсветка", caption: "Точная нота — подсвечивается зелёным" },
  { ph: "фото — результат: разбор ошибок по нотам", caption: "В конце — оценка и разбор ошибок" },
  { ph: "фото — игра с микрофоном, лады подсвечены в такт", caption: "Играешь — микрофон слушает каждую ноту" },
];

const FALLBACK_KARAOKE_STEPS = [
  { num: "01", title: "Включи микрофон", desc: "Один клик — и тренажёр слышит твою домбру" },
  { num: "02", title: "Следи за подсветкой", desc: "Лады загораются в темпе мелодии" },
  { num: "03", title: "Видишь ошибки сразу", desc: "Фальшивая нота подсвечивается красным" },
  { num: "04", title: "Играй любимые кюи", desc: "От простых мелодий до сложных партий" },
];

function StepGrid({ steps, accentLast = false }) {
  return (
    <div className="mx-auto mt-8 grid max-w-[1000px] grid-cols-2 gap-2.5 text-left lg:grid-cols-4">
      {steps.map((step, i) => {
        const isAccent = accentLast && i === steps.length - 1;
        return (
          <div
            key={i}
            className={`rounded-2xl px-4 pb-5 pt-4 ${isAccent ? "bg-brand-ink" : "bg-brand-bg"}`}
          >
            <div
              className={`mb-3 flex h-7 w-7 items-center justify-center rounded-full font-brand text-[11px] font-extrabold ${
                isAccent ? "bg-brand-lime text-brand-ink" : "bg-brand-blue text-white"
              }`}
            >
              {step.num}
            </div>
            <div
              className={`font-brand text-[13px] font-extrabold uppercase tracking-[-0.01em] ${
                isAccent ? "text-white" : ""
              }`}
            >
              {step.title}
            </div>
            <div
              className={`mt-1.5 font-brand text-xs font-medium leading-snug ${
                isAccent ? "text-white/60" : "text-brand-ink/60"
              }`}
            >
              {step.desc}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CtaButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-4 font-brand text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
    >
      {children}
      <span className="text-[15px]">›</span>
    </a>
  );
}

export default function TrainerPromo({ dict, locale }) {
  const t = dict?.trainerPromo || {};
  const tunerPhotos = t.tunerPhotos?.length === 2 ? t.tunerPhotos : FALLBACK_TUNER_PHOTOS;
  const tunerSteps = t.tunerSteps?.length ? t.tunerSteps : FALLBACK_TUNER_STEPS;
  const trainerCards = t.trainerCards?.length === 3 ? t.trainerCards : FALLBACK_TRAINER_CARDS;
  const trainerSteps = t.trainerSteps?.length ? t.trainerSteps : FALLBACK_TRAINER_STEPS;
  const karaokeCards = t.karaokeCards?.length === 3 ? t.karaokeCards : FALLBACK_KARAOKE_CARDS;
  const karaokeSteps = t.karaokeSteps?.length ? t.karaokeSteps : FALLBACK_KARAOKE_STEPS;
  const localePrefix = locale ? `/${locale}` : "";

  return (
    <>
      {/* ---------- тюнер ---------- */}
      <section id="tuner" className="scroll-mt-16 bg-white px-5 py-14 text-center lg:px-12 lg:py-20">
        <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[30px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] sm:text-[36px] lg:text-[48px]">
          {t.tunerTitle1 || "Бесплатный"}
          <br />
          <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
            {t.tunerTitle2 || "тюнер домбры"}
          </span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[320px] text-pretty font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
          {t.tunerSubtitle ||
            "Он живёт на той же странице, что и тренажёр. Включите микрофон — и строй D–G будет чистым за минуту, без слуха и опыта."}
        </p>

        <div className="mx-auto mt-7 grid max-w-[820px] grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {tunerPhotos.map((photo, i) => (
            <figure key={i} className="overflow-hidden rounded-2xl border border-brand-border bg-white p-2">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[#E8EDF7]">
                <Placeholder>{photo.ph}</Placeholder>
              </div>
              <figcaption className="p-2 pt-3 font-brand text-[12.5px] font-bold leading-snug">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <StepGrid steps={tunerSteps} accentLast />

        <div className="mt-8">
          <CtaButton href={`${localePrefix}/tuner`}>{t.tunerCta || "Настроить домбру"}</CtaButton>
        </div>
        <div className="mt-3 font-brand text-[11.5px] font-medium text-brand-ink/45">
          {t.tunerFootnote || "Тюнер и тренажёр — на одной странице"}
        </div>
      </section>

      {/* ---------- тренажёр ---------- */}
      <section id="trainer" className="scroll-mt-16 bg-brand-bg px-5 py-14 lg:px-12 lg:py-20">
        <div className="lg:mx-auto lg:max-w-[1180px]">
          <SectionEyebrow>{t.eyebrow || "ТРЕНАЖЁР"}</SectionEyebrow>
          <h2 className="mt-3 font-brand text-[28px] font-extrabold uppercase leading-none tracking-[-0.03em] sm:text-[34px] lg:text-[44px]">
            {t.title1 || "Научитесь играть"}
            <br />
            {t.title2 || "всего за "}
            <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
              {t.titleAccent || "час"}
            </span>
          </h2>
          <p className="mt-3 max-w-[560px] font-brand text-sm font-medium leading-relaxed text-brand-ink/62">
            {t.subtitle ||
              "Симулятор показывает, куда ставить пальцы, и слушает вашу игру через микрофон. Кюи и песни — прямо в браузере, без установки."}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[1.2fr_1fr]">
            <figure className="overflow-hidden rounded-2xl border border-brand-border bg-white p-2">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#E8EDF7] sm:aspect-auto sm:h-full">
                <Placeholder>{trainerCards[0].ph}</Placeholder>
              </div>
              <figcaption className="p-2 pt-3 font-brand text-[12.5px] font-bold leading-snug">
                {trainerCards[0].caption}
              </figcaption>
            </figure>
            <div className="grid grid-rows-2 gap-3">
              {trainerCards.slice(1, 3).map((card, i) => (
                <figure
                  key={i}
                  className={`overflow-hidden rounded-2xl bg-white p-2 ${
                    i === 1 ? "border-2 border-brand-lime" : "border border-brand-border"
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#E8EDF7]">
                    <Placeholder>{card.ph}</Placeholder>
                  </div>
                  <figcaption className="p-2 pt-2.5 font-brand text-[12px] font-bold leading-snug">
                    {card.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <StepGrid steps={trainerSteps} accentLast />

          <div className="mt-8">
            <CtaButton href={`${localePrefix}/learn`}>{t.openTrainerCta || "Открыть тренажёр"}</CtaButton>
          </div>
        </div>
      </section>

      {/* ---------- караоке ---------- */}
      <section id="karaoke" className="scroll-mt-16 bg-white px-5 py-14 text-center lg:px-12 lg:py-20">
        <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[30px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] sm:text-[36px] lg:text-[48px]">
          {t.karaokeTitle1 || "Караоке"}
          <br />
          <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
            {t.karaokeTitle2 || "для домбры"}
          </span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[320px] text-pretty font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
          {t.karaokeSubtitle ||
            "Микрофон слушает твою игру и подсвечивает лады в реальном времени — сразу видно, где сфальшивил и что переиграть."}
        </p>

        <div className="mx-auto mt-7 grid max-w-[1180px] grid-cols-1 gap-3 text-left sm:grid-cols-[1fr_1.2fr]">
          <div className="grid grid-rows-2 gap-3">
            {karaokeCards.slice(0, 2).map((card, i) => (
              <figure
                key={i}
                className={`overflow-hidden rounded-2xl bg-white p-2 ${
                  i === 1 ? "border-2 border-brand-lime" : "border border-brand-border"
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#E8EDF7]">
                  <Placeholder>{card.ph}</Placeholder>
                </div>
                <figcaption className="p-2 pt-2.5 font-brand text-[12px] font-bold leading-snug">
                  {card.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <figure className="overflow-hidden rounded-2xl border border-brand-border bg-white p-2">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#E8EDF7] sm:aspect-auto sm:h-full">
              <Placeholder>{karaokeCards[2].ph}</Placeholder>
            </div>
            <figcaption className="p-2 pt-3 font-brand text-[12.5px] font-bold leading-snug">
              {karaokeCards[2].caption}
            </figcaption>
          </figure>
        </div>

        <StepGrid steps={karaokeSteps} accentLast />

        <div className="mt-8">
          <CtaButton href={`${localePrefix}/karaoke`}>{t.karaokeCta || "Играть в караоке"}</CtaButton>
        </div>
        <div className="mt-3 font-brand text-[11.5px] font-medium text-brand-ink/45">
          {t.karaokeFootnote || "Бесплатно, без установки и регистрации"}
        </div>
      </section>
    </>
  );
}
