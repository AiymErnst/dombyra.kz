import { Placeholder, SectionEyebrow } from "./ui";

// app/components/Reviews.jsx
//
// Раньше брал REVIEWS напрямую из data.js — захардкожен на русском,
// без всякой связи с dict, поэтому показывался одинаково на всех
// языках. Теперь — dict.reviews.items, с тем же текстом как запасной
// вариант (тот же паттерн, что уже в TrainerPromo.jsx). REVIEWS в
// data.js больше этим компонентом не используется — можно убрать
// оттуда при следующей уборке.
const FALLBACK_REVIEWS = [
  {
    text: "Взял «Дала» для концертов. Строй держит весь вечер, звук плотный, на подзвучке не гудит. Кейс серьёзный — летал с ней трижды.",
    name: "Алишер Қ.",
    role: "домбрист, Астана",
  },
  {
    text: "Дочке купили «Тұран» на 9 лет. Помогли выбрать размер по руке, прислали запись звука до оплаты. Через месяц играет кюй.",
    name: "Динара С.",
    role: "Алматы",
  },
  {
    text: "Заказывал в Берлин. Дошло за девять дней, ни одной трещины. Мастер ответил на все вопросы про уход в мессенджере.",
    name: "Ержан М.",
    role: "Берлин",
  },
];

export default function Reviews({ dict }) {
  const t = dict?.reviews || {};
  const items = t.items?.length ? t.items : FALLBACK_REVIEWS;

  return (
    <section id="reviews" className="scroll-mt-16 bg-brand-bg py-14 lg:py-20">
      <div className="px-5 lg:mx-auto lg:max-w-[1180px] lg:px-7">
        <SectionEyebrow>{t.eyebrow || "ОТЗЫВЫ"}</SectionEyebrow>
        <h2 className="mt-3 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] sm:text-[34px] lg:text-[46px]">
          {t.title1 || "Говорят"}{" "}
          <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
            {t.title2 || "музыканты"}
          </span>
        </h2>
        <div className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-brand text-[12.5px] font-bold text-brand-ink/70">
          {t.ratingLine || "★★★★★ 4,9 из 5 · 412 отзыва"}
        </div>
      </div>
      <div
        data-row
        className="mt-6 flex gap-3 overflow-x-auto px-5 pb-2 [scroll-snap-type:x_mandatory] lg:mx-auto lg:max-w-[1180px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-7"
      >
        {items.map((review, i) => (
          <blockquote
            key={i}
            className="w-[280px] flex-none rounded-2xl border border-brand-border bg-white p-5 [scroll-snap-align:start] lg:w-auto"
          >
            <div className="font-brand text-[13px] font-bold tracking-[0.2em] text-brand-blue">
              ★★★★★
            </div>
            <p className="mt-3.5 font-brand text-sm font-medium leading-relaxed text-brand-ink/78">
              {review.text}
            </p>
            <footer className="mt-5 flex items-center gap-3">
              <div className="h-11 w-11 flex-none overflow-hidden rounded-full">
                <Placeholder>Фото</Placeholder>
              </div>
              <div>
                <div className="font-brand text-[13px] font-bold leading-tight">
                  {review.name}
                </div>
                <div className="mt-0.5 font-brand text-[11.5px] font-medium text-brand-ink/45">
                  {review.role}
                </div>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
      <div className="px-5 pt-3 font-brand text-[11px] font-medium uppercase tracking-[0.08em] text-brand-ink/40 lg:px-7">
        {t.scrollHint || "← Листайте"}
      </div>
    </section>
  );
}
