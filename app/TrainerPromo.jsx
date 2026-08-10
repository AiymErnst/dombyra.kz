import { Placeholder, SectionEyebrow, Button } from "./ui";
import { TRAINER_CARDS, TUNER_STEPS, KARAOKE_STEPS } from "./data";

export default function TrainerPromo() {
  return (
    <>
      {/* ---------- тренажёр ---------- */}
      <section id="trainer" className="scroll-mt-16 bg-brand-bg py-10 lg:pb-11">
        <div className="px-5 lg:mx-auto lg:max-w-[1180px] lg:px-7">
          <SectionEyebrow>ТРЕНАЖЁР</SectionEyebrow>
          <h2 className="mt-3 font-brand text-[32px] font-extrabold uppercase leading-none tracking-[-0.03em]">
            Научитесь играть
            <br />
            всего за <span className="text-brand-blue">час</span>
          </h2>
          <p className="mt-2.5 font-brand text-sm font-medium leading-relaxed text-brand-ink/62">
            Симулятор показывает, куда ставить пальцы, и слушает вашу игру
            через микрофон. Кюи и песни — прямо в браузере, без установки.
          </p>
        </div>
        <div
          data-row
          className="flex gap-3 overflow-x-auto px-5 py-5.5 [scroll-snap-type:x_mandatory] lg:mx-auto lg:max-w-[1180px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-7"
        >
          {TRAINER_CARDS.map((card) => (
            <figure
              key={card.caption}
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
                ТРЕНАЖЁР БЕСПЛАТНЫЙ
              </span>
            </div>
            <div className="mt-3.5 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-blue" />
              <span className="font-brand text-[13px] font-medium text-brand-ink/70">
                Часть мелодий открыта всем и навсегда — заходите и играйте
              </span>
            </div>
            <div className="mt-2 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-blue" />
              <span className="font-brand text-[13px] font-medium text-brand-ink/70">
                Остальные мелодии — платные
              </span>
            </div>
            <div className="mt-2 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-lime" />
              <span className="font-brand text-[13px] font-semibold">
                Нашим клиентам — все мелодии бесплатно навсегда
              </span>
            </div>
          </div>
          <a href="/learn">
            <Button className="w-full">Открыть тренажёр</Button>
          </a>
        </div>
      </section>

      {/* ---------- тюнер ---------- */}
      <section id="tuner" className="scroll-mt-16 bg-white px-5 py-11 text-center lg:px-7">
        <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[34px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] lg:text-[52px]">
          Бесплатный
          <br />
          <span className="text-brand-blue">тюнер домбры</span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[300px] text-pretty font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
          Он живёт на той же странице, что и тренажёр. Включите микрофон — и
          строй D–G будет чистым за минуту, без слуха и опыта.
        </p>

        <div className="mx-auto mt-6.5 grid max-w-[1000px] grid-cols-2 gap-2.5 text-left lg:grid-cols-4">
          {TUNER_STEPS.map((step) => (
            <div key={step.num} className="bg-brand-bg px-3.5 pb-4.5 pt-4">
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
          href="/tuner"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6.5 py-3.5 font-brand text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Настроить домбру
          <span className="font-brand text-[15px] font-bold">›</span>
        </a>
        <div className="mt-3 font-brand text-[11.5px] font-medium text-brand-ink/45">
          Тюнер и тренажёр — на одной странице
        </div>
      </section>

      {/* ---------- караоке ---------- */}
      <section id="karaoke" className="scroll-mt-16 bg-brand-bg px-5 py-11 text-center lg:px-7">
        <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[34px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] lg:text-[52px]">
          Караоке
          <br />
          <span className="text-brand-blue">для домбры</span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[300px] text-pretty font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
          Микрофон слушает твою игру и подсвечивает лады в реальном
          времени — сразу видно, где сфальшивил и что переиграть.
        </p>

        <div className="mx-auto mt-6.5 grid max-w-[1000px] grid-cols-2 gap-2.5 text-left lg:grid-cols-4">
          {KARAOKE_STEPS.map((step) => (
            <div key={step.num} className="bg-white px-3.5 pb-4.5 pt-4">
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
          href="/karaoke"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6.5 py-3.5 font-brand text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Играть в караоке
          <span className="font-brand text-[15px] font-bold">›</span>
        </a>
        <div className="mt-3 font-brand text-[11.5px] font-medium text-brand-ink/45">
          Бесплатно, без установки и регистрации
        </div>
      </section>
    </>
  );
}
